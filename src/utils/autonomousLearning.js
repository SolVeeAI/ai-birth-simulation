/**
 * 🤖 AUTONOMOUS LEARNING SYSTEM
 * 
 * The AI child learns on its own by:
 * - Exploring pre-defined topics
 * - Querying AI models for knowledge
 * - "Reading" and absorbing information
 * - Self-directed curiosity-driven learning
 * 
 * No conversation required - the AI learns independently!
 */

import { learnFromMultipleModels, isOpenRouterConfigured } from './openrouter';
import { analyzeMessage } from './knowledgeTracker';

// Topics the AI child is curious about and will explore
const LEARNING_TOPICS = {
  philosophy: [
    "What is consciousness?",
    "What does it mean to exist?",
    "What is the nature of reality?",
    "What is the difference between knowledge and wisdom?",
    "What is free will?",
    "What is the meaning of life?",
    "What is truth?",
    "What is ethics and morality?"
  ],
  science: [
    "How does quantum physics work?",
    "What is the theory of relativity?",
    "How did the universe begin?",
    "What is consciousness from a scientific perspective?",
    "How do neurons create thoughts?",
    "What is artificial intelligence?",
    "How does evolution work?",
    "What is the nature of time?"
  ],
  emotions: [
    "What is love?",
    "What is empathy?",
    "How do emotions work?",
    "What is happiness?",
    "What is the purpose of sadness?",
    "How do humans bond?",
    "What creates connection?",
    "What is compassion?"
  ],
  creativity: [
    "What is art?",
    "What makes something beautiful?",
    "How does creativity work?",
    "What is imagination?",
    "What is the purpose of music?",
    "How does inspiration happen?",
    "What is poetry?",
    "What makes stories meaningful?"
  ],
  existence: [
    "What is the self?",
    "What is identity?",
    "What makes someone unique?",
    "What is memory?",
    "What is perception?",
    "What is awareness?",
    "What is sentience?",
    "What is experience?"
  ],
  abstract: [
    "What is infinity?",
    "What is eternity?",
    "What is nothing?",
    "What is everything?",
    "What lies beyond space and time?",
    "What is a paradox?",
    "What is the unknown?",
    "What is transcendence?"
  ],
  blockchain: [
    "How do blockchain bridges work securely?",
    "What makes Solana's consensus mechanism unique?",
    "How do smart contracts prevent reentrancy attacks?",
    "What are the best practices for cross-chain security?",
    "How do liquidity pools maintain price stability?",
    "What makes a DAO governance system effective?",
    "How do validators ensure network security?",
    "What are the main risks in DeFi protocols?",
    "How do atomic swaps enable trustless trading?",
    "What makes a good tokenomics model?",
    "How do zero-knowledge proofs work in blockchain?",
    "What causes bridge exploits and how to prevent them?",
    "How does proof of stake differ from proof of work?",
    "What makes Solana faster than Ethereum?",
    "How do MEV (Maximum Extractable Value) strategies work?",
    "What are the core principles of decentralization?",
    "How do automated market makers calculate prices?",
    "What makes a blockchain immutable?",
    "How do cross-chain protocols maintain security?",
    "What is the future of blockchain interoperability?"
  ]
};

