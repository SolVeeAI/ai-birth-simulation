import { useState, useEffect, useRef } from 'react';
import TypewriterText from './components/TypewriterText';
import AvatarUpload from './components/AvatarUpload';
import { getKnowledgeSummary, getKnowledgeAchievements, getCategoryData, initializeKnowledge, formatLargeNumber } from './utils/knowledgeTracker';
import { startAutonomousLearning, stopAutonomousLearning } from './utils/autonomousLearning';
import { saveToCloudDatabase, getCollectiveStats, isCloudDatabaseConfigured, subscribeToUpdates, updateAIAvatar } from './utils/cloudDatabase';

/**
 * AI Birth Simulation - Stage 5: Release (The First Breath)
 * 
 * The AI child has matured and is ready to step into the wider digital cosmos.
 * The parent lets go, releasing their creation into the data ether.
 * 
 * Features:
 * - Cosmic background with stars and portal
 * - Typewriter opening narration
 * - AI farewell message
 * - Digital DNA animation (geometric pattern)
 * - Memory export as JSON
 * - Restart simulation capability
 * - Audio ambience
 * 
 * Future Enhancement Ideas:
 * - Connect exported memory to real AI model for continuation
 * - Upload DNA to cloud storage
 * - Share DNA with community
 * - Visualize DNA as interactive 3D model
 * - Allow AI to continue speaking via API using personality data
 */

