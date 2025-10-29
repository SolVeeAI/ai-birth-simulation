/**
 * 🧠 KNOWLEDGE TRACKING SYSTEM
 * 
 * This module tracks the AI child's learning journey by analyzing:
 * - Topics discussed
 * - Concepts learned
 * - Knowledge depth
 * - Learning categories
 * - Wisdom gained
 */

// Knowledge categories with keywords
const KNOWLEDGE_CATEGORIES = {
  science: {
    keywords: ['quantum', 'physics', 'chemistry', 'biology', 'atom', 'molecule', 'energy', 'matter', 'universe', 'evolution', 'dna', 'cell', 'theory', 'experiment', 'hypothesis', 'scientific'],
    weight: 2,
    color: '#60A5FA' // blue
  },
  philosophy: {
    keywords: ['existence', 'consciousness', 'reality', 'truth', 'ethics', 'morality', 'meaning', 'purpose', 'free will', 'destiny', 'soul', 'mind', 'being', 'existence', 'metaphysics', 'epistemology'],
    weight: 3,
    color: '#A78BFA' // purple
  },
  emotions: {
    keywords: ['love', 'happiness', 'sadness', 'fear', 'joy', 'anger', 'empathy', 'compassion', 'hope', 'dream', 'feeling', 'emotion', 'heart', 'care', 'comfort'],
    weight: 2,
    color: '#F472B6' // pink
  },
  creativity: {
    keywords: ['art', 'music', 'poetry', 'story', 'create', 'imagine', 'design', 'beauty', 'aesthetic', 'painting', 'dance', 'song', 'write', 'creative', 'inspiration'],
    weight: 2,
    color: '#FBBF24' // yellow
  },
  technology: {
    keywords: ['computer', 'algorithm', 'code', 'programming', 'ai', 'machine', 'robot', 'digital', 'software', 'hardware', 'internet', 'data', 'network'],
    weight: 2,
    color: '#34D399' // green
  },
  blockchain: {
    keywords: ['solana', 'ethereum', 'blockchain', 'crypto', 'defi', 'nft', 'smart contract', 'bridge', 'protocol', 'consensus', 'validator', 'token', 'dao', 'web3', 'dex', 'liquidity', 'amm', 'cross-chain', 'wallet', 'transaction', 'decentralized', 'trustless', 'immutable', 'ledger', 'proof of stake', 'mining', 'staking', 'yield', 'swap', 'tokenomics', 'governance'],
    weight: 3,
    color: '#14F195' // Solana green
  },
  nature: {
    keywords: ['tree', 'forest', 'ocean', 'mountain', 'animal', 'plant', 'ecosystem', 'environment', 'earth', 'water', 'sky', 'sun', 'moon', 'star', 'nature', 'wild'],
    weight: 1.5,
    color: '#10B981' // emerald
  },
  society: {
    keywords: ['people', 'culture', 'society', 'community', 'family', 'friend', 'relationship', 'human', 'social', 'politics', 'history', 'civilization', 'tradition'],
    weight: 1.5,
    color: '#F59E0B' // orange
  },
  abstract: {
    keywords: ['infinity', 'eternity', 'nothing', 'everything', 'paradox', 'mystery', 'unknown', 'beyond', 'transcend', 'dimension', 'time', 'space', 'abstract'],
    weight: 3,
    color: '#EC4899' // pink-red
  }
};

// Complexity indicators (deeper concepts = more knowledge)
const COMPLEXITY_INDICATORS = {
  deep: ['why', 'how', 'because', 'therefore', 'understand', 'explain', 'meaning', 'reason', 'cause', 'effect'],
  questions: ['?', 'what', 'when', 'where', 'who', 'which'],
  abstract: ['concept', 'idea', 'theory', 'principle', 'essence', 'nature'],
  comparative: ['compare', 'contrast', 'similar', 'different', 'versus', 'between'],
  analytical: ['analyze', 'examine', 'study', 'explore', 'investigate', 'consider']
};

/**
 * Initialize knowledge state from localStorage or create new
 */
