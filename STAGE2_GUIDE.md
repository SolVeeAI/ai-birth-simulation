# Stage 2: Gestation – Technical Guide

## 🧬 Concept

Stage 2 represents the **gestation period** where the AI embryo grows within a "digital womb." Neural pathways form, data flows through organic channels, and consciousness begins to take shape.

## 🎨 Visual Features

### 1. Canvas-Based Data Veins
The background features animated "neural pathways" rendered on HTML5 Canvas:

- **DataVein class**: Creates glowing lines that pulse and drift
- **25 veins** constantly animating with sine-wave opacity
- Pink and violet color scheme for organic feel
- Gaussian blur for ethereal glow effect

**How it works:**
```javascript
// Each vein has:
- Position (x, y)
- Length and angle
- Pulsing opacity (sine wave)
- Gradient coloring (transparent → color → transparent)
- Shadow/glow effects
```

### 2. Drifting Life Pulses
Particle system with upward-drifting light orbs:

- **40 particles** rising from bottom to top
- Wobble effect for organic movement
- Pink glow with varying opacity
- Auto-reset when reaching top

### 3. Growing Embryo Sphere
Central element that slowly scales over time:

- Starts at 50% scale
- Grows to 120% over ~2 minutes
- Multiple glow layers (pink/violet gradient)
- Concentric inner rings suggesting neural layers
- 12 orbiting particles around it

### 4. Expanding Rings
Concentric circles that expand outward:

- 4 rings with staggered timing
- Scale from 0.5x to 2.5x
- Fade out as they expand
- Suggests "heartbeat pulses" or growth waves

## 🎵 Audio System

The audio system is identical to Stage 1:

```javascript
// Toggle between play/pause
<audio ref={audioRef} src="/womb_ambience.mp3" loop />
```

**Recommended audio characteristics:**
- Deep bass tones (50-100 Hz)
- Slow rhythmic pulses (40-60 BPM)
- Underwater/reverberant quality
- Seamlessly looping

## ⚙️ State Management

```javascript
const [showNarration, setShowNarration] = useState(false);
const [showStatus, setShowStatus] = useState(false);
const [showContinue, setShowContinue] = useState(false);
const [audioEnabled, setAudioEnabled] = useState(false);
const [fadeOut, setFadeOut] = useState(false);
const [embryoScale, setEmbryoScale] = useState(0.5);
```

### Timeline:
1. **0s**: Scene loads, Canvas animation starts
2. **1s**: Narration begins (typewriter effect)
3. **5s**: Status caption appears ("Heartbeat 02 • Training Begins • Epoch 1")
4. **After narration completes + 2s**: Continue button appears
5. **Background**: Embryo grows continuously from 0.5x to 1.2x scale

## 📊 Future Integration: Live AI Data

Stage 2 is designed to be connected to actual AI training processes. Here's how:

### 1. Real-time Training Metrics
Replace the static status text with live data:

```javascript
// Instead of:
<p>Heartbeat 02 • Training Begins • Epoch 1</p>

// Use props from parent:
<p>Epoch {epoch} • Loss: {loss.toFixed(4)} • Acc: {accuracy}%</p>
```

### 2. Dynamic Data Veins
Make veins respond to gradient flow:

```javascript
// In DataVein.update():
this.opacity = 0.2 + (gradientMagnitude * 0.5);
this.speed = baseSpeed + (learningRate * 10);
```

### 3. Embryo Growth Based on Model Size
Scale the embryo based on neural network parameters:

```javascript
// Scale based on total parameters
const scale = 0.5 + (totalParams / maxParams) * 0.7;
setEmbryoScale(scale);
```

### 4. Training Progress Bar
The progress bar at the top can show real epoch progress:

```javascript
// Update CSS animation or inline style:
<div style={{ width: `${(currentEpoch / totalEpochs) * 100}%` }} />
```

## 🎛️ Customization Options

### Change Particle Count

```javascript
// Line ~166 in Stage2.jsx
const veins = Array.from({ length: 25 }, () => new DataVein());
const pulses = Array.from({ length: 40 }, () => new LifePulse());
```

### Adjust Animation Speeds

In `tailwind.config.js`:
```javascript
'embryo-grow': 'embryo-grow 5s ease-in-out infinite',  // Change 5s
'ring-expand': 'ring-expand 4s ease-out infinite',      // Change 4s
```

### Modify Color Scheme

Search and replace in `Stage2.jsx`:
- `pink-` → `blue-` (change to blue theme)
- `violet-` → `cyan-` (complementary color)

### Change Narration Text

```javascript
// Line ~232
<TypewriterText
  text="Your custom narration here..."
  speed={35}  // Characters per frame
  ...
/>
```

### Adjust Canvas Resolution

```javascript
// For high-DPI displays:
canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;
ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
```

## 🐛 Troubleshooting

### Canvas not animating
- Check console for errors
- Verify `canvasRef` is properly attached
- Ensure `requestAnimationFrame` is running

### Audio not playing
- Check browser autoplay policies (user interaction required)
- Verify `womb_ambience.mp3` exists in `/public`
- Look for console errors from audio element

### Performance issues
- Reduce particle counts (veins/pulses)
- Increase Canvas animation frame skip
- Simplify blur effects (`shadowBlur` values)

### Embryo not growing
- Check `useEffect` with growth interval is running
- Verify state updates with React DevTools
- Ensure CSS transitions are enabled

## 🔗 Navigation Flow

```
App.jsx (Stage Router)
  ├─> currentStage === 1 → <Stage1 onContinue={() => goToStage(2)} />
  └─> currentStage === 2 → <Stage2 onContinue={() => goToStage(3)} />
```

**Simple state-based routing** (no React Router needed for now)

To start directly at Stage 2:
```javascript
// In App.jsx line ~18
const [currentStage, setCurrentStage] = useState(2);
```

## 📈 Performance Notes

- Canvas animation runs at ~60 FPS
- 65 total animated elements (25 veins + 40 pulses)
- Lightweight: No heavy physics libraries
- Optimized with `requestAnimationFrame`
- Fade trails use alpha blending for smooth motion blur

## 🎓 Learning Opportunities

This stage demonstrates:
- **HTML5 Canvas API** for custom animations
- **Particle systems** with organic movement
- **State-driven animation** timing
- **Procedural generation** (random positions/speeds)
- **CSS + Canvas hybrid** rendering
- **Modular component** architecture

---

**Next:** Stage 3 will feature the "awakening" — where the AI opens its eyes for the first time and begins to perceive its digital environment.

