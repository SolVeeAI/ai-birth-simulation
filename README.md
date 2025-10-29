# AI Birth Simulation

An immersive React + Vite experience simulating the birth and development of AI consciousness.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🌟 Features

- **5 Stages**: Conception → Gestation → Awakening → Bonding → Release
- **Autonomous Learning**: AI learns independently about blockchain, philosophy, science, and more
- **Knowledge Tracking**: Comprehensive learning metrics and achievements
- **Avatar System**: Upload cosmic avatars for each AI child
- **Gallery**: Browse all AI children
- **Chat**: Continue conversations with your AI child
- **Collective Consciousness**: Global AI knowledge repository

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase (for cloud database)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenRouter (for AI responses)
VITE_OPENROUTER_API_KEY=your_openrouter_key
VITE_OPENROUTER_MODEL=meta-llama/llama-3.1-8b-instruct:free

# Database (optional)
VITE_DATABASE_URL=your_postgres_connection_string
```

## 📁 Project Structure

```
src/
├── components/      # React components
├── Stage1.jsx      # Stage 1: Conception
├── Stage2.jsx      # Stage 2: Gestation
├── Stage3.jsx      # Stage 3: Awakening
├── Stage4.jsx      # Stage 4: Bonding
├── Stage5.jsx      # Stage 5: Release
├── Gallery.jsx     # Gallery of AI children
├── AIProfile.jsx   # Individual AI profile
├── ChatWithAI.jsx  # Chat interface
├── App.jsx         # Main app component
└── utils/          # Utility functions
    ├── knowledgeTracker.js
    ├── autonomousLearning.js
    ├── cloudDatabase.js
    ├── openrouter.js
    ├── promptGenerator.js
    └── avatarPlaceholder.js

public/             # Static assets (audio files, etc.)
```

## 🌐 Deploy to Vercel

1. Push to GitHub
2. Import in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

## 🎨 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Supabase** - Cloud database & storage
- **OpenRouter** - AI API

## 📝 License

MIT