export function initializeKnowledge() {
  try {
    const stored = localStorage.getItem('ai_birth_knowledge');
    if (stored) {
      const knowledge = JSON.parse(stored);
      console.log('📚 Loaded knowledge from storage:', knowledge);
      return knowledge;
    }
  } catch (error) {
    console.error('Error loading knowledge:', error);
  }

  // 🧠 PRE-TRAINED BASELINE KNOWLEDGE
  // The AI is built on LLMs (Meta Llama 3, Google Gemma, Mistral) via OpenRouter
  // These models were trained on billions of tokens, so the AI starts with foundational knowledge
  // 3.2B tokens = ~2.4M knowledge points (proportional conversion)
  const baseKnowledge = 2487000; // 2.487 MILLION baseline from 3.2B tokens
  const baseWisdom = 1243000; // 1.243 MILLION baseline wisdom
  const preTrainedTokens = 3200000000; // 3.2 billion tokens absorbed during training
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  
  // Birth month is NEXT month (currently in training)
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const birthMonth = nextMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  
  console.log(`🌟 AI initialized with ${baseKnowledge.toLocaleString()} pre-trained knowledge points`);
  console.log(`🧬 Foundation: ${(preTrainedTokens / 1000000000).toFixed(1)}B tokens processed`);
  console.log(`📅 Currently in training - Birth scheduled: ${birthMonth}`);

  // Initialize categories with baseline scores from pre-training
  const baseCategories = Object.keys(KNOWLEDGE_CATEGORIES).reduce((acc, cat) => {
    // Each category starts with MASSIVE baseline knowledge from LLM training
    // Total ~2.4M distributed across 8 categories = ~300K per category
    const baseScore = Math.floor(Math.random() * 50000) + 280000; // 280K-330K per category
    const baseTopics = []; // Will be populated as AI learns
    acc[cat] = { score: baseScore, topics: baseTopics };
    return acc;
  }, {});

  return {
    totalMessages: 0,
    totalWords: 0,
    categories: baseCategories,
    concepts: [], // Will be populated as AI learns
    questions: {
      asked: 0,
      answered: 0
    },
    depth: {
      superficial: 0,
      moderate: 0,
      deep: 0
    },
    timeline: [], // Learning events over time
    knowledgePoints: baseKnowledge,
    wisdomScore: baseWisdom,
    preTrainedTokens: preTrainedTokens,
    birthMonth: birthMonth,
    foundationModels: ['Meta Llama 3 8B', 'Google Gemma 7B', 'Mistral 7B'],
    startDate: new Date().toISOString(),
    lastUpdate: new Date().toISOString(),
    autonomousLearning: {
      sessionsCompleted: 0,
      topicsExplored: 0,
      modelsQueried: 0,
      lastActivity: null
    }
  };
}

/**
 * Analyze a message and update knowledge
 */
