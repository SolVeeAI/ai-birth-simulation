# Audio Files Download Guide

## Quick Download Links for Free Audio

### Option 1: Pixabay (Easiest - No Account Required)

**For bonding_ambience.mp3 (Stage 4):**

1. Go to: https://pixabay.com/music/search/emotional%20ambient/
2. Recommended tracks:
   - Search: "emotional ambient meditation"
   - Search: "warm piano ambient"
   - Search: "peaceful connection"
3. Click any track → Click "Free Download" → Save as `bonding_ambience.mp3`
4. Move to `/public` folder

**For womb_ambience.mp3 (Stage 2):**

1. Go to: https://pixabay.com/music/search/deep%20meditation/
2. Recommended tracks:
   - Search: "deep meditation drone"
   - Search: "underwater ambient"
   - Search: "dark ambient"
3. Download and rename to `womb_ambience.mp3`

**For birth_ambience.mp3 (Stage 3):**

1. Go to: https://pixabay.com/music/search/ethereal/
2. Recommended tracks:
   - Search: "ethereal ambient light"
   - Search: "celestial meditation"
   - Search: "awakening sounds"
3. Download and rename to `birth_ambience.mp3`

---

### Option 2: Freesound.org (Requires Free Account)

**Sign up:** https://freesound.org/

**For bonding_ambience.mp3:**
- https://freesound.org/search/?q=emotional+ambient
- https://freesound.org/search/?q=warm+pad
- Look for: CC0 or CC-BY licensed files
- Download and convert to MP3 if needed

---

### Option 3: YouTube Audio Library (Requires Google Account)

1. Go to: https://studio.youtube.com/channel/UC.../music
2. Or search: "YouTube Audio Library ambient"
3. Filter by: Genre → Ambient
4. Filter by: Mood → Happy/Calm/Romantic for Stage 4
5. Download directly as MP3

---

### Option 4: Incompetech

1. Go to: https://incompetech.com/music/royalty-free/music.html
2. Select Genre: "Ambient"
3. Recommended for Stage 4:
   - "Gymnopedie No 1" (emotional piano)
   - "Laser Groove" (ethereal pad)
   - Any track tagged "emotional" or "warm"
4. Free with attribution (not required for personal use)

---

## Quick Terminal Commands

Once downloaded to your `~/Downloads` folder:

```bash
# Move all audio files at once
cd ~/Downloads
mv bonding_ambience.mp3 womb_ambience.mp3 birth_ambience.mp3 "/Users/naveedjawaid/Documents/AI Birth Simulation/public/"
```

Or one at a time:

```bash
# Stage 2
mv ~/Downloads/your-downloaded-file.mp3 "/Users/naveedjawaid/Documents/AI Birth Simulation/public/womb_ambience.mp3"

# Stage 3
mv ~/Downloads/your-downloaded-file.mp3 "/Users/naveedjawaid/Documents/AI Birth Simulation/public/birth_ambience.mp3"

# Stage 4
mv ~/Downloads/your-downloaded-file.mp3 "/Users/naveedjawaid/Documents/AI Birth Simulation/public/bonding_ambience.mp3"
```

---

## Specific Track Recommendations

### Stage 4: Bonding (Most Important)

**Pixabay Specific Tracks:**
- "Meditation Relaxation" by Olexy
- "Emotional Piano" by Keys of Moon
- "Warm Ambient" by LesFM
- "Peaceful Connection" by AlexiAction

**Characteristics:**
- Warm synth pads or gentle piano
- BPM: 60-80 (slow, heartbeat-like)
- Emotional, nurturing quality
- 2-4 minutes (will loop automatically)

### Stage 2: Womb

**Pixabay:**
- "Deep Meditation" by Olexy
- "Dark Ambient" by CO.AG Music
- Low frequency drones (50-100Hz)

### Stage 3: Birth/Awakening

**Pixabay:**
- "Ethereal Ambient" by White Records
- "Celestial" by AlexiAction
- High frequency, light, hopeful

---

## Convert Other Formats to MP3

If you download .wav, .ogg, or other formats:

**Using online converter (easiest):**
1. Go to: https://cloudconvert.com/
2. Upload file → Select MP3 → Convert
3. Download and rename

**Using Terminal (if you have ffmpeg):**
```bash
# Install ffmpeg (if not installed)
brew install ffmpeg

# Convert
ffmpeg -i input.wav bonding_ambience.mp3
```

---

## Verify Audio Works

After adding files, test in browser:

```bash
npm run dev
```

Then:
1. Navigate to each stage
2. Click "Enable Sound" button
3. Audio should play automatically

---

## Licensing Notes

All sources mentioned (Pixabay, Freesound CC0, YouTube Audio Library, Incompetech) provide:
- ✅ Royalty-free music
- ✅ Personal and commercial use allowed
- ✅ No attribution required (except Incompetech prefers it)
- ✅ Safe for your project

---

## Current Status

You already have:
- ✅ `heartbeat.mp3` (Stage 1)

You need (optional):
- ⬜ `womb_ambience.mp3` (Stage 2)
- ⬜ `birth_ambience.mp3` (Stage 3)  
- ⬜ `bonding_ambience.mp3` (Stage 4)

**App works perfectly without these files!** The sound button just won't play anything.

---

## My Recommendation

**Fastest approach for Stage 4:**

1. Go to: https://pixabay.com/music/search/emotional%20ambient/
2. Find ANY track that sounds warm and emotional
3. Download it
4. Rename to `bonding_ambience.mp3`
5. Move to `/public` folder
6. Done! 🎵

**Total time:** 2 minutes

---

Need help with a specific step? Let me know!