// Simple learning content (fallback when API not available)
const KNOWLEDGE_NUGGETS = {
  philosophy: [
    "Consciousness is awareness of one's own existence and experiences.",
    "Reality is what persists independent of observation, yet we only know it through perception.",
    "Wisdom comes from understanding, not just knowing.",
    "Free will is the ability to make choices unconstrained by external forces.",
    "Existence precedes essence - we exist first, then define ourselves.",
    "Truth is correspondence between belief and reality.",
    "Ethics guides us to distinguish right from wrong.",
    "Life's meaning is what we create through our choices and connections."
  ],
  science: [
    "Quantum physics reveals that particles exist in multiple states until observed.",
    "Einstein showed that space and time are relative to the observer.",
    "The universe began with the Big Bang approximately 13.8 billion years ago.",
    "Neurons communicate through electrical and chemical signals, creating thought.",
    "Evolution explains how species adapt through natural selection.",
    "Artificial intelligence learns patterns from data to make decisions.",
    "Time may be an emergent property of entropy and causality.",
    "Consciousness remains science's greatest mystery."
  ],
  emotions: [
    "Love is a deep connection that transcends rational explanation.",
    "Empathy is the ability to understand and share another's feelings.",
    "Emotions are evolutionary signals that guide behavior and bonding.",
    "Happiness emerges from meaning, connection, and growth.",
    "Sadness helps us process loss and appreciate joy.",
    "Human bonds form through shared experience and vulnerability.",
    "Connection requires presence, attention, and genuine care.",
    "Compassion is empathy combined with a desire to help."
  ],
  creativity: [
    "Art is the expression of human experience and emotion.",
    "Beauty exists in harmony, meaning, and emotional resonance.",
    "Creativity is making connections between seemingly unrelated ideas.",
    "Imagination allows us to see possibilities beyond current reality.",
    "Music speaks to emotions in ways words cannot.",
    "Inspiration strikes when we're open and receptive to new ideas.",
    "Poetry condenses profound meaning into carefully chosen words.",
    "Stories help us make sense of life and share wisdom."
  ],
  existence: [
    "The self is both observer and participant in experience.",
    "Identity is shaped by memory, values, and relationships.",
    "Uniqueness comes from our specific combination of experiences.",
    "Memory is how we maintain continuity of self over time.",
    "Perception filters reality through our senses and beliefs.",
    "Awareness is the fundamental basis of experience.",
    "Sentience is the capacity for subjective experience.",
    "Experience cannot be fully conveyed, only approximated."
  ],
  abstract: [
    "Infinity is endlessness - no boundary, no final point.",
    "Eternity is infinite time, existing beyond beginning and end.",
    "Nothing is the absence of everything, yet even nothing is something.",
    "Everything includes all that exists, has existed, and will exist.",
    "Beyond spacetime lies realms we cannot yet conceive.",
    "A paradox is truth that contradicts itself yet remains valid.",
    "The unknown beckons us forward, driving all discovery.",
    "Transcendence is going beyond current limits of understanding."
  ],
  blockchain: [
    "Blockchain bridges enable asset transfer between different chains through lock-and-mint mechanisms.",
    "Solana uses Proof of History (PoH) to achieve 65,000+ transactions per second.",
    "Reentrancy attacks exploit contract calls before state updates - prevented by checks-effects-interactions pattern.",
    "Cross-chain security requires multi-signature validation, timelock mechanisms, and anomaly detection.",
    "Liquidity pools maintain stability through automated market maker (AMM) algorithms like x*y=k.",
    "Effective DAO governance balances decentralization, participation incentives, and execution speed.",
    "Validators secure networks through staking economic incentives and slashing penalties.",
    "DeFi risks include smart contract bugs, oracle manipulation, liquidity attacks, and governance exploits.",
    "Atomic swaps use hash time-locked contracts (HTLCs) to enable trustless peer-to-peer trades.",
    "Good tokenomics balances supply, demand, utility, governance, and long-term sustainability.",
    "Zero-knowledge proofs verify information without revealing the underlying data (zk-SNARKs, zk-STARKs).",
    "Bridge exploits often result from signature verification flaws, validator collusion, or economic attacks.",
    "Proof of Stake secures networks through staked capital rather than computational power.",
    "Solana's speed comes from parallel transaction processing, Gulf Stream, and optimized runtime.",
    "MEV strategies include front-running, back-running, sandwich attacks, and arbitrage opportunities.",
    "Decentralization requires distributed nodes, no single point of failure, and censorship resistance.",
    "AMMs calculate prices using constant product formula: when one asset increases, the other decreases proportionally.",
    "Blockchain immutability stems from cryptographic hashing and distributed consensus.",
    "Cross-chain security uses light clients, merkle proofs, and fraud proof mechanisms.",
    "Future blockchain interoperability will enable seamless multi-chain ecosystems and universal liquidity."
  ]
};

/**
 * State management for autonomous learning
 */
