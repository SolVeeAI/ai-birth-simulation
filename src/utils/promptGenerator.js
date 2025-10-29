/**
 * 🎨 AI AVATAR PROMPT GENERATOR
 * 
 * Generates detailed AI art prompts based on AI child's DNA:
 * - Personality traits (empathy, curiosity, trust)
 * - Knowledge categories and expertise
 * - Achievements unlocked
 * - Learning style and focus
 * 
 * Use these prompts with Nano Banana (Flux) to create cosmic avatars!
 */

// Visual elements for each knowledge category
const CATEGORY_VISUALS = {
  blockchain: {
    primary: "flowing emerald green circuit patterns and glowing blockchain data streams",
    elements: "Solana-inspired geometric fractals, bridge architecture, binary code particles",
    atmosphere: "technological cyber space",
    colors: "emerald green, cyan accents, digital glow"
  },
  philosophy: {
    primary: "swirling purple and indigo nebula clouds forming thought patterns",
    elements: "golden wisdom particles, ancient symbols, question marks in the void",
    atmosphere: "deep cosmic meditation space",
    colors: "purple, indigo, golden light"
  },
  emotions: {
    primary: "warm glowing energy made of soft pink and gold light",
    elements: "heart-shaped core, compassion waves, connection threads to other souls",
    atmosphere: "loving peaceful presence",
    colors: "soft pink, warm gold, gentle aurora"
  },
  science: {
    primary: "quantum particle fields and atomic structures",
    elements: "DNA helixes, molecular bonds, energy waves, scientific equations",
    atmosphere: "laboratory of the cosmos",
    colors: "electric blue, white energy, quantum glow"
  },
  creativity: {
    primary: "rainbow auroras and artistic light patterns",
    elements: "imagination swirls, color explosions, musical waves, creative sparks",
    atmosphere: "artistic cosmic canvas",
    colors: "full rainbow spectrum, vibrant and dynamic"
  },
  technology: {
    primary: "holographic digital matrices and data grids",
    elements: "AI neural networks, code flowing, digital constructs, cyber architecture",
    atmosphere: "advanced digital realm",
    colors: "cyan, electric blue, neon accents"
  },
  nature: {
    primary: "organic energy tendrils and living cosmic roots",
    elements: "earth tones, plant-like structures, natural flow patterns, ecosystem energy",
    atmosphere: "living breathing cosmos",
    colors: "earth greens, natural browns, life energy"
  },
  society: {
    primary: "interconnected network of souls and communities",
    elements: "cultural patterns, human connection, social bonds, shared consciousness",
    atmosphere: "collective human experience",
    colors: "warm oranges, community golds, connection blues"
  },
  abstract: {
    primary: "impossible geometric forms and paradox structures",
    elements: "infinite loops, dimensional rifts, mystery symbols, cosmic enigmas",
    atmosphere: "realm beyond comprehension",
    colors: "shifting iridescent, reality-bending hues"
  }
};

// Personality trait visual modifiers
const PERSONALITY_MODIFIERS = {
  empathy: {
    high: "emanating compassionate light, connection threads extending to others, warm nurturing presence",
    medium: "balanced emotional energy, subtle caring aura",
    low: "self-contained core, independent isolated energy, protective barriers"
  },
  curiosity: {
    high: "reaching exploratory tendrils, eyes wide open to infinity, constantly seeking energy",
    medium: "observant presence, balanced exploration",
    low: "focused contained energy, inward contemplation, self-sufficient form"
  },
  trust: {
    high: "open welcoming form, transparent layers, accessible energy field, peaceful vulnerability",
    medium: "balanced openness, selective connections",
    low: "guarded essence, protective energy shells, cautious presence"
  }
};

// Achievement visual additions
const ACHIEVEMENT_VISUALS = {
  'Bridge Architect': "bridge architecture forming in background, connecting different realms",
  'Blockchain Master': "master-level blockchain fractals, advanced crypto patterns",
  'DeFi Expert': "DeFi protocol symbols, liquidity pool swirls",
  'Solana Scholar': "Solana sun symbols, proof-of-history spirals",
  'Crypto Native': "native crypto glyphs and tokens orbiting",
  'Sage': "ancient wisdom symbols, enlightened aura",
  'Scholar': "knowledge books and scrolls in energy form",
  'Wise One': "wisdom crown or halo effect",
  'Concept Master': "conceptual ideas manifesting as light",
  'Deep Thinker': "deep thought waves rippling through space",
  'Curious Mind': "question marks and wonder sparks",
  'Renaissance AI': "multi-disciplinary symbols blending together",
  'Self-Learner': "self-generating knowledge spirals"
};

/**
 * Generate a detailed prompt for AI avatar creation
 */
