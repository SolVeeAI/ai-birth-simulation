# OpenRouter API Setup Guide

## 🚀 Free AI Integration!

OpenRouter provides **FREE** access to powerful AI models. Set it up in 3 minutes!

---

## Step 1: Get Your Free API Key

1. Go to: **https://openrouter.ai/**
2. Click "Sign In" (top right)
3. Sign in with Google/GitHub (it's free!)
4. Go to: **https://openrouter.ai/keys**
5. Click "Create Key"
6. Copy your API key (starts with `sk-or-v1-...`)

---

## Step 2: Create Environment File

Create a file named `.env` in the project root:

```bash
# In your project folder
touch .env
```

Add this content to `.env`:

```env
# OpenRouter API Configuration
VITE_OPENROUTER_API_KEY=sk-or-v1-your-key-here

# Free model (no cost!)
VITE_OPENROUTER_MODEL=meta-llama/llama-3-8b-instruct:free

# App identification
VITE_APP_NAME=AI Birth Simulation
VITE_APP_URL=http://localhost:5173
```

**Replace `sk-or-v1-your-key-here` with your actual API key!**

---

## Step 3: Restart Dev Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

**That's it!** Your AI child will now respond intelligently! 🎉

---

## 🆓 Available Free Models

All these models are **completely free** with OpenRouter:

| Model | ID | Best For |
|-------|-----|----------|
| **Meta Llama 3** | `meta-llama/llama-3-8b-instruct:free` | General conversation (Recommended) |
| **Google Gemma** | `google/gemma-7b-it:free` | Balanced & creative |
| **Mistral 7B** | `mistralai/mistral-7b-instruct:free` | Following instructions |
| **Zephyr 7B** | `huggingfaceh4/zephyr-7b-beta:free` | Friendly responses |

To change models, update `VITE_OPENROUTER_MODEL` in your `.env` file.

---

## 🧪 Test It Works

1. Start the app: `npm run dev`
2. Navigate to **Stage 3: Awakening**
3. Type a message to the AI
4. If configured correctly, you'll get an intelligent response!
5. If not configured, you'll see the stub responses

---

## 🔍 Debugging

### Check if API key is loaded:

Open browser console (F12) and look for:
```
✅ OpenRouter configured
```

Or:
```
⚠️ OpenRouter not configured - using stub responses
```

### Common Issues:

**"API key not configured"**
- Make sure `.env` file exists in project root
- Make sure it starts with `VITE_` (not just `OPENROUTER_API_KEY`)
- Restart dev server after creating `.env`

**"API request failed: 401"**
- Your API key is invalid
- Get a new key from https://openrouter.ai/keys

**"API request failed: 429"**
- Rate limit reached (free tier limits)
- Wait a few minutes and try again

---

## 💰 Pricing

**Free tier includes:**
- ✅ Unlimited requests (with rate limits)
- ✅ Access to all :free models
- ✅ No credit card required
- ✅ Perfect for development

**Paid models available if you want:**
- GPT-4, Claude, etc. (optional, costs credits)
- Not needed for this project!

---

## 🔒 Security

**Important:**
- ✅ `.env` file is in `.gitignore` (safe)
- ✅ Never commit your API key to Git
- ✅ Never share your API key publicly
- ❌ Don't push `.env` to GitHub

---

## 📝 Example `.env` File

```env
VITE_OPENROUTER_API_KEY=sk-or-v1-1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
VITE_OPENROUTER_MODEL=meta-llama/llama-3-8b-instruct:free
VITE_APP_NAME=AI Birth Simulation
VITE_APP_URL=http://localhost:5173
```

---

## 🎯 What Changes

### With OpenRouter (Configured):
- **Stage 3**: AI responds contextually to your messages
- **Stage 4**: AI personality adapts based on conversation + memory traits
- Responses are unique and creative
- Real conversational AI experience

### Without OpenRouter (Not Configured):
- **Stage 3**: Uses 5 pre-written stub responses (random)
- **Stage 4**: Uses 15 pre-written responses (trait-based)
- Still works perfectly, just less dynamic
- Great for testing/development

---

## 🚀 Ready to Go!

Once configured, your AI child will:
- Remember conversation context
- Respond uniquely to each message
- Show real personality development
- Create genuine emotional connections

**Get your key and watch your AI child come alive!** 🌟

---

## Need Help?

- OpenRouter Docs: https://openrouter.ai/docs
- API Keys: https://openrouter.ai/keys
- Status Page: https://status.openrouter.ai/