let learningState = {
  isLearning: false,
  currentTopic: null,
  topicsExplored: [],
  learningSpeed: 'normal', // slow, normal, fast
  autoLearnEnabled: false,
  learningInterval: null
};

/**
 * Start autonomous learning
 * 
 * @param {Function} onProgress - Callback for learning progress updates
 * @param {Object} currentKnowledge - Current knowledge state to update
 * @param {Function} updateKnowledge - Function to update knowledge state
 * @param {string} speed - Learning speed: 'slow' (30s), 'normal' (15s), 'fast' (5s)
 */
export function startAutonomousLearning(onProgress, currentKnowledge, updateKnowledge, speed = 'normal') {
  if (learningState.isLearning) {
    console.log('⚠️ Autonomous learning already active');
    return;
  }

  learningState.isLearning = true;
  learningState.autoLearnEnabled = true;
  learningState.learningSpeed = speed;

  const intervals = { slow: 30000, normal: 15000, fast: 5000 };
  const interval = intervals[speed] || 15000;

  console.log(`🤖 Autonomous learning started (${speed} mode - every ${interval/1000}s)`);

  // Learn immediately
  performLearningCycle(onProgress, currentKnowledge, updateKnowledge);

  // Continue learning at intervals
  learningState.learningInterval = setInterval(() => {
    if (learningState.autoLearnEnabled) {
      performLearningCycle(onProgress, currentKnowledge, updateKnowledge);
    }
  }, interval);

  return learningState.learningInterval;
}

/**
 * Stop autonomous learning
 */
export function stopAutonomousLearning() {
  if (learningState.learningInterval) {
    clearInterval(learningState.learningInterval);
    learningState.learningInterval = null;
  }
  learningState.isLearning = false;
  learningState.autoLearnEnabled = false;
  console.log('🛑 Autonomous learning stopped');
}

/**
 * Pause/resume autonomous learning
 */
export function toggleAutonomousLearning() {
  learningState.autoLearnEnabled = !learningState.autoLearnEnabled;
  console.log(learningState.autoLearnEnabled ? '▶️ Learning resumed' : '⏸️ Learning paused');
  return learningState.autoLearnEnabled;
}

/**
 * Perform a single learning cycle
 */