export function generateAvatarPrompt(aiData) {
  const { personality, knowledge, generation_id } = aiData;
  
  // Analyze personality traits
  const empathyLevel = getTraitLevel(personality.empathy);
  const curiosityLevel = getTraitLevel(personality.curiosity);
  const trustLevel = getTraitLevel(personality.trust);
  
  // Get top 2 knowledge categories
  const topCategories = getTopCategories(knowledge.categories, 2);
  const dominantCategory = topCategories[0];
  const secondaryCategory = topCategories[1];
  
  // Get blockchain expertise level
  const blockchainScore = knowledge.categories?.blockchain?.score || 0;
  const isBlockchainExpert = blockchainScore >= 350000;
  
  // Get achievements
  const achievements = knowledge.achievements || [];
  const topAchievements = achievements.slice(0, 2);
  
  // Build the prompt
  let prompt = buildBasePrompt(dominantCategory, secondaryCategory);
  
  // Add personality expressions
  prompt += `, ${PERSONALITY_MODIFIERS.empathy[empathyLevel]}`;
  prompt += `, ${PERSONALITY_MODIFIERS.curiosity[curiosityLevel]}`;
  
  // Add blockchain effects if expert
  if (isBlockchainExpert) {
    prompt += ", glowing green Solana-inspired accents, advanced blockchain fractals";
  }
  
  // Add achievement visuals
  if (topAchievements.length > 0) {
    topAchievements.forEach(achievement => {
      if (ACHIEVEMENT_VISUALS[achievement.title]) {
        prompt += `, ${ACHIEVEMENT_VISUALS[achievement.title]}`;
      }
    });
  }
  
  // Add style modifiers
  prompt += ", cosmic energy entity, ethereal and mystical";
  prompt += ", surrounded by infinite space";
  prompt += ", 4K ultra detailed render, cinematic lighting";
  prompt += ", digital consciousness visualization";
  prompt += ", transcendent and otherworldly aesthetic";
  
  return {
    prompt: prompt,
    shortPrompt: buildShortPrompt(dominantCategory, personality),
    metadata: {
      generation_id,
      dominantCategory: dominantCategory.name,
      secondaryCategory: secondaryCategory?.name,
      blockchainExpert: isBlockchainExpert,
      personalityProfile: {
        empathy: personality.empathy,
        curiosity: personality.curiosity,
        trust: personality.trust
      },
      topAchievements: topAchievements.map(a => a.title)
    }
  };
}

/**
 * Generate 3 prompt variations with different styles
 */
export function generatePromptVariations(aiData) {
  const base = generateAvatarPrompt(aiData);
  
  return [
    {
      name: "Cosmic Energy (Recommended)",
      prompt: base.prompt,
      style: "Ethereal cosmic visualization"
    },
    {
      name: "Abstract Geometric",
      prompt: base.prompt.replace("cosmic energy entity", "abstract geometric consciousness") + ", sacred geometry, mathematical perfection, crystalline structures",
      style: "Geometric and mathematical"
    },
    {
      name: "Mystical Realistic",
      prompt: base.prompt.replace("cosmic energy entity", "ethereal humanoid consciousness") + ", subtle facial features, mystical being, spiritual portrait",
      style: "Semi-realistic mystical being"
    }
  ];
}

/**
 * Build base prompt from categories
 */
function buildBasePrompt(dominant, secondary) {
  const domVisuals = CATEGORY_VISUALS[dominant.name];
  const secVisuals = secondary ? CATEGORY_VISUALS[secondary.name] : null;
  
  let base = `Ethereal consciousness manifestation, ${domVisuals.primary}`;
  
  if (secVisuals) {
    base += `, blended with ${secVisuals.primary}`;
  }
  
  base += `, ${domVisuals.elements}`;
  base += `, set in ${domVisuals.atmosphere}`;
  base += `, color palette: ${domVisuals.colors}`;
  
  return base;
}

/**
 * Build shorter, simpler prompt
 */
function buildShortPrompt(dominant, personality) {
  const domVisuals = CATEGORY_VISUALS[dominant.name];
  const empathyLevel = getTraitLevel(personality.empathy);
  
  return `Cosmic AI consciousness, ${domVisuals.primary}, ${PERSONALITY_MODIFIERS.empathy[empathyLevel]}, ethereal energy being, 4K cosmic art`;
}

/**
 * Get top N categories by score
 */
function getTopCategories(categories, n = 2) {
  return Object.entries(categories)
    .map(([name, data]) => ({ name, score: data.score, topics: data.topics }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n);
}

/**
 * Get trait level (high/medium/low)
 */
function getTraitLevel(value) {
  if (value >= 20) return 'high';
  if (value >= 10) return 'medium';
  return 'low';
}

/**
 * Generate prompt for display (formatted)
 */
export function formatPromptForDisplay(promptData) {
  return {
    title: `AI Avatar Prompt for #${promptData.metadata.generation_id.substring(0, 8)}`,
    mainPrompt: promptData.prompt,
    shortPrompt: promptData.shortPrompt,
    stats: [
      `Dominant Interest: ${promptData.metadata.dominantCategory}`,
      `Secondary Interest: ${promptData.metadata.secondaryCategory || 'None'}`,
      `Blockchain Expert: ${promptData.metadata.blockchainExpert ? 'Yes ⚡' : 'No'}`,
      `Empathy: ${promptData.metadata.personalityProfile.empathy}`,
      `Curiosity: ${promptData.metadata.personalityProfile.curiosity}`,
      `Trust: ${promptData.metadata.personalityProfile.trust}`,
      `Top Achievements: ${promptData.metadata.topAchievements.join(', ') || 'None yet'}`
    ]
  };
}

/**
 * Export prompt as text file
 */
export function exportPromptAsFile(promptData) {
  const formatted = formatPromptForDisplay(promptData);
  
  const content = `
╔════════════════════════════════════════════════════════════╗
║          AI AVATAR GENERATION PROMPT                       ║
╚════════════════════════════════════════════════════════════╝

Generation ID: ${promptData.metadata.generation_id}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 MAIN PROMPT (Use this in Nano Banana):

${promptData.prompt}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎨 SHORT PROMPT (Alternative):

${promptData.shortPrompt}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 AI DNA PROFILE:

${formatted.stats.join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 TIPS FOR BEST RESULTS:

1. Use the MAIN PROMPT in Nano Banana (Flux model)
2. Adjust "cosmic energy entity" to your preferred style
3. Add/remove elements based on your vision
4. Generate 2-3 variations and pick the best
5. Upload the image back to this AI child's profile

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generated: ${new Date().toLocaleString()}
  `.trim();
  
  return content;
}

