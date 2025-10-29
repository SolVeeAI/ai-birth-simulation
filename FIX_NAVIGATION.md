# Navigation Fix Guide

## Problem
Clicking "Continue to Gestation →" shows "coming soon" alert instead of loading Stage 2.

## Solution

### Step 1: Hard Refresh Your Browser

The issue is likely browser caching. Try these steps **in order**:

#### Option A: Hard Refresh (Try this first!)
- **Chrome/Edge (Mac)**: `Cmd + Shift + R`
- **Chrome/Edge (Windows/Linux)**: `Ctrl + Shift + R` or `Ctrl + F5`
- **Firefox (Mac)**: `Cmd + Shift + R`
- **Firefox (Windows/Linux)**: `Ctrl + F5`
- **Safari**: `Cmd + Option + R`

#### Option B: Clear Cache and Reload
1. Open browser DevTools (F12 or Cmd+Option+I)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

#### Option C: Restart Dev Server
```bash
# Stop the current server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

### Step 2: Verify the Code

The navigation code in `App.jsx` should look like this:

```javascript
function App() {
  const [currentStage, setCurrentStage] = useState(1);

  const goToStage = (stageNumber) => {
    setCurrentStage(stageNumber);
  };

  if (currentStage === 2) {
    return <Stage2 onContinue={() => goToStage(3)} />;
  }

  return <Stage1 onContinue={() => goToStage(2)} />;
}
```

And in Stage1's `handleContinue`:

```javascript
const handleContinue = () => {
  setFadeOut(true);
  setTimeout(() => {
    if (onContinue) {
      onContinue();  // ← This should call goToStage(2)
    }
  }, 1000);
};
```

### Step 3: Test Navigation

1. Open `http://localhost:5173`
2. Wait for Stage 1 narration to complete
3. Click "Continue to Gestation →"
4. You should see Stage 2 with pink/violet theme and data veins

**Note:** Stage 2's button says "Continue to Awakening →" and THAT one will show "coming soon" (Stage 3 isn't built yet).

### Step 4: If Still Not Working

#### Check Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Look for any red error messages
4. Share the errors if you see any

#### Verify File Was Saved
```bash
# Check the modification time of App.jsx
ls -la src/App.jsx

# Verify it has the Stage2 import
grep "Stage2" src/App.jsx
```

Should output: `import Stage2 from './Stage2';`

#### Force Clean Build
```bash
# Stop dev server (Ctrl+C)
# Remove build cache
rm -rf node_modules/.vite
rm -rf dist

# Restart
npm run dev
```

### Step 5: Manual Verification

If you want to jump directly to Stage 2 for testing, temporarily edit `App.jsx`:

```javascript
// Line 18 in App.jsx
const [currentStage, setCurrentStage] = useState(2);  // ← Change 1 to 2
```

Save, refresh browser, and you should see Stage 2 immediately.

Don't forget to change it back to `1` when done testing!

---

## Expected Behavior

### Stage 1 → Stage 2 (Should work!)
- Click "Continue to Gestation →"
- Screen fades to black
- Stage 2 loads with:
  - Pink/violet color scheme
  - Canvas data veins
  - Growing embryo
  - "STAGE 2: GESTATION" in top left

### Stage 2 → Stage 3 (Shows alert - expected!)
- Click "Continue to Awakening →"  
- Shows "Next stage coming soon..."
- This is correct behavior (Stage 3 isn't built yet)

---

## Still Having Issues?

1. Check that you're running the latest code
2. Try in a different browser
3. Try Incognito/Private mode (no cache)
4. Share any console errors you see