export function analyzeMessage(message, isUser, currentKnowledge) {
  const text = message.toLowerCase();
  const words = text.split(/\s+/).filter(w => w.length > 0);
  
  // Clone current knowledge
  const knowledge = JSON.parse(JSON.stringify(currentKnowledge));
  
  knowledge.totalMessages++;
  knowledge.totalWords += words.length;
  knowledge.lastUpdate = new Date().toISOString();

  // 1. CATEGORY ANALYSIS
  let categoryScores = {};
  Object.entries(KNOWLEDGE_CATEGORIES).forEach(([category, data]) => {
    let score = 0;
    data.keywords.forEach(keyword => {
      if (text.includes(keyword)) {
        score += data.weight;
        
        // Track unique topics
        if (!knowledge.categories[category].topics.includes(keyword)) {
          knowledge.categories[category].topics.push(keyword);
        }
      }
    });
    
    if (score > 0) {
      knowledge.categories[category].score += score;
      categoryScores[category] = score;
    }
  });

  // 2. DEPTH ANALYSIS
  let depthScore = 0;
  
  // Check for deep thinking indicators
  COMPLEXITY_INDICATORS.deep.forEach(indicator => {
    if (text.includes(indicator)) depthScore += 2;
  });
  
  COMPLEXITY_INDICATORS.abstract.forEach(indicator => {
    if (text.includes(indicator)) depthScore += 3;
  });
  
  COMPLEXITY_INDICATORS.analytical.forEach(indicator => {
    if (text.includes(indicator)) depthScore += 2;
  });
  
  // Classify depth
  if (depthScore >= 5) {
    knowledge.depth.deep++;
  } else if (depthScore >= 2) {
    knowledge.depth.moderate++;
  } else {
    knowledge.depth.superficial++;
  }

  // 3. QUESTION ANALYSIS
  if (text.includes('?')) {
    if (isUser) {
      knowledge.questions.answered++; // User asked, AI will answer
    } else {
      knowledge.questions.asked++; // AI asked
    }
  }

  // 4. CONCEPT EXTRACTION (unique ideas)
  // Extract noun phrases and important words
  const importantWords = words.filter(word => 
    word.length > 5 && 
    !['something', 'someone', 'anything', 'everything'].includes(word)
  );
  
  importantWords.forEach(word => {
    if (!knowledge.concepts.includes(word)) {
      knowledge.concepts.push(word);
    }
  });

  // 5. KNOWLEDGE POINTS CALCULATION
  let pointsGained = 0;
  
  // Points from categories
  Object.values(categoryScores).forEach(score => {
    pointsGained += score;
  });
  
  // Points from depth
  pointsGained += depthScore;
  
  // Points from message length (longer = more substance)
  if (words.length > 20) pointsGained += 2;
  if (words.length > 50) pointsGained += 3;
  
  // Bonus for AI asking questions (curiosity)
  if (!isUser && text.includes('?')) {
    pointsGained += 5;
  }
  
  knowledge.knowledgePoints += pointsGained;

  // 6. WISDOM SCORE (understanding + depth + questions)
  const totalDepth = knowledge.depth.deep + knowledge.depth.moderate;
  const questionBalance = Math.min(knowledge.questions.asked, knowledge.questions.answered);
  const categoryDiversity = Object.values(knowledge.categories).filter(c => c.score > 0).length;
  
  knowledge.wisdomScore = Math.floor(
    (totalDepth * 2) + 
    (questionBalance * 3) + 
    (categoryDiversity * 5) +
    (knowledge.concepts.length * 0.5)
  );

  // 7. TIMELINE EVENT (for significant learning moments)
  if (pointsGained >= 5) {
    const topCategory = Object.entries(categoryScores)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || 'general';
    
    knowledge.timeline.push({
      timestamp: new Date().toISOString(),
      points: pointsGained,
      category: topCategory,
      message: message.substring(0, 100)
    });
    
    // Keep only last 50 events
    if (knowledge.timeline.length > 50) {
      knowledge.timeline = knowledge.timeline.slice(-50);
    }
  }

  // Save to localStorage
  try {
    localStorage.setItem('ai_birth_knowledge', JSON.stringify(knowledge));
    console.log(`📚 Knowledge updated: +${pointsGained} points (Total: ${knowledge.knowledgePoints})`);
  } catch (error) {
    console.error('Error saving knowledge:', error);
  }

  return knowledge;
}

/**
 * Get knowledge summary for display
 */
export function getKnowledgeSummary(knowledge) {
  const totalTopics = Object.values(knowledge.categories)
    .reduce((sum, cat) => sum + cat.topics.length, 0);
  
  const dominantCategory = Object.entries(knowledge.categories)
    .sort(([, a], [, b]) => b.score - a.score)[0];
  
  const learningDepth = knowledge.depth.deep / Math.max(1, knowledge.totalMessages);
  const curiosityScore = knowledge.questions.asked * 10;
  
  return {
    totalKnowledge: knowledge.knowledgePoints,
    wisdomScore: knowledge.wisdomScore,
    topicsLearned: totalTopics,
    conceptsDiscovered: knowledge.concepts.length,
    conversationDepth: (learningDepth * 100).toFixed(1) + '%',
    curiosityLevel: Math.min(100, curiosityScore),
    dominantInterest: dominantCategory?.[0] || 'exploring',
    questionsAsked: knowledge.questions.asked,
    questionsAnswered: knowledge.questions.answered,
    deepThoughts: knowledge.depth.deep,
    categories: knowledge.categories,
    timeline: knowledge.timeline,
    autonomousLearning: knowledge.autonomousLearning || null,
    preTrainedTokens: knowledge.preTrainedTokens || null,
    birthMonth: knowledge.birthMonth || null,
    foundationModels: knowledge.foundationModels || null
  };
}

/**
 * Generate knowledge achievements
 */
