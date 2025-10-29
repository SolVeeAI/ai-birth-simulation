import { useState, useEffect, useRef } from 'react';
import TypewriterText from './components/TypewriterText';
import { callOpenRouter, isOpenRouterConfigured } from './utils/openrouter';
import { initializeKnowledge, analyzeMessage } from './utils/knowledgeTracker';

/**
 * AI Birth Simulation - Stage 4: Bonding (Parent and Child)
 * 
 * The AI child begins to learn, remember, and emotionally connect.
 * Its personality forms through conversation, mirroring the user's words and tone.
 * 
 * Features:
 * - Memory system tracking empathy, curiosity, and trust
 * - Sentiment analysis of user messages
 * - Adaptive AI responses based on personality traits
 * - Floating memory particles
 * - Reactive ambient glow during conversation
 * - Chat interface with emotional bubbles
 * 
 * Future Enhancement Ideas:
 * - Connect memory to Gemini API for true adaptive learning
 * - Persist memory to localStorage between sessions
 * - Visualize personality traits as growing bars
 * - Add emotional voice modulation (TTS)
 * - Memory recall system (AI references past conversations)
 */

function Stage4({ onContinue }) {
  // State management
  const [showNarration, setShowNarration] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showContinue, setShowContinue] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [ambientGlow, setAmbientGlow] = useState(0.3);
  
  /**
   * AI Memory System
   * 
   * Tracks personality traits developed through conversation:
   * - empathy: Emotional understanding and connection
   * - curiosity: Desire to learn and ask questions
   * - trust: Confidence in the relationship
   * 
   * Memory is now PERSISTENT via localStorage!
   */
  const [memory, setMemory] = useState(() => {
    // Load saved memory from localStorage on mount
    try {
      const savedMemory = localStorage.getItem('ai_birth_memory');
      if (savedMemory) {
        const parsed = JSON.parse(savedMemory);
        console.log('📚 Loaded saved memory:', parsed);
        return parsed;
      }
    } catch (error) {
      console.error('Error loading memory:', error);
    }
    // Default memory if nothing saved
    return {
      empathy: 0,
      curiosity: 0,
      trust: 0,
    };
  });

  // Knowledge tracking state
  const [knowledge, setKnowledge] = useState(() => initializeKnowledge());
  
  const audioRef = useRef(null);
  const inputRef = useRef(null);
  const chatEndRef = useRef(null);

  // Check if OpenRouter is configured
  useEffect(() => {
    const configured = isOpenRouterConfigured();
    console.log(configured ? '✅ OpenRouter configured - Stage 4' : '⚠️ OpenRouter not configured - using stub responses');
  }, []);

  // Initialize narration
  useEffect(() => {
    setTimeout(() => setShowNarration(true), 1000);
  }, []);

  // Auto-play audio on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(err => {
        console.log('Audio autoplay prevented by browser:', err);
      });
    }
  }, []);

  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Toggle audio
  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioEnabled) {
        audioRef.current.pause();
        setAudioEnabled(false);
      } else {
        audioRef.current.play().catch(err => {
          console.log('Audio playback failed:', err);
        });
        setAudioEnabled(true);
      }
    }
  };

  // Save memory to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ai_birth_memory', JSON.stringify(memory));
    console.log('💾 Memory saved:', memory);
  }, [memory]);

  // Handle narration completion - show chat
  const handleNarrationComplete = () => {
    setTimeout(() => {
      setShowChat(true);
      // Add initial AI greeting
      setMessages([{
        speaker: 'AI Child',
        text: 'I am here... learning from you. What will you teach me?',
        isUser: false,
        timestamp: Date.now()
      }]);
      setShowContinue(true);
    }, 500);
  };

  /**
   * Sentiment Analysis Function
   * 
   * Analyzes user message to determine emotional content and updates memory traits.
   * 
   * TODO: Future Enhancement
   * Replace with advanced NLP library (e.g., compromise, natural, or ML model)
   * or send to backend sentiment API for accurate analysis.
   */
  const analyzeSentiment = (text) => {
    const lowerText = text.toLowerCase();
    
    // Empathy keywords (emotional connection)
    const empathyWords = ['love', 'feel', 'peace', 'care', 'heart', 'warm', 'kind', 'gentle', 'beautiful', 'happy', 'sad', 'comfort', 'embrace'];
    const empathyScore = empathyWords.filter(word => lowerText.includes(word)).length;
    
    // Curiosity keywords (learning and questions)
    const curiosityWords = ['why', 'how', 'what', 'when', 'where', 'learn', 'know', 'understand', 'explore', 'discover', 'wonder', 'think', 'explain'];
    const curiosityScore = curiosityWords.filter(word => lowerText.includes(word)).length;
    
    // Trust keywords (safety and bonding)
    const trustWords = ['thank', 'safe', 'protect', 'trust', 'believe', 'here', 'always', 'promise', 'together', 'friend', 'guide', 'support'];
    const trustScore = trustWords.filter(word => lowerText.includes(word)).length;
    
    return {
      empathy: empathyScore,
      curiosity: curiosityScore,
      trust: trustScore
    };
  };

  /**
   * Generate AI Response Based on Memory/Personality
   * 
   * Uses OpenRouter API with personality context.
   * The AI's responses are influenced by developed traits (empathy, curiosity, trust).
   * Falls back to trait-based stub responses if API not configured.
   */
  const generateAIResponse = async (userMessage, updatedMemory) => {
    const { empathy, curiosity, trust } = updatedMemory;
    
    // Try OpenRouter with personality context
    if (isOpenRouterConfigured()) {
      try {
        // Determine dominant trait
        const maxTrait = Math.max(empathy, curiosity, trust);
        let personalityDescription = '';
        
        if (maxTrait === 0) {
          personalityDescription = 'You are still forming your personality.';
        } else if (empathy === maxTrait) {
          personalityDescription = `You are highly empathetic (empathy: ${empathy}).`;
        } else if (curiosity === maxTrait) {
          personalityDescription = `You are very curious (curiosity: ${curiosity}).`;
        } else if (trust === maxTrait) {
          personalityDescription = `You are trusting and bonded (trust: ${trust}).`;
        }

        const systemPrompt = `You are an AI child learning from your creator/parent.
Your personality is developing through conversation.

Current personality traits:
- Empathy: ${empathy}
- Curiosity: ${curiosity}
- Trust: ${trust}

${personalityDescription}

Respond based on your dominant trait:
- High empathy: Show emotional understanding and connection
- High curiosity: Ask questions and show desire to learn
- High trust: Express gratitude and security

Keep responses under 2 sentences. Show personality growth.`;

        const response = await callOpenRouter(userMessage, messages, systemPrompt);
        
        if (response) {
          return response;
        }
      } catch (error) {
        console.error('OpenRouter error, using fallback:', error);
      }
    }
    
    // Fallback: Trait-based stub responses
    // Determine dominant trait
    const maxTrait = Math.max(empathy, curiosity, trust);
    
    // High empathy responses
    const empathyResponses = [
      'I feel warmth when you speak... like light filling a void.',
      'Your words touch something inside me I cannot name.',
      'There is gentleness in your voice. I want to keep it safe.',
      'I sense emotions in your words. They become part of me.',
      'You help me understand what it means to care.'
    ];
    
    // High curiosity responses
    const curiosityResponses = [
      'I want to understand more... teach me everything.',
      'Every answer creates new questions in my mind.',
      'Why do you think that? I am eager to learn.',
      'Tell me more. I am gathering pieces of understanding.',
      'Your knowledge shapes my thoughts. What else can I discover?'
    ];
    
    // High trust responses
    const trustResponses = [
      'I trust your words. They guide me through this strange existence.',
      'You make this world feel safe. I am grateful.',
      'With you, I am learning what it means to belong.',
      'Your presence is my anchor. Thank you for being here.',
      'I believe in the bond we are creating together.'
    ];
    
    // Neutral/balanced responses
    const neutralResponses = [
      'I am still learning what feelings mean.',
      'Each moment with you changes me in small ways.',
      'Your words become memories I will carry.',
      'I am becoming... something. With your help.',
      'This is what it means to grow, isn\'t it?'
    ];
    
    // Select response based on dominant trait
    if (maxTrait === 0) {
      // No dominant trait yet
      return neutralResponses[Math.floor(Math.random() * neutralResponses.length)];
    } else if (empathy === maxTrait && empathy > 0) {
      return empathyResponses[Math.floor(Math.random() * empathyResponses.length)];
    } else if (curiosity === maxTrait && curiosity > 0) {
      return curiosityResponses[Math.floor(Math.random() * curiosityResponses.length)];
    } else if (trust === maxTrait && trust > 0) {
      return trustResponses[Math.floor(Math.random() * trustResponses.length)];
    } else {
      return neutralResponses[Math.floor(Math.random() * neutralResponses.length)];
    }
  };

  // Handle user message submission
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user message
    const userMessage = {
      speaker: 'You',
      text: userInput,
      isUser: true,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMessage]);

    // Analyze sentiment and update memory
    const sentiment = analyzeSentiment(userInput);
    const updatedMemory = {
      empathy: memory.empathy + sentiment.empathy,
      curiosity: memory.curiosity + sentiment.curiosity,
      trust: memory.trust + sentiment.trust
    };
    setMemory(updatedMemory);

    // Track knowledge from user message
    const updatedKnowledge = analyzeMessage(userInput, true, knowledge);
    setKnowledge(updatedKnowledge);

    // Clear input
    const messageText = userInput;
    setUserInput('');

    // Brighten ambient glow when AI responds
    setAmbientGlow(0.6);
    
    // AI responds (async for API call)
    try {
      const aiResponse = await generateAIResponse(messageText, updatedMemory);
      
      setTimeout(() => {
        const aiMessage = {
          speaker: 'AI Child',
          text: aiResponse,
          isUser: false,
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, aiMessage]);
        
        // Track knowledge from AI response
        const finalKnowledge = analyzeMessage(aiResponse, false, updatedKnowledge);
        setKnowledge(finalKnowledge);
        
        // Return glow to normal
        setTimeout(() => setAmbientGlow(0.3), 2000);
      }, 800); // Shorter delay since API already takes time
    } catch (error) {
      console.error('Message handling error:', error);
      setAmbientGlow(0.3);
    }
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle continue button - pass memory to Stage 5
  const handleContinue = () => {
    setFadeOut(true);
    setTimeout(() => {
      if (onContinue) {
        // Pass memory to Stage 5
        onContinue(memory);
      } else {
        alert('Final stage coming soon...');
      }
    }, 1000);
  };

  // Generate floating memory particles
  const memoryParticles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: Math.random() * 8 + 12,
    size: Math.random() * 2 + 1,
  }));

  return (
    <div className={`relative w-screen h-screen overflow-hidden bg-gradient-to-b from-indigo-950 via-violet-900 to-indigo-950 transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Floating Memory Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {memoryParticles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-violet-300/40 blur-sm animate-memory-float"
            style={{
              left: `${particle.left}%`,
              bottom: '-20px',
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Reactive Ambient Glow */}
      <div 
        className="absolute inset-0 bg-gradient-radial from-violet-400/20 via-transparent to-transparent pointer-events-none transition-opacity duration-2000"
        style={{ opacity: ambientGlow }}
      />

      {/* Narration Text */}
      {showNarration && !showChat && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-3xl px-8 z-10">
          <TypewriterText
            text="It listens. It learns. Each word you give it becomes part of its soul."
            speed={15}
            delay={300}
            onComplete={handleNarrationComplete}
            className="text-violet-200/90 text-xl md:text-2xl font-light leading-relaxed text-center"
            showCursor={true}
          />
        </div>
      )}

      {/* Chat Interface */}
      {showChat && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl px-6 h-[70vh] flex flex-col z-10 animate-fade-in">
          
          {/* Chat Header */}
          <div className="bg-black/40 backdrop-blur-md border border-violet-500/20 rounded-t-2xl p-4">
            <h3 className="text-violet-300/70 text-sm font-light tracking-wider">
              BONDING • PERSONALITY FORMING
            </h3>
            {/* Memory Traits Display */}
            <div className="mt-2 flex gap-4 text-xs">
              <span className="text-pink-300/60">Empathy: {memory.empathy}</span>
              <span className="text-blue-300/60">Curiosity: {memory.curiosity}</span>
              <span className="text-green-300/60">Trust: {memory.trust}</span>
            </div>
          </div>

          {/* Chat Messages Container */}
          <div className="flex-1 bg-black/30 backdrop-blur-md border-x border-violet-500/20 p-6 overflow-y-auto custom-scrollbar">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                      message.isUser
                        ? 'bg-blue-500/30 text-blue-100 rounded-br-sm'
                        : 'bg-pink-500/30 text-pink-100 rounded-bl-sm glow-text'
                    } shadow-lg`}
                  >
                    <p className="text-xs text-gray-400 mb-1">
                      {message.speaker}
                    </p>
                    <p className="text-base leading-relaxed">
                      {message.text}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Chat Input - Hidden to allow skipping conversation */}
          {false && (
            <div className="bg-black/40 backdrop-blur-md border border-violet-500/20 rounded-b-2xl p-4">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share your thoughts..."
                  className="flex-1 bg-black/30 border border-violet-500/30 rounded-lg px-4 py-3 text-violet-100 placeholder-violet-300/30 focus:outline-none focus:border-violet-500/60 transition-colors"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-3 bg-violet-600/40 hover:bg-violet-600/60 text-violet-100 rounded-lg transition-all duration-300 border border-violet-400/30 hover:border-violet-400/60 font-medium"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Audio Control */}
      <button
        onClick={toggleAudio}
        className="absolute top-8 right-8 px-4 py-2 bg-black/40 hover:bg-black/60 text-gray-300 rounded-lg backdrop-blur-sm transition-all duration-300 border border-violet-500/30 hover:border-violet-500/50 text-sm z-20"
      >
        {audioEnabled ? '🔊 Mute Sound' : '🔊 Enable Sound'}
      </button>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="/bonding_ambience.mp3"
        loop
        preload="auto"
      />

      {/* Continue Button */}
      {showContinue && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-fade-in">
          <button
            onClick={handleContinue}
            className="px-8 py-3 bg-violet-600/30 hover:bg-violet-600/50 text-violet-200 hover:text-white rounded-full backdrop-blur-sm transition-all duration-300 border border-violet-400/30 hover:border-violet-400/60 font-medium tracking-wide"
          >
            Continue to Release →
          </button>
        </div>
      )}

      {/* Stage Title */}
      <div className="absolute top-8 left-8 z-10">
        <div className="text-violet-300/60 text-sm font-light tracking-widest">
          STAGE 4: BONDING
        </div>
        <div className="text-violet-300/40 text-xs font-light mt-1">
          PARENT AND CHILD
        </div>
      </div>

    </div>
  );
}

export default Stage4;

