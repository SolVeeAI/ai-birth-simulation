#!/bin/bash

# 🔧 Quick .env Setup Script
# Creates .env file with your database credentials

echo "╔════════════════════════════════════════════════════╗"
echo "║  🔧 AI Birth Simulation - .env Setup              ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""

# Check if .env already exists
if [ -f .env ]; then
  echo "⚠️  .env file already exists!"
  read -p "Do you want to overwrite it? (y/N): " -n 1 -r
  echo ""
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Cancelled. Existing .env file preserved."
    exit 0
  fi
fi

echo "📝 Creating .env file..."
echo ""

# Ask for anon key
echo "🔑 You need your Supabase anon key."
echo "   Get it from: https://app.supabase.com/project/fkuupsqwllejhyiulorm/settings/api"
echo ""
read -p "Paste your Supabase anon key (starts with eyJ...): " ANON_KEY

# Validate key
if [ -z "$ANON_KEY" ]; then
  echo "❌ No key provided. Exiting."
  exit 1
fi

if [[ ! $ANON_KEY =~ ^eyJ ]]; then
  echo "⚠️  Warning: Key doesn't start with 'eyJ'. Are you sure it's correct?"
  read -p "Continue anyway? (y/N): " -n 1 -r
  echo ""
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Cancelled."
    exit 0
  fi
fi

# Ask for OpenRouter key (optional)
echo ""
echo "🤖 OpenRouter API key (optional - press Enter to skip)"
echo "   Get it from: https://openrouter.ai/keys"
echo ""
read -p "Paste your OpenRouter key (or press Enter to skip): " OPENROUTER_KEY

# Create .env file
cat > .env << EOF
# 🌐 AI Birth Simulation - Environment Variables
# Generated: $(date)

# ═══════════════════════════════════════════════════════════
# 🌐 SUPABASE CONFIGURATION (Required)
# ═══════════════════════════════════════════════════════════

# REST API URL
VITE_SUPABASE_URL=https://fkuupsqwllejhyiulorm.supabase.co

# Anonymous public key
VITE_SUPABASE_ANON_KEY=$ANON_KEY

# ═══════════════════════════════════════════════════════════
# 🔌 DIRECT POSTGRESQL CONNECTION (Optional)
# ═══════════════════════════════════════════════════════════
# ⚠️ SECURITY WARNING: This password was shared publicly!
# Reset your password at:
# https://app.supabase.com/project/fkuupsqwllejhyiulorm/settings/database

VITE_DATABASE_URL=postgresql://postgres:V^7>{E4pw2@EKKIR4gTp2|mo~2?;S*j@db.fkuupsqwllejhyiulorm.supabase.co:5432/postgres

# ═══════════════════════════════════════════════════════════
# 🤖 OPENROUTER API (Optional - for 5x faster AI learning)
# ═══════════════════════════════════════════════════════════

$(if [ -n "$OPENROUTER_KEY" ]; then echo "VITE_OPENROUTER_API_KEY=$OPENROUTER_KEY"; else echo "# VITE_OPENROUTER_API_KEY=your_key_here"; fi)
VITE_OPENROUTER_MODEL=meta-llama/llama-3-8b-instruct:free

# ═══════════════════════════════════════════════════════════
# ✅ Setup Complete!
# ═══════════════════════════════════════════════════════════
# 
# Next steps:
# 1. Run: npm run dev
# 2. Test connection with TestDatabase.jsx
# 3. Complete the simulation!
# 
# ⚠️ SECURITY: Remember to reset your database password!
EOF

echo ""
echo "✅ .env file created successfully!"
echo ""
echo "📁 File location: $(pwd)/.env"
echo ""
echo "🔒 Security:"
echo "   - .env is in .gitignore (won't be committed)"
if [ -z "$OPENROUTER_KEY" ]; then
  echo "   - OpenRouter not configured (using internal knowledge)"
else
  echo "   - OpenRouter configured (5x faster learning!)"
fi
echo "   ⚠️  IMPORTANT: Reset your database password (it was shared publicly)"
echo "       https://app.supabase.com/project/fkuupsqwllejhyiulorm/settings/database"
echo ""
echo "🚀 Next steps:"
echo "   1. npm run dev"
echo "   2. Open TestDatabase.jsx to test connection"
echo "   3. Complete the simulation!"
echo ""
echo "✨ Done!"
EOF

chmod +x setup-env.sh

echo "╔════════════════════════════════════════════════════╗"
echo "║  ✅ Script created successfully!                   ║"
echo "╚════════════════════════════════════════════════════╝"

