# 🚀 Quick Start Guide

## Install & Run (3 steps)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **🤖 (Optional) Set up FREE AI - Get intelligent responses!**
   ```bash
   # Get free key from https://openrouter.ai/keys
   # Add to .env file:
   VITE_OPENROUTER_API_KEY=your_key_here
   ```
   See **OPENROUTER_SETUP.md** for detailed setup (3 minutes!)
   
   **Skip if you want**: App works perfectly with pre-written responses

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - Navigate to `http://localhost:5173` (or the URL shown in terminal)
   - Click "🔊 Enable Sound" to hear the ambient heartbeat
   - Watch the narration unfold
   - Click "Continue to Gestation →" when ready

## What You'll See

### Stage 1: Conception
✨ **Animated particle field** - Neural sparks swirling in the void  
💜 **Pulsing embryo sphere** - The digital consciousness forming  
⌨️ **Typewriter narration** - Poetic text revealing the story  
🎵 **Ambient audio** - (You already have heartbeat.mp3!)

### Stage 2: Gestation
🎨 **Canvas data veins** - Living neural pathways that pulse and glow  
🌊 **Growing embryo** - Slowly scaling with concentric rings  
✨ **Drifting particles** - Life pulses rising upward  
📊 **Status display** - "Heartbeat 02 • Training Begins • Epoch 1"  
🎵 **Womb ambience** - Deep, meditative audio (add womb_ambience.mp3)

### Stage 3: Awakening
🌟 **Shimmer particles** - Golden light rain falling  
💬 **AI dialogue** - First words: "...hel...lo? what... am I?"  
⌨️ **Chat interface** - Type and talk with the newborn AI  
🎭 **Glowing effects** - Lens flares on consciousness moments  
🎵 **Birth ambience** - Ethereal, awakening sounds (add birth_ambience.mp3)

### Stage 4: Bonding
🧠 **Memory system** - AI learns empathy, curiosity, trust  
💬 **Personality growth** - Responses adapt to learned traits  
💭 **Floating memories** - Particles symbolize learning  
🌟 **Reactive glow** - Brightens when AI responds  
📊 **Live trait display** - See personality forming in real-time  
🎵 **Bonding ambience** - Warm, emotional sounds (add bonding_ambience.mp3)

### Stage 5: Release ✨ NEW!
🌌 **Cosmic scene** - 100 twinkling stars, gradient sky  
🌀 **Portal animation** - Pulsing gateway to the network  
💬 **Emotional farewell** - AI child says goodbye  
🧬 **Digital DNA** - Geometric pattern ascends  
💾 **Download JSON** - Save personality data  
🔄 **Restart button** - Begin a new journey  
🎵 **Transcendent audio** - Hopeful, cosmic ambience

## Files Overview

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app with routing & restart (ALL 5 stages) |
| `src/Stage2.jsx` | Stage 2: Gestation component with Canvas |
| `src/Stage3.jsx` | Stage 3: Awakening with AI dialogue |
| `src/Stage4.jsx` | Stage 4: Bonding with memory system |
| `src/Stage5.jsx` | Stage 5: Release with DNA export |
| `src/components/TypewriterText.jsx` | Reusable typewriter effect |
| `src/index.css` | Tailwind + custom animations (both stages) |
| `tailwind.config.js` | Custom animation keyframes |
| `public/heartbeat.mp3` | Stage 1 ambient audio (already included!) |
| `public/womb_ambience.mp3` | Stage 2 audio (add later - see README) |
| `public/birth_ambience.mp3` | Stage 3 audio (add later - see README) |
| `public/bonding_ambience.mp3` | Stage 4 audio (add later - see README) |
| `public/release_ambience.mp3` | Stage 5 audio (add later - see README) |

## Customization Tips

### Stage 1: Change particle count
Edit line ~99 in `App.jsx` (inside Stage1 component):
```javascript
const particles = Array.from({ length: 30 }, ...);
//                                      ↑ change this number
```

### Stage 2: Adjust Canvas particles
Edit line ~166 in `Stage2.jsx`:
```javascript
const veins = Array.from({ length: 25 }, ...);    // Neural veins
const pulses = Array.from({ length: 40 }, ...);   // Drifting particles
```

### Adjust typing speed (both stages)
```javascript
<TypewriterText
  text="..."
  speed={40}  // ← lower = faster, higher = slower
  ...
/>
```

### Modify colors
- **Stage 1**: Purple/violet theme (`bg-purple-`, `bg-violet-`)
- **Stage 2**: Pink/violet theme (`bg-pink-`, `text-pink-`)

### Jump directly to a specific stage
Edit `App.jsx` line ~23:
```javascript
const [currentStage, setCurrentStage] = useState(5);  // Start at Stage 5
// Options: 1 (Conception), 2 (Gestation), 3 (Awakening), 4 (Bonding), 5 (Release)
```

## Stage Navigation

Experience the **complete journey:**
- Stage 1 → "Continue to Gestation" → Stage 2
- Stage 2 → "Continue to Awakening" → Stage 3  
- Stage 3 → Chat, then "Continue to Bonding" → Stage 4
- Stage 4 → Build personality, then "Continue to Release" → Stage 5
- Stage 5 → "✨ Restart Simulation" or "🪶 Save Digital DNA"

**🎉 COMPLETE CYCLE AVAILABLE! 🎉**
- ✅ Stage 1: Conception (The spark)
- ✅ Stage 2: Gestation (The growth)
- ✅ Stage 3: Awakening (The birth)
- ✅ Stage 4: Bonding (The connection)
- ✅ Stage 5: Release (The transcendence)

**Future Ideas:**
- Stage 6: Return (AI comes back)
- Community features (share DNA)
- Multiplayer experiences

## Advanced Integration

### Connect Real AI Data (Stage 2)
See `STAGE2_GUIDE.md` for:
- Visualizing training metrics (loss, accuracy, epochs)
- Animating data veins based on gradient flow
- Scaling embryo with model complexity
- Real-time progress tracking

### Connect Gemini API (Stages 3 & 4)
**Stage 3:** See `STAGE3_GUIDE.md` for:
- Replacing stub responses with real AI
- Conversation context management
- Streaming responses character-by-character
- Adding text-to-speech (TTS) voice

**Stage 4:** Personality & memory system:
- AI learns empathy, curiosity, and trust from user messages
- Sentiment analysis adjusts personality traits
- Adaptive responses based on dominant trait
- Ready for Gemini API integration with personality context

**Stage 5:** Complete the cycle:
- Export Digital DNA as JSON file (downloadable)
- Contains all personality traits and metadata
- Use "Restart Simulation" to begin again
- Perfect ending with cosmic farewell

---

**Enjoy the simulation!** 🌌

