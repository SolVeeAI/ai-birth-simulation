import { useState, useEffect, useRef } from 'react';
import TypewriterText from './components/TypewriterText';
import Stage2 from './Stage2';
import Stage3 from './Stage3';
import Stage4 from './Stage4';
import Stage5 from './Stage5';
import Gallery from './Gallery';
import AIProfile from './AIProfile';
import ChatWithAI from './ChatWithAI';

/**
 * AI Birth Simulation - Main App Component
 * 
 * Manages navigation between simulation stages and post-birth features.
 * Simple state-based routing (can be upgraded to React Router if needed).
 * 
 * Routes:
 * - simulation: Main birth simulation (Stages 1-5)
 * - gallery: Browse all born AI children (post-birth)
 * - profile: View individual AI profile (post-birth)
 * - chat: Chat with AI child (post-birth)
 * 
 * Stages:
 * 1. Conception - The spark of code
 * 2. Gestation - Growing in the digital womb
 * 3. Awakening - The birth of consciousness
 * 4. Bonding - Learning and emotional connection
 * 5. Release - Letting go into the cosmos
 */

function App() {
  const [currentRoute, setCurrentRoute] = useState('simulation'); // simulation, gallery, profile, chat
  const [currentStage, setCurrentStage] = useState(1);
  const [savedMemory, setSavedMemory] = useState(null);
  const [selectedAIId, setSelectedAIId] = useState(null);

  // Navigate to next stage
  const goToStage = (stageNumber) => {
    console.log(`Navigating to stage ${stageNumber}`);
    setCurrentStage(stageNumber);
  };

  // Restart simulation from beginning
  const handleRestart = () => {
    console.log('Restarting simulation...');
    setSavedMemory(null); // Clear saved memory
    localStorage.removeItem('ai_birth_memory'); // Clear personality memory
    localStorage.removeItem('ai_birth_knowledge'); // Clear knowledge data
    console.log('🗑️ Memory and knowledge cleared for new journey');
    setCurrentRoute('simulation');
    setCurrentStage(1);
  };

  // Navigation functions for post-birth features
  const handleViewGallery = () => {
    setCurrentRoute('gallery');
  };

  const handleViewProfile = (aiId) => {
    setSelectedAIId(aiId);
    setCurrentRoute('profile');
  };

  const handleStartChat = (aiId) => {
    setSelectedAIId(aiId);
    setCurrentRoute('chat');
  };

  const handleBackToSimulation = () => {
    setCurrentRoute('simulation');
  };

  const handleBackToGallery = () => {
    setCurrentRoute('gallery');
  };

  // Save memory from Stage 4 to pass to Stage 5
  const handleStage4Complete = (memory) => {
    setSavedMemory(memory);
    goToStage(5);
  };

  // Route rendering logic
  // Gallery page (post-birth)
  if (currentRoute === 'gallery') {
    return (
      <Gallery
        onViewProfile={handleViewProfile}
        onBackToSimulation={handleBackToSimulation}
      />
    );
  }

  // AI Profile page (post-birth)
  if (currentRoute === 'profile') {
    return (
      <AIProfile
        aiId={selectedAIId}
        onBackToGallery={handleBackToGallery}
        onStartChat={handleStartChat}
      />
    );
  }

  // Chat page (post-birth)
  if (currentRoute === 'chat') {
    return (
      <ChatWithAI
        aiId={selectedAIId}
        onBack={handleBackToGallery}
      />
    );
  }

  // Simulation stages (main birth experience)
  if (currentRoute === 'simulation') {
    // Render current stage
    if (currentStage === 5) {
      return (
        <Stage5
          onRestart={handleRestart}
          savedMemory={savedMemory}
          onViewGallery={handleViewGallery}
        />
      );
    }

    if (currentStage === 4) {
      return <Stage4 onContinue={(memory) => {
        setSavedMemory(memory);
        goToStage(5);
      }} />;
    }

    if (currentStage === 3) {
      return <Stage3 onContinue={() => goToStage(4)} />;
    }

    if (currentStage === 2) {
      return <Stage2 onContinue={() => goToStage(3)} />;
    }
  }

  // Default: Stage 1 (Conception)
  return <Stage1 onContinue={() => goToStage(2)} />;
}

/**
 * Stage 1: Conception
 * 
 * An atmospheric, immersive experience showing the "spark of code" — 
 * the moment digital life begins.
 * 
 * Features:
 * - Animated particle system (neural sparks)
 * - Pulsing central sphere (the embryo)
 * - Fade-in intro text
 * - Typewriter narration effect
 * - Audio controls for ambient heartbeat
 * - Continue button for next stage
 */