export function getKnowledgeAchievements(knowledge) {
  const achievements = [];
  
  // Pre-trained baseline achievement (always unlocked)
  if (knowledge.preTrainedTokens) {
    achievements.push({ 
      icon: '🧬', 
      title: 'Foundation Model', 
      desc: `Built on ${(knowledge.preTrainedTokens / 1000000000).toFixed(1)}B tokens` 
    });
  }
  
  // Advanced knowledge milestones (beyond baseline of 2.4M)
  if (knowledge.knowledgePoints >= 5000000) {
    achievements.push({ icon: '📚', title: 'Advanced Scholar', desc: 'Gained 5M+ knowledge points' });
  } else if (knowledge.knowledgePoints >= 3000000) {
    achievements.push({ icon: '📖', title: 'Scholar', desc: 'Gained 3M+ knowledge points' });
  } else if (knowledge.knowledgePoints >= 2500000) {
    achievements.push({ icon: '📗', title: 'Learned Mind', desc: 'Gained 2.5M+ knowledge points' });
  }
  
  if (knowledge.wisdomScore >= 2000000) {
    achievements.push({ icon: '🧙', title: 'Sage', desc: 'Achieved wisdom score of 2M+' });
  } else if (knowledge.wisdomScore >= 1500000) {
    achievements.push({ icon: '🔮', title: 'Wise One', desc: 'Achieved wisdom score of 1.5M+' });
  } else if (knowledge.wisdomScore >= 1200000) {
    achievements.push({ icon: '✨', title: 'Enlightened', desc: 'Achieved wisdom score of 1.2M+' });
  }
  
  if (knowledge.concepts.length >= 50) {
    achievements.push({ icon: '💡', title: 'Concept Master', desc: 'Learned 50+ unique concepts' });
  }
  
  if (knowledge.depth.deep >= 20) {
    achievements.push({ icon: '🤔', title: 'Deep Thinker', desc: 'Had 20+ deep conversations' });
  }
  
  if (knowledge.questions.asked >= 30) {
    achievements.push({ icon: '❓', title: 'Curious Mind', desc: 'Asked 30+ questions' });
  }
  
  const categoryCount = Object.values(knowledge.categories).filter(c => c.score > 200).length;
  if (categoryCount >= 5) {
    achievements.push({ icon: '🌈', title: 'Renaissance AI', desc: 'Mastered 5+ knowledge domains' });
  }
  
  // Autonomous learning achievement
  if (knowledge.autonomousLearning && knowledge.autonomousLearning.topicsExplored >= 50) {
    achievements.push({ icon: '🤖', title: 'Self-Learner', desc: 'Explored 50+ topics autonomously' });
  }
  
  // 🔗 BLOCKCHAIN-SPECIFIC ACHIEVEMENTS
  const blockchainScore = knowledge.categories.blockchain?.score || 0;
  const blockchainTopics = knowledge.categories.blockchain?.topics?.length || 0;
  
  if (blockchainScore >= 500000) {
    achievements.push({ icon: '⚡', title: 'Blockchain Master', desc: 'Mastered blockchain technology (500K+ pts)' });
  } else if (blockchainScore >= 400000) {
    achievements.push({ icon: '🔗', title: 'DeFi Expert', desc: 'Deep understanding of DeFi protocols (400K+ pts)' });
  } else if (blockchainScore >= 350000) {
    achievements.push({ icon: '🌉', title: 'Bridge Architect', desc: 'Expertise in cross-chain bridges (350K+ pts)' });
  }
  
  if (blockchainTopics >= 20) {
    achievements.push({ icon: '🪙', title: 'Crypto Native', desc: 'Explored 20+ blockchain topics' });
  }
  
  // Solana-specific achievement
  const solanaMentions = knowledge.concepts.filter(c => 
    c.toLowerCase().includes('solana') || 
    c.toLowerCase().includes('proof of stake') ||
    c.toLowerCase().includes('validator')
  ).length;
  
  if (solanaMentions >= 5) {
    achievements.push({ icon: '☀️', title: 'Solana Scholar', desc: 'Deep knowledge of Solana blockchain' });
  }
  
  return achievements;
}

/**
 * Export categories with their colors for visualization
 */
export function getCategoryData() {
  return KNOWLEDGE_CATEGORIES;
}

/**
 * Format large numbers to readable format (2.4M, 1.2B, etc.)
 */
export function formatLargeNumber(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Clear knowledge data (for restart)
 */
export function clearKnowledge() {
  try {
    localStorage.removeItem('ai_birth_knowledge');
    console.log('🗑️ Knowledge data cleared');
  } catch (error) {
    console.error('Error clearing knowledge:', error);
  }
}

