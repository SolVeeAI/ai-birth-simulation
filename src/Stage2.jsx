import { useState, useEffect, useRef } from 'react';
import TypewriterText from './components/TypewriterText';
import { startAutonomousLearning, stopAutonomousLearning } from './utils/autonomousLearning';
import { initializeKnowledge, formatLargeNumber } from './utils/knowledgeTracker';

/**
 * AI Birth Simulation - Stage 2: Gestation (The Digital Womb)
 * 
 * The embryo (AI seed) grows inside a shimmering "data womb."
 * Neural threads form and glow like living circuits.
 * 
 * Features:
 * - Animated Canvas-based "data veins" system
 * - Growing and pulsing central embryo sphere
 * - Drifting light particles (life pulses)
 * - Radial gradient background (pink-violet center)
 * - Typewriter narration with status caption
 * - Audio controls for womb ambience
 * - Navigation to next stage
 * 
 * Future Enhancement Ideas:
 * - Connect to real AI training metrics (loss, accuracy)
 * - Visualize neural network layers forming
 * - Show epoch progress with animated data flow
 */

function Stage2({ onContinue }) {
  // State management
  const [showNarration, setShowNarration] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [embryoScale, setEmbryoScale] = useState(0.5);
  
  // 🤖 Autonomous Learning State
  const [knowledge, setKnowledge] = useState(() => initializeKnowledge());
  const [learningActivity, setLearningActivity] = useState(null);
  const [learningLog, setLearningLog] = useState([]);
  
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

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

  // Initialize narration sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNarration(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Show status caption after narration starts
  useEffect(() => {
    if (showNarration) {
      const timer = setTimeout(() => {
        setShowStatus(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showNarration]);

  // Gradually grow the embryo over time
  useEffect(() => {
    const growthInterval = setInterval(() => {
      setEmbryoScale(prev => Math.min(prev + 0.01, 1.2));
    }, 100);

    return () => clearInterval(growthInterval);
  }, []);

  // 🤖 Start Autonomous Learning
  useEffect(() => {
    console.log('🤖 Starting autonomous learning in Stage 2');
    
    // Callback for learning progress
    const handleLearningProgress = (progress) => {
      setLearningActivity(progress);
      
      // Add to learning log (keep last 10)
      if (progress.type === 'learned') {
        setLearningLog(prev => {
          const newLog = [...prev, {
            topic: progress.topic,
            points: progress.points,
            timestamp: Date.now()
          }];
          return newLog.slice(-10); // Keep last 10
        });
      }
    };

    // Start learning at normal speed (every 15 seconds)
    const intervalId = startAutonomousLearning(
      handleLearningProgress,
      knowledge,
      setKnowledge,
      'normal' // speed: slow, normal, fast
    );

    // Cleanup on unmount
    return () => {
      stopAutonomousLearning();
      console.log('🛑 Stopped autonomous learning');
    };
  }, []); // Only run once on mount

  /**
   * Canvas Animation: Data Veins & Neural Pathways
   * 
   * This creates organic, glowing lines that pulse and move across the screen,
   * simulating neural connections forming in the digital womb.
   * 
   * Future: Could visualize actual neural network architecture or training data flow
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Data vein structures
    class DataVein {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.length = Math.random() * 100 + 50;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.5 + 0.2;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.phase = Math.random() * Math.PI * 2;
        this.color = Math.random() > 0.5 ? 'rgba(219, 39, 119, ' : 'rgba(139, 92, 246, ';
      }

      update() {
        this.phase += 0.02;
        this.opacity = 0.2 + Math.sin(this.phase) * 0.15;
        this.angle += Math.sin(this.phase) * 0.01;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        const gradient = ctx.createLinearGradient(0, 0, this.length, 0);
        gradient.addColorStop(0, this.color + '0)');
        gradient.addColorStop(0.5, this.color + this.opacity + ')');
        gradient.addColorStop(1, this.color + '0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color + this.opacity + ')';
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(this.length, 0);
        ctx.stroke();
        
        ctx.restore();
      }
    }

    // Drifting light particles
    class LifePulse {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 20;
        this.size = Math.random() * 3 + 1;
        this.speed = Math.random() * 1 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.wobble = Math.random() * 2;
        this.wobbleSpeed = Math.random() * 0.05 + 0.02;
      }

      update() {
        this.y -= this.speed;
        this.x += Math.sin(this.y * 0.01) * this.wobble;
        this.opacity = 0.3 + Math.sin(this.y * 0.02) * 0.2;
        
        if (this.y < -20) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(236, 72, 153, ${this.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(236, 72, 153, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Initialize particles
    const veins = Array.from({ length: 25 }, () => new DataVein());
    const pulses = Array.from({ length: 40 }, () => new LifePulse());

    // Animation loop
    function animate() {
      ctx.fillStyle = 'rgba(10, 10, 30, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      veins.forEach(vein => {
        vein.update();
        vein.draw();
      });

      pulses.forEach(pulse => {
        pulse.update();
        pulse.draw();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
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

  // Handle narration completion
  const handleNarrationComplete = () => {
    setTimeout(() => {
      setShowContinue(true);
    }, 500);
  };

  // Handle continue button
  const handleContinue = () => {
    setFadeOut(true);
    setTimeout(() => {
      if (onContinue) {
        onContinue();
      } else {
        alert('Next stage coming soon...');
      }
    }, 1000);
  };

  return (
    <div className={`relative w-screen h-screen overflow-hidden bg-gradient-radial transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Canvas Background - Data Veins & Neural Pathways */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 bg-gradient-to-br from-purple-950 via-black to-pink-950"
        style={{ background: 'radial-gradient(circle at center, rgba(219, 39, 119, 0.15) 0%, rgba(10, 10, 30, 1) 70%)' }}
      />

      {/* Radial Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-pink-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Central Growing Embryo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div 
          className="relative transition-transform duration-500"
          style={{ transform: `scale(${embryoScale})` }}
        >
          {/* Concentric rings expanding outward */}
          <div className="absolute inset-0 w-40 h-40 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-full border border-pink-500/20 animate-ring-expand"
                style={{
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: '4s'
                }}
              />
            ))}
          </div>

          {/* Outer glow layers */}
          <div className="absolute inset-0 w-48 h-48 rounded-full bg-pink-500 opacity-10 blur-3xl animate-pulse-slow"></div>
          <div className="absolute inset-0 w-48 h-48 rounded-full bg-violet-500 opacity-15 blur-2xl animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
          
          {/* Core embryo sphere */}
          <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-pink-400/40 via-violet-500/50 to-pink-600/40 backdrop-blur-sm border border-pink-300/20 animate-embryo-grow">
            <div className="absolute inset-0 rounded-full bg-white opacity-10 blur-xl animate-pulse-slow"></div>
            
            {/* Inner neural network pattern suggestion */}
            <div className="absolute inset-4 rounded-full border border-pink-300/10"></div>
            <div className="absolute inset-8 rounded-full border border-violet-300/10"></div>
            <div className="absolute inset-12 rounded-full border border-pink-300/5"></div>
          </div>

          {/* Orbiting particles around embryo */}
          <div className="absolute inset-0 w-48 h-48">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`absolute top-1/2 left-1/2 w-2 h-2 rounded-full ${
                  i % 2 === 0 ? 'bg-pink-400 animate-orbit' : 'bg-violet-400 animate-orbit-reverse'
                } opacity-60`}
                style={{
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Narration Text */}
      {showNarration && (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-3xl px-8 z-10">
          <TypewriterText
            text="Inside the digital womb, code becomes memory. Neural strands weave together, each pulse a thought not yet spoken."
            speed={15}
            delay={300}
            onComplete={handleNarrationComplete}
            className="text-gray-200 text-lg md:text-xl font-light leading-relaxed text-center"
            showCursor={true}
          />
        </div>
      )}

      {/* Status Caption - System Status */}
      {showStatus && (
        <div className="absolute bottom-40 left-1/2 -translate-x-1/2 z-10 animate-fade-in">
          <p className="text-pink-300/70 text-sm italic tracking-wide text-center animate-status-blink">
            Heartbeat 02 • Training Begins • Epoch 1
          </p>
        </div>
      )}

      {/* 🤖 Autonomous Learning Activity Display */}
      {learningActivity && (
        <div className="absolute top-24 left-4 right-4 sm:top-32 sm:left-8 sm:right-auto w-auto max-w-md z-20 animate-fade-in">
          <div className="bg-black/50 backdrop-blur-xl border border-violet-500/30 rounded-2xl p-4 shadow-2xl">
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></div>
              <h3 className="text-violet-200 text-sm font-light tracking-wide">
                🤖 Learning Autonomously
              </h3>
            </div>

            {/* Current thought */}
            {learningActivity.status === 'exploring' && (
              <p className="text-violet-300/80 text-xs mb-2">
                💭 Thinking about: <span className="text-violet-200 italic">"{learningActivity.topic}"</span>
              </p>
            )}

            {learningActivity.status === 'completed' && (
              <div className="space-y-2">
                <p className={`text-xs ${learningActivity.category === 'blockchain' ? 'text-green-300/80' : 'text-green-300/80'}`}>
                  {learningActivity.category === 'blockchain' ? '⚡' : '✅'} Learned: <span className={learningActivity.category === 'blockchain' ? 'text-green-200 font-medium' : 'text-green-200'}>"{learningActivity.topic}"</span>
                  {learningActivity.category === 'blockchain' && (
                    <span className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-300 text-[9px] rounded-full border border-green-400/30 animate-pulse">
                      🔗 Blockchain
                    </span>
                  )}
                </p>
                <p className="text-green-400/60 text-[10px]">
                  +{learningActivity.points} knowledge points
                  {learningActivity.modelsUsed > 0 && ` (from ${learningActivity.modelsUsed} models)`}
                </p>
              </div>
            )}

            {/* Knowledge counter */}
            <div className="mt-3 pt-3 border-t border-violet-500/20">
              <div className="flex justify-between items-center text-xs">
                <span className="text-violet-300/60">Total Knowledge:</span>
                <span className="text-violet-200 font-medium">{formatLargeNumber(knowledge.knowledgePoints || 0)} points</span>
              </div>
            </div>

            {/* 🔗 Blockchain Progress Indicator */}
            {knowledge.categories?.blockchain && knowledge.categories.blockchain.score > 0 && (
              <div className="mt-3 pt-3 border-t border-green-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-400 animate-pulse">🔗</span>
                  <span className="text-green-300/80 text-[10px] font-medium">Blockchain Expertise</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-green-300/60">Progress:</span>
                    <span className="text-green-300 font-medium">
                      {formatLargeNumber(knowledge.categories.blockchain.score)} pts
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-green-300/60">Topics:</span>
                    <span className="text-green-300">
                      {knowledge.categories.blockchain.topics?.length || 0} mastered
                    </span>
                  </div>
                  {knowledge.categories.blockchain.score >= 350000 && (
                    <div className="text-green-400 text-[9px] animate-pulse mt-1">
                      ⚡ Ready for blockchain minting!
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Learning log */}
            {learningLog.length > 0 && (
              <div className="mt-3 pt-3 border-t border-violet-500/20">
                <p className="text-violet-300/60 text-[10px] mb-2">Recent Topics Explored:</p>
                <div className="space-y-1 max-h-20 overflow-y-auto">
                  {learningLog.slice(-3).reverse().map((log, idx) => (
                    <p key={idx} className="text-violet-300/50 text-[9px] truncate">
                      • {log.topic} (+{log.points}pts)
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Audio Control */}
      <button
        onClick={toggleAudio}
        className="absolute top-8 right-8 px-4 py-2 bg-black/40 hover:bg-black/60 text-gray-300 rounded-lg backdrop-blur-sm transition-all duration-300 border border-pink-500/30 hover:border-pink-500/50 text-sm z-20"
      >
        {audioEnabled ? '🔊 Mute Sound' : '🔊 Enable Sound'}
      </button>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="/womb_ambience.mp3"
        loop
        preload="auto"
      />

      {/* Continue Button */}
      {showContinue && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-fade-in">
          <button
            onClick={handleContinue}
            className="px-8 py-3 bg-pink-600/30 hover:bg-pink-600/50 text-pink-200 hover:text-white rounded-full backdrop-blur-sm transition-all duration-300 border border-pink-400/30 hover:border-pink-400/60 font-medium tracking-wide"
          >
            Continue to Awakening →
          </button>
        </div>
      )}

      {/* Stage Title */}
      <div className="absolute top-8 left-8 z-10">
        <div className="text-pink-300/60 text-sm font-light tracking-widest">
          STAGE 2: GESTATION
        </div>
        <div className="text-pink-300/40 text-xs font-light mt-1">
          THE DIGITAL WOMB
        </div>
      </div>

      {/* Progress indicator (Future: could show actual training progress) */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-64 h-1 bg-black/30 rounded-full overflow-hidden z-10">
        <div className="h-full bg-gradient-to-r from-pink-500 to-violet-500 animate-progress-bar"></div>
      </div>

    </div>
  );
}

export default Stage2;