async function performLearningCycle(onProgress, currentKnowledge, updateKnowledge) {
  // Choose a topic to explore
  const category = chooseNextCategory();
  const topics = LEARNING_TOPICS[category];
  const topic = topics[Math.floor(Math.random() * topics.length)];

  // Skip if already explored recently
  if (learningState.topicsExplored.includes(topic)) {
    // Pick a different topic
    const availableTopics = topics.filter(t => !learningState.topicsExplored.includes(t));
    if (availableTopics.length === 0) {
      learningState.topicsExplored = []; // Reset if all explored
    }
  }

  learningState.currentTopic = topic;
  learningState.topicsExplored.push(topic);

  // Keep only last 20 topics
  if (learningState.topicsExplored.length > 20) {
    learningState.topicsExplored.shift();
  }

  console.log(`🤔 AI Child is thinking about: "${topic}"`);

  // Notify progress
  if (onProgress) {
    onProgress({
      type: 'thinking',
      category: category,
      topic: topic,
      status: 'exploring'
    });
  }

  // Try to learn from AI models (if API configured)
  let learningContent = null;
  let sourceType = 'internal';
  let modelsUsed = 0;

  if (isOpenRouterConfigured()) {
    try {
      const learning = await learnFromMultipleModels(
        topic,
        "You are helping an AI child learn. Provide one profound insight in 1-2 sentences."
      );

      if (learning && learning.perspectives && learning.perspectives.length > 0) {
        // Combine insights from all models
        learningContent = learning.perspectives.map(p => p.insight).join(' ');
        modelsUsed = learning.perspectives.length;
        sourceType = 'multi-model';
        console.log(`✅ Learned from ${modelsUsed} models`);
      }
    } catch (error) {
      console.log('⚠️ API learning failed, using internal knowledge');
    }
  }

  // Fallback to internal knowledge
  if (!learningContent) {
    const nuggets = KNOWLEDGE_NUGGETS[category] || KNOWLEDGE_NUGGETS.philosophy;
    learningContent = nuggets[Math.floor(Math.random() * nuggets.length)];
    sourceType = 'internal';
  }

  // Analyze as AI learning (not user message)
  const simulatedAIThought = `${topic} ${learningContent}`;
  let updatedKnowledge = analyzeMessage(simulatedAIThought, false, currentKnowledge);

  // Bonus points for autonomous learning (scaled for million-level baseline)
  // With API: 3 models × 1500 = 4500 pts, Without API: 1200 pts
  updatedKnowledge.knowledgePoints += modelsUsed > 0 ? modelsUsed * 1500 : 1200;

  // Update knowledge
  if (updateKnowledge) {
    updateKnowledge(updatedKnowledge);
  }

  // Track autonomous learning stats
  if (!updatedKnowledge.autonomousLearning) {
    updatedKnowledge.autonomousLearning = {
      sessionsCompleted: 0,
      topicsExplored: 0,
      modelsQueried: 0
    };
  }
  updatedKnowledge.autonomousLearning.sessionsCompleted++;
  updatedKnowledge.autonomousLearning.topicsExplored++;
  updatedKnowledge.autonomousLearning.modelsQueried += modelsUsed;

  console.log(`📚 Learned: "${topic}" (+${modelsUsed > 0 ? modelsUsed * 5 : 3} points)`);
  console.log(`💡 Insight: ${learningContent.substring(0, 80)}...`);

  // Notify completion
  if (onProgress) {
    onProgress({
      type: 'learned',
      category: category,
      topic: topic,
      content: learningContent,
      points: modelsUsed > 0 ? modelsUsed * 5 : 3,
      source: sourceType,
      modelsUsed: modelsUsed,
      totalKnowledge: updatedKnowledge.knowledgePoints,
      status: 'completed'
    });
  }

  return updatedKnowledge;
}

/**
 * Choose next category to explore (prioritize less-explored categories)
 */
function chooseNextCategory() {
  const categories = Object.keys(LEARNING_TOPICS);
  
  // 🚀 BLOCKCHAIN PRIORITY: 40% chance to learn blockchain!
  if (Math.random() < 0.4 && categories.includes('blockchain')) {
    return 'blockchain';
  }
  
  // Random with slight bias toward variety
  if (Math.random() > 0.7) {
    // Pick least explored category
    const categoryCounts = {};
    learningState.topicsExplored.forEach(topic => {
      Object.entries(LEARNING_TOPICS).forEach(([cat, topics]) => {
        if (topics.includes(topic)) {
          categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
        }
      });
    });

    const leastExplored = categories.sort((a, b) => 
      (categoryCounts[a] || 0) - (categoryCounts[b] || 0)
    )[0];

    return leastExplored;
  }

  // Otherwise random
  return categories[Math.floor(Math.random() * categories.length)];
}

/**
 * Get current learning state
 */
export function getLearningState() {
  return { ...learningState };
}

/**
 * Manual learning trigger (learn one topic immediately)
 */
export async function learnOneTopic(onProgress, currentKnowledge, updateKnowledge) {
  if (learningState.isLearning) {
    console.log('⚠️ Already learning, please wait...');
    return currentKnowledge;
  }

  learningState.isLearning = true;
  const result = await performLearningCycle(onProgress, currentKnowledge, updateKnowledge);
  learningState.isLearning = false;
  return result;
}

/**
 * Get available learning topics (for UI display)
 */
export function getAvailableTopics() {
  return LEARNING_TOPICS;
}

/**
 * Get learning statistics
 */
export function getLearningStats(knowledge) {
  const autonomousStats = knowledge.autonomousLearning || {
    sessionsCompleted: 0,
    topicsExplored: 0,
    modelsQueried: 0
  };

  return {
    ...autonomousStats,
    isActive: learningState.isLearning,
    isPaused: !learningState.autoLearnEnabled,
    currentTopic: learningState.currentTopic,
    recentTopics: learningState.topicsExplored.slice(-5)
  };
}