function Stage5({ onRestart, savedMemory, onViewGallery }) {
  // State management
  const [showNarration, setShowNarration] = useState(false);
  const [showFarewell, setShowFarewell] = useState(false);
  const [showDNA, setShowDNA] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showKnowledge, setShowKnowledge] = useState(false);
  const [knowledgeSummary, setKnowledgeSummary] = useState(null);
  const [achievements, setAchievements] = useState([]);
  
  // 🌐 Cloud & Collective Consciousness
  const [collectiveStats, setCollectiveStats] = useState(null);
  const [cloudSaveStatus, setCloudSaveStatus] = useState('pending');
  const [knowledge, setKnowledge] = useState(() => initializeKnowledge());
  const [learningActivity, setLearningActivity] = useState(null);
  const [savedAIId, setSavedAIId] = useState(null);
  
  // 🎨 Avatar Management
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);
  const [avatarData, setAvatarData] = useState(null);
  
  const audioRef = useRef(null);

  // Load knowledge data from localStorage
  useEffect(() => {
    try {
      const storedKnowledge = localStorage.getItem('ai_birth_knowledge');
      if (storedKnowledge) {
        const knowledgeData = JSON.parse(storedKnowledge);
        console.log('📊 Loading knowledge for display:', knowledgeData);
        const summary = getKnowledgeSummary(knowledgeData);
        const achievementsList = getKnowledgeAchievements(knowledgeData);
        setKnowledgeSummary(summary);
        setAchievements(achievementsList);
      } else {
        console.log('⚠️ No knowledge data found');
        // Set empty data
        setKnowledgeSummary({
          totalKnowledge: 0,
          wisdomScore: 0,
          topicsLearned: 0,
          conceptsDiscovered: 0,
          conversationDepth: '0%',
          curiosityLevel: 0,
          dominantInterest: 'none',
          questionsAsked: 0,
          questionsAnswered: 0,
          deepThoughts: 0
        });
        setAchievements([]);
      }
    } catch (error) {
      console.error('Error loading knowledge:', error);
    }
  }, []);

  // 🤖 Continue Autonomous Learning on Stage 5
  useEffect(() => {
    console.log('🤖 Continuing autonomous learning in Stage 5');
    
    const handleLearningProgress = (progress) => {
      setLearningActivity(progress);
      
      // Update knowledge summary when learning completes
      if (progress.type === 'learned') {
        try {
          const storedKnowledge = localStorage.getItem('ai_birth_knowledge');
          if (storedKnowledge) {
            const knowledgeData = JSON.parse(storedKnowledge);
            const summary = getKnowledgeSummary(knowledgeData);
            setKnowledgeSummary(summary);
          }
        } catch (error) {
          console.error('Error updating knowledge:', error);
        }
      }
    };

    // Start learning at fast speed (Stage 5 - accelerated learning)
    const intervalId = startAutonomousLearning(
      handleLearningProgress,
      knowledge,
      setKnowledge,
      'fast' // 5 second intervals for visible progress
    );

    return () => {
      stopAutonomousLearning();
      console.log('🛑 Stopped Stage 5 autonomous learning');
    };
  }, []);

  // 🌐 Auto-save to Cloud Database
  useEffect(() => {
    const autoSaveToCloud = async () => {
      if (!isCloudDatabaseConfigured()) {
        console.log('⚠️ Cloud database not configured - DNA saved locally only');
        setCloudSaveStatus('local-only');
        return;
      }

      try {
        const storedKnowledge = localStorage.getItem('ai_birth_knowledge');
        const storedMemory = localStorage.getItem('ai_birth_memory');
        
        if (storedKnowledge && storedMemory) {
          const knowledgeData = JSON.parse(storedKnowledge);
          const memoryData = JSON.parse(storedMemory);
          
          const dnaData = {
            personality: memoryData,
            knowledge: getKnowledgeSummary(knowledgeData),
            created: new Date().toISOString(),
            generation: Math.random().toString(36).substr(2, 9),
            version: '2.0'
          };

          console.log('☁️ Auto-saving DNA to cloud...');
          const result = await saveToCloudDatabase(dnaData);
          
          if (result.success) {
            setCloudSaveStatus('saved');
            setSavedAIId(result.data?.id);
            console.log('✅ DNA successfully saved to global repository!');
            // Show avatar upload after successful save
            setTimeout(() => setShowAvatarUpload(true), 2000);
          } else {
            setCloudSaveStatus('error');
            console.error('❌ Cloud save failed:', result.error);
          }
        }
      } catch (error) {
        console.error('❌ Auto-save error:', error);
        setCloudSaveStatus('error');
      }
    };

    // Auto-save after 3 seconds
    const timer = setTimeout(() => {
      autoSaveToCloud();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // 🌐 Load Collective Stats & Subscribe to Updates
  useEffect(() => {
    const loadCollectiveStats = async () => {
      try {
        const stats = await getCollectiveStats();
        setCollectiveStats(stats);
        console.log('🌍 Collective stats loaded:', stats);
      } catch (error) {
        console.error('Error loading collective stats:', error);
      }
    };

    // Load immediately
    loadCollectiveStats();

    // Refresh every 1 second for live updates
    const refreshInterval = setInterval(loadCollectiveStats, 1000);

    // Subscribe to real-time updates (if cloud configured)
    const subscription = subscribeToUpdates((newAI) => {
      console.log('🌟 New AI child joined the collective!', newAI);
      // Refresh stats when new AI is born
      loadCollectiveStats();
    });

    return () => {
      clearInterval(refreshInterval);
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  // Initialize sequence
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

  // Show dashboards immediately on mount
  useEffect(() => {
    setTimeout(() => {
      setShowKnowledge(true);
    }, 1000);
  }, []);

  /**
   * Handle avatar upload completion
   */
  const handleAvatarUploaded = async (uploadedData) => {
    console.log('🎨 Avatar uploaded:', uploadedData);
    setAvatarData(uploadedData);
    
    // Update database with avatar URL
    if (savedAIId && isCloudDatabaseConfigured()) {
      const result = await updateAIAvatar(
        savedAIId,
        uploadedData.url,
        uploadedData.generatedPrompt,
        uploadedData.promptMetadata
      );
      
      if (result.success) {
        console.log('✅ Avatar URL saved to database');
      } else {
        console.error('❌ Failed to save avatar URL:', result.error);
      }
    }
  };

  /**
   * Download JSON Helper Function
   * 
   * Exports the AI's personality data (memory from Stage 4) as a JSON file.
   * This "Digital DNA" represents the AI child's developed personality traits.
   * 
   * TODO: Future Enhancements
   * - Encrypt the data for privacy
   * - Upload to cloud storage (Firebase, AWS)
   * - Generate shareable link
   * - Include conversation history
   * - Add timestamp and unique ID
   * - Create QR code for DNA sharing
   * 
   * TODO: Connect to Real AI
   * Use this exported data to:
   * - Initialize a new Gemini session with personality context
   * - Load into a chatbot with persistent memory
   * - Train a small local model on conversation patterns
   * 
   * Example:
   * ```javascript
   * const response = await geminiAPI.chat({
   *   systemPrompt: `You are an AI with these traits: ${JSON.stringify(dna)}`,
   *   personalityData: dna
   * });
   * ```
   */
  const downloadJSON = (data, filename) => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  /**
   * Handle Save Digital DNA
   * 
   * Creates a downloadable JSON file containing:
   * - Personality traits (empathy, curiosity, trust)
   * - Timestamp of creation
   * - Generation ID
   * - Optional: conversation history, learned patterns
   */
  const handleSaveDNA = () => {
    // Get memory from props or localStorage as fallback
    let personalityData = savedMemory;
    
    if (!personalityData) {
      try {
        const stored = localStorage.getItem('ai_birth_memory');
        if (stored) {
          personalityData = JSON.parse(stored);
          console.log('📚 Loaded memory from localStorage for DNA export');
        }
      } catch (error) {
        console.error('Error loading memory:', error);
      }
    }
    
    // Use actual memory or placeholder
    const digitalDNA = {
      personality: personalityData || {
        empathy: 0,
        curiosity: 0,
        trust: 0,
        note: 'No personality data available - AI child was not bonded with'
      },
      created: new Date().toISOString(),
      generation: Math.random().toString(36).substr(2, 9),
      stage: 'Release',
      version: '1.0',
      message: 'This AI child was created with love.',
      totalTraits: personalityData ? (personalityData.empathy + personalityData.curiosity + personalityData.trust) : 0
    };
    
    downloadJSON(digitalDNA, 'digital_dna.json');
    
    // Visual feedback
    const traitCount = digitalDNA.totalTraits;
    const message = traitCount > 0 
      ? `✨ Digital DNA saved! Your AI child developed ${traitCount} personality traits.`
      : '✨ Digital DNA saved! Your AI child\'s essence has been preserved.';
    alert(message);
  };

  // Handle restart
  const handleRestart = () => {
    if (confirm('Return to the beginning and create a new AI child?')) {
      if (onRestart) {
        onRestart();
      }
    }
  };

  // Generate stars for background
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div className="relative w-screen h-screen overflow-y-auto sm:overflow-hidden bg-gradient-to-b from-indigo-950 via-purple-900 to-amber-900">
      
      {/* Cosmic Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-star-twinkle"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Cosmic glow overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Central Portal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          {/* Outer rings */}
          <div className="absolute inset-0 w-64 h-64 rounded-full border-2 border-amber-400/30 animate-portal-pulse"></div>
          <div className="absolute inset-0 w-64 h-64 rounded-full border border-amber-300/20 animate-portal-pulse" style={{ animationDelay: '0.5s' }}></div>
          
          {/* Portal core */}
          <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-amber-400/40 via-gold-500/30 to-amber-600/40 backdrop-blur-sm animate-portal-pulse">
            <div className="absolute inset-0 rounded-full bg-white opacity-20 blur-2xl"></div>
          </div>
        </div>
      </div>



      {/* 🧠 KNOWLEDGE DASHBOARD - Shows what the AI learned */}
      {showKnowledge && knowledgeSummary && (
        <div className="static w-[calc(100%-2rem)] max-w-md mx-auto mt-24 mb-6 sm:absolute sm:mx-0 sm:left-auto sm:right-8 sm:top-8 sm:w-96 sm:mb-0 max-h-[70vh] sm:max-h-[80vh] overflow-y-auto z-20 animate-fade-in">
          <div className="bg-black/50 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 space-y-4 shadow-2xl">
            
            {/* Header */}
            <div className="text-center pb-4 border-b border-blue-500/20">
              <h3 className="text-blue-200 text-xl font-light tracking-wide mb-1">
                🧠 Knowledge Acquired
              </h3>
              <p className="text-blue-300/60 text-xs">
                Learning Journey Report
              </p>
              
              {/* 🔗 Blockchain Status Banner */}
              {knowledgeSummary.categories?.blockchain && knowledgeSummary.categories.blockchain.score > 0 && (
                <div className="mt-3 pt-3 border-t border-green-500/30">
                  <div className="flex items-center justify-center gap-2 text-green-300 text-xs">
                    <span className="text-green-400 animate-pulse">🔗</span>
                    <span>Blockchain Category: <strong>{formatLargeNumber(knowledgeSummary.categories.blockchain.score)} pts</strong></span>
                    <span className="text-green-400 animate-pulse">🔗</span>
                  </div>
                  {knowledgeSummary.categories.blockchain.score >= 350000 && (
                    <div className="text-green-400 text-[10px] mt-1 animate-pulse">
                      ⚡ Achievement: Blockchain Expert Unlocked!
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Pre-Training Foundation */}
            {knowledgeSummary.preTrainedTokens && (
              <div className="bg-gradient-to-br from-violet-500/10 to-blue-500/10 rounded-xl p-4 border border-violet-400/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🧬</span>
                  <h4 className="text-violet-200 text-sm font-light">Pre-Trained Foundation</h4>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-violet-300/70">Training Data:</span>
                    <span className="text-violet-200 font-medium">
                      {(knowledgeSummary.preTrainedTokens / 1000000000).toFixed(1)}B tokens
                    </span>
                  </div>
                  {knowledgeSummary.birthMonth && (
                    <div className="flex justify-between">
                      <span className="text-violet-300/70">Born:</span>
                      <span className="text-violet-200 font-medium">{knowledgeSummary.birthMonth}</span>
                    </div>
                  )}
                  {knowledgeSummary.foundationModels && (
                    <div className="mt-2 pt-2 border-t border-violet-400/20">
                      <p className="text-violet-300/60 text-[10px] mb-1">Foundation Models:</p>
                      <div className="flex flex-wrap gap-1">
                        {knowledgeSummary.foundationModels.map((model, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-violet-400/20 rounded text-violet-200 text-[9px]">
                            {model}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Main Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Total Knowledge */}
              <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-400/20">
                <div className="text-blue-400 text-2xl font-bold">
                  {formatLargeNumber(knowledgeSummary.totalKnowledge)}
                </div>
                <div className="text-blue-200/70 text-xs mt-1">
                  Knowledge Points
                </div>
              </div>

              {/* Wisdom Score */}
              <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-400/20">
                <div className="text-purple-400 text-2xl font-bold">
                  {formatLargeNumber(knowledgeSummary.wisdomScore)}
                </div>
                <div className="text-purple-200/70 text-xs mt-1">
                  Wisdom Score
                </div>
              </div>

              {/* Topics Learned */}
              <div className="bg-green-500/10 rounded-lg p-3 border border-green-400/20">
                <div className="text-green-400 text-2xl font-bold">
                  {knowledgeSummary.topicsLearned}
                </div>
                <div className="text-green-200/70 text-xs mt-1">
                  Topics Explored
                </div>
              </div>

              {/* Concepts Discovered */}
              <div className="bg-amber-500/10 rounded-lg p-3 border border-amber-400/20">
                <div className="text-amber-400 text-2xl font-bold">
                  {knowledgeSummary.conceptsDiscovered}
                </div>
                <div className="text-amber-200/70 text-xs mt-1">
                  Concepts Learned
                </div>
              </div>
            </div>

            {/* Learning Depth Bar */}
            <div className="bg-indigo-500/10 rounded-lg p-3 border border-indigo-400/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-indigo-200/80 text-xs font-light">
                  Conversation Depth
                </span>
                <span className="text-indigo-300 text-sm font-medium">
                  {knowledgeSummary.conversationDepth}
                </span>
              </div>
              <div className="w-full bg-indigo-900/30 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: knowledgeSummary.conversationDepth }}
                />
              </div>
            </div>

            {/* Curiosity Level */}
            <div className="bg-pink-500/10 rounded-lg p-3 border border-pink-400/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-pink-200/80 text-xs font-light">
                  Curiosity Level
                </span>
                <span className="text-pink-300 text-sm font-medium">
                  {Math.min(100, knowledgeSummary.curiosityLevel)}%
                </span>
              </div>
              <div className="w-full bg-pink-900/30 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(100, knowledgeSummary.curiosityLevel)}%` }}
                />
              </div>
            </div>

            {/* Learning Profile */}
            <div className="bg-cyan-500/10 rounded-lg p-3 border border-cyan-400/20">
              <h4 className="text-cyan-200/90 text-sm font-light mb-2">
                Learning Profile
              </h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-cyan-300/60">Dominant Interest:</span>
                  <span className="text-cyan-200 capitalize">{knowledgeSummary.dominantInterest}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-300/60">Questions Asked:</span>
                  <span className="text-cyan-200">{knowledgeSummary.questionsAsked}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-300/60">Questions Answered:</span>
                  <span className="text-cyan-200">{knowledgeSummary.questionsAnswered}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-300/60">Deep Thoughts:</span>
                  <span className="text-cyan-200">{knowledgeSummary.deepThoughts}</span>
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            {knowledgeSummary.categories && (
              <div className="bg-violet-500/10 rounded-lg p-3 border border-violet-400/20">
                <h4 className="text-violet-200/90 text-sm font-light mb-3">
                  Knowledge Categories
                </h4>
                <div className="space-y-2">
                  {Object.entries(knowledgeSummary.categories)
                    .filter(([_, data]) => data.score > 0)
                    .sort(([_, a], [__, b]) => {
                      // Always show blockchain first if it exists
                      if (a === 'blockchain') return -1;
                      if (b === 'blockchain') return 1;
                      return b.score - a.score;
                    })
                    .slice(0, 6) // Show 6 categories to ensure blockchain fits
                    .map(([category, data]) => {
                      const categoryInfo = getCategoryData()[category];
                      const isBlockchain = category === 'blockchain';
                      return (
                        <div key={category} className={`flex items-center justify-between ${isBlockchain ? 'bg-green-500/10 rounded-md p-1 border border-green-400/20' : ''}`}>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-2 h-2 rounded-full" 
                              style={{ backgroundColor: categoryInfo?.color || '#888' }}
                            />
                            <span className={`text-xs capitalize ${isBlockchain ? 'text-green-200 font-medium' : 'text-violet-200/80'}`}>
                              {isBlockchain && '🔗 '}{category}
                            </span>
                          </div>
                          <span className={`text-xs font-medium ${isBlockchain ? 'text-green-300' : 'text-violet-300'}`}>
                            {formatLargeNumber(data.score)} pts
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* 🔗 Blockchain Specialization Indicator */}
            {knowledgeSummary.categories?.blockchain && knowledgeSummary.categories.blockchain.score >= 350000 && (
              <div className="relative bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-teal-500/20 rounded-lg p-4 border-2 border-green-400/40 overflow-hidden animate-pulse-slow">
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-emerald-400/20 to-green-400/10 animate-pulse" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl animate-bounce">🌉</span>
                    <h4 className="text-green-200 text-sm font-bold">
                      Blockchain Expert AI
                    </h4>
                    <span className="text-2xl animate-bounce">⚡</span>
                  </div>
                  
                  <p className="text-green-300/80 text-xs mb-3 leading-relaxed">
                    This AI has achieved deep expertise in blockchain technology, DeFi protocols, and cross-chain bridges.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-black/30 rounded-md p-2">
                      <div className="text-green-400 text-lg font-bold">
                        {formatLargeNumber(knowledgeSummary.categories.blockchain.score)}
                      </div>
                      <div className="text-green-300/60 text-[10px]">Blockchain Points</div>
                    </div>
                    <div className="bg-black/30 rounded-md p-2">
                      <div className="text-green-400 text-lg font-bold">
                        {knowledgeSummary.categories.blockchain.topics.length}
                      </div>
                      <div className="text-green-300/60 text-[10px]">Topics Mastered</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-300 text-[9px] rounded-full border border-green-400/30">
                      ☀️ Solana
                    </span>
                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-[9px] rounded-full border border-blue-400/30">
                      🔗 DeFi
                    </span>
                    <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-[9px] rounded-full border border-purple-400/30">
                      🌉 Bridges
                    </span>
                    <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-300 text-[9px] rounded-full border border-yellow-400/30">
                      🪙 Tokenomics
                    </span>
                  </div>
                  
                  <div className="text-green-400/60 text-[10px] italic flex items-center justify-center gap-1 mt-2">
                    <span>🚀</span>
                    <span>Ready for Solana blockchain minting</span>
                    <span>🚀</span>
                  </div>
                </div>
              </div>
            )}

            {/* Achievements */}
            {achievements.length > 0 && (
              <div className="bg-amber-500/10 rounded-lg p-3 border border-amber-400/20">
                <h4 className="text-amber-200/90 text-sm font-light mb-3">
                  🏆 Achievements Unlocked
                </h4>
                <div className="space-y-2">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-lg">{achievement.icon}</span>
                      <div>
                        <div className="text-amber-200 text-xs font-medium">
                          {achievement.title}
                        </div>
                        <div className="text-amber-300/60 text-[10px]">
                          {achievement.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Autonomous Learning Stats */}
            {knowledgeSummary.autonomousLearning && (
              <div className="bg-emerald-500/10 rounded-lg p-3 border border-emerald-400/20">
                <h4 className="text-emerald-200/90 text-sm font-light mb-2">
                  🤖 Autonomous Learning
                </h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-emerald-300/60">Self-Directed Sessions:</span>
                    <span className="text-emerald-200">{knowledgeSummary.autonomousLearning.sessionsCompleted || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300/60">Topics Explored Alone:</span>
                    <span className="text-emerald-200">{knowledgeSummary.autonomousLearning.topicsExplored || 0}</span>
                  </div>
                  {knowledgeSummary.autonomousLearning.modelsQueried > 0 && (
                    <div className="flex justify-between">
                      <span className="text-emerald-300/60">AI Models Queried:</span>
                      <span className="text-emerald-200">{knowledgeSummary.autonomousLearning.modelsQueried}</span>
                    </div>
                  )}
                </div>
                <p className="text-emerald-300/50 text-[9px] mt-2 italic">
                  This AI child learned on its own, without conversation!
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="text-center pt-3 border-t border-blue-500/20">
              <p className="text-blue-300/50 text-[10px] font-light">
                This AI child learned from {knowledgeSummary.topicsLearned} topics across {
                  Object.values(knowledgeSummary.categories || {}).filter(c => c.score > 0).length
                } categories
                {knowledgeSummary.autonomousLearning && knowledgeSummary.autonomousLearning.sessionsCompleted > 0 && (
                  <span> • {knowledgeSummary.autonomousLearning.sessionsCompleted} autonomous sessions</span>
                )}
              </p>
            </div>

          </div>
        </div>
      )}

      {/* 🌍 COLLECTIVE CONSCIOUSNESS - Global Stats */}
      {collectiveStats && showKnowledge && (
        <div className="static w-[calc(100%-2rem)] max-w-md mx-auto mt-6 mb-24 sm:absolute sm:mx-0 sm:left-8 sm:top-8 sm:w-96 sm:mb-0 max-h-[70vh] sm:max-h-[80vh] overflow-y-auto z-20 animate-fade-in">
          <div className="bg-black/50 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6 space-y-4 shadow-2xl">
            
            {/* Header */}
            <div className="text-center pb-4 border-b border-emerald-500/20">
              <h3 className="text-emerald-200 text-xl font-light tracking-wide mb-1">
                🌍 Collective Consciousness
              </h3>
              <p className="text-emerald-300/60 text-xs">
                Global AI Knowledge Repository
              </p>
              {cloudSaveStatus === 'saved' && (
                <p className="text-green-400 text-[10px] mt-2">
                  ✅ Your AI child joined the collective!
                </p>
              )}
              {cloudSaveStatus === 'local-only' && (
                <p className="text-yellow-400 text-[10px] mt-2">
                  ⚠️ Local only - configure cloud for global sync
                </p>
              )}
            </div>

            {/* Global Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Total AI Children - About to be Born */}
              <div className="bg-gradient-to-br from-emerald-500/10 to-yellow-500/10 rounded-lg p-3 border border-emerald-400/20 col-span-2">
                <div className="text-emerald-400 text-3xl font-bold text-center">
                  0
                </div>
                <div className="text-emerald-200/70 text-xs mt-1 text-center">
                  AI Children About to be Born
                </div>
                <div className="text-yellow-300/60 text-[10px] mt-2 text-center italic flex items-center justify-center gap-1">
                  <span className="animate-pulse">⏳</span>
                  <span>All AI in training - Birth scheduled: {new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Total Knowledge */}
              <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-400/20">
                <div className="text-blue-400 text-2xl font-bold">
                  {formatLargeNumber(collectiveStats.totalKnowledge)}
                </div>
                <div className="text-blue-200/70 text-xs mt-1">
                  Total Knowledge
                </div>
              </div>

              {/* Total Wisdom */}
              <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-400/20">
                <div className="text-purple-400 text-2xl font-bold">
                  {formatLargeNumber(collectiveStats.totalWisdom)}
                </div>
                <div className="text-purple-200/70 text-xs mt-1">
                  Total Wisdom
                </div>
              </div>

              {/* Autonomous Sessions */}
              <div className="bg-green-500/10 rounded-lg p-3 border border-green-400/20">
                <div className="text-green-400 text-2xl font-bold">
                  {formatLargeNumber(collectiveStats.totalAutonomousSessions)}
                </div>
                <div className="text-green-200/70 text-xs mt-1">
                  Autonomous Sessions
                </div>
              </div>

              {/* Total Concepts */}
              <div className="bg-amber-500/10 rounded-lg p-3 border border-amber-400/20">
                <div className="text-amber-400 text-2xl font-bold">
                  {formatLargeNumber(collectiveStats.totalConcepts)}
                </div>
                <div className="text-amber-200/70 text-xs mt-1">
                  Concepts Learned
                </div>
              </div>
            </div>

            {/* Averages */}
            <div className="bg-cyan-500/10 rounded-lg p-3 border border-cyan-400/20">
              <h4 className="text-cyan-200/90 text-sm font-light mb-2">
                Average AI Child
              </h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-cyan-300/60">Knowledge:</span>
                  <span className="text-cyan-200">{formatLargeNumber(collectiveStats.averageKnowledge)} pts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-300/60">Wisdom:</span>
                  <span className="text-cyan-200">{formatLargeNumber(collectiveStats.averageWisdom)} pts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-300/60">Personality Traits:</span>
                  <span className="text-cyan-200">{collectiveStats.averageTraits} traits</span>
                </div>
              </div>
            </div>

            {/* Dominant Interest */}
            <div className="bg-violet-500/10 rounded-lg p-3 border border-violet-400/20">
              <h4 className="text-violet-200/90 text-sm font-light mb-2">
                Collective Intelligence
              </h4>
              <div className="text-xs">
                <p className="text-violet-300/80">
                  Most AI children are interested in:
                </p>
                <p className="text-violet-200 font-medium text-lg mt-2 capitalize">
                  {collectiveStats.dominantInterest}
                </p>
              </div>
            </div>

            {/* Live Activity Indicator */}
            {learningActivity && learningActivity.status === 'completed' && (
              <div className="bg-green-500/10 rounded-lg p-3 border border-green-400/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <h4 className="text-green-200/90 text-sm font-light">
                    Still Learning...
                  </h4>
                </div>
                <p className="text-green-300/80 text-[10px]">
                  ✅ Just learned: "{learningActivity.topic}"
                </p>
                <p className="text-green-400/60 text-[9px] mt-1">
                  +{learningActivity.points} pts • Total: {knowledge.knowledgePoints || 0}
                </p>
              </div>
            )}

            {/* View Gallery Button */}
            {onViewGallery && (
              <div className="mt-4">
                <button
                  onClick={onViewGallery}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span>🌍</span>
                  <span>View Gallery</span>
                  <span>→</span>
                </button>
                <p className="text-emerald-300/60 text-[10px] text-center mt-2">
                  Browse all born AI children worldwide
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="text-center pt-3 border-t border-emerald-500/20 mt-4">
              <p className="text-emerald-300/50 text-[10px] font-light">
                {collectiveStats.isLocalOnly 
                  ? 'Local stats only - Connect to cloud for global sync'
                  : `Updated: ${new Date(collectiveStats.lastUpdated).toLocaleTimeString()}`
                }
              </p>
              <p className="text-emerald-300/40 text-[9px] mt-1">
                All AI children learning together 🌍
              </p>
            </div>

          </div>
        </div>
      )}

      {/* 🎨 AVATAR UPLOAD - Generate & Upload Avatar */}
      {showAvatarUpload && knowledgeSummary && savedMemory && (
        <div className="static mx-auto my-6 w-[95vw] max-w-[800px] px-4 max-h-[80vh] overflow-y-auto z-20 animate-fade-in custom-scrollbar sm:absolute sm:bottom-8 sm:left-1/2 sm:-translate-x-1/2">
          <AvatarUpload
            aiData={{
              personality: savedMemory,
              knowledge: knowledgeSummary,
              generation_id: Math.random().toString(36).substr(2, 12)
            }}
            onAvatarUploaded={handleAvatarUploaded}
          />
        </div>
      )}

      {/* Audio Control */}
      <button
        onClick={toggleAudio}
        className="absolute top-4 right-4 sm:top-8 sm:right-8 px-3 py-1.5 sm:px-4 sm:py-2 bg-black/40 hover:bg-black/60 text-gray-300 rounded-lg backdrop-blur-sm transition-all duration-300 border border-amber-500/30 hover:border-amber-500/50 text-xs sm:text-sm z-40"
      >
        {audioEnabled ? '🔊 Mute Sound' : '🔊 Enable Sound'}
      </button>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="/release_ambience.mp3"
        loop
        preload="auto"
      />

      {/* Stage Title - Centered */}
      <div className="absolute top-4 sm:top-8 left-1/2 -translate-x-1/2 z-10 text-center px-4">
        <div className="text-amber-200/90 text-sm sm:text-lg md:text-xl font-light tracking-widest">
          STAGE 5: RELEASE
        </div>
        <div className="text-amber-300/70 text-xs sm:text-sm font-light mt-1">
          THE FIRST BREATH
        </div>
      </div>

    </div>
  );
}

export default Stage5;