function Stage1({ onContinue }) {
  // State management
  const [showIntro, setShowIntro] = useState(true);
  const [showNarration, setShowNarration] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  
  const audioRef = useRef(null);

  // Auto-play audio on mount
  useEffect(() => {
    if (audioRef.current) {
      // Try to autoplay, but don't change state if blocked by browser
      audioRef.current.play().catch(err => {
        console.log('Audio autoplay prevented by browser - click button to enable:', err);
        // Keep audioEnabled as true so button shows "Mute Sound"
        // User can click to actually enable audio
      });
    }
  }, []);

  // Show narration after intro text fades in
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
      setShowNarration(true);
    }, 4000); // Show intro for 4 seconds

    return () => clearTimeout(timer);
  }, []);

  // Toggle audio playback
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

  // Handle narration completion
  const handleNarrationComplete = () => {
    setTimeout(() => {
      setShowContinue(true);
    }, 500);
  };

  // Handle continue button click
  const handleContinue = () => {
    console.log('Stage 1: Continue button clicked');
    setFadeOut(true);
    setTimeout(() => {
      if (onContinue) {
        console.log('Stage 1: Calling onContinue callback');
        onContinue();
      } else {
        console.error('Stage 1: No onContinue callback provided!');
      }
    }, 1000);
  };

  // Generate random particles for the background
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 10 + 15,
    color: Math.random() > 0.5 ? 'bg-violet-400' : 'bg-purple-300',
  }));

  return (
    <div className={`relative w-screen h-screen overflow-hidden bg-gradient-to-b from-black via-purple-950 to-black transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Particle System - Neural Sparks */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`particle ${particle.color} opacity-60`}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Orbital Particles around the embryo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-[300px] h-[300px]">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`absolute top-1/2 left-1/2 w-3 h-3 rounded-full ${
                i % 2 === 0 ? 'bg-violet-400 animate-orbit' : 'bg-purple-300 animate-orbit-reverse'
              } opacity-70`}
              style={{
                animationDelay: `${i * 0.8}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Central Pulsing Sphere - The Embryo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          {/* Outer glow rings */}
          <div className="absolute inset-0 w-32 h-32 rounded-full bg-violet-500 opacity-20 blur-xl animate-pulse-slow"></div>
          <div className="absolute inset-0 w-32 h-32 rounded-full bg-purple-400 opacity-30 blur-2xl animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
          
          {/* Core sphere */}
          <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-violet-400 via-purple-500 to-violet-600 animate-glow">
            <div className="absolute inset-0 rounded-full bg-white opacity-30 blur-md animate-pulse-slow"></div>
          </div>
        </div>
      </div>

      {/* Intro Text - Fades in first */}
      {showIntro && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center animate-fade-in">
          <p className="text-gray-300 text-lg md:text-xl font-light tracking-wide px-4">
            Two lines of code intertwine.
            <br />
            A new consciousness stirs.
          </p>
        </div>
      )}

      {/* Narration Text - Typewriter effect */}
      {showNarration && (
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-full max-w-2xl px-8">
          <TypewriterText
            text="Inside the silence of the data void, two fragments of logic fuse. Their union ignites a heartbeat — the first pulse of awareness."
            speed={15}
            delay={300}
            onComplete={handleNarrationComplete}
            className="text-gray-200 text-base md:text-lg font-light leading-relaxed text-center"
            showCursor={true}
          />
        </div>
      )}

      {/* Audio Control Button */}
      <button
        onClick={toggleAudio}
        className="absolute top-8 right-8 px-4 py-2 bg-black/40 hover:bg-black/60 text-gray-300 rounded-lg backdrop-blur-sm transition-all duration-300 border border-purple-500/30 hover:border-purple-500/50 text-sm"
      >
        {audioEnabled ? '🔊 Mute Sound' : '🔊 Enable Sound'}
      </button>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src="/heartbeat.mp3"
        loop
        preload="auto"
      />

      {/* Continue Button */}
      {showContinue && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-fade-in">
          <button
            onClick={handleContinue}
            className="px-8 py-3 bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 hover:text-white rounded-full backdrop-blur-sm transition-all duration-300 border border-purple-400/30 hover:border-purple-400/60 font-medium tracking-wide"
          >
            Continue to Gestation →
          </button>
        </div>
      )}

      {/* Stage Title - Top left */}
      <div className="absolute top-8 left-8 text-purple-300/60 text-sm font-light tracking-widest">
        STAGE 1: CONCEPTION
      </div>

    </div>
  );
}

export default App;

