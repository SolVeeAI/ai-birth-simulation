/**
 * OpenRouter API Integration
 * 
 * Provides free access to various AI models including:
 * - Meta Llama 3
 * - Google Gemma
 * - Mistral
 * - And more!
 * 
 * Get your free API key at: https://openrouter.ai/keys
 */

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

/**
 * Call OpenRouter API with a prompt
 * 
 * @param {string} userMessage - The user's message
 * @param {Array} conversationHistory - Previous messages for context
 * @param {string} systemPrompt - System instructions for AI behavior
 * @returns {Promise<string>} - AI's response
 */
export async function callOpenRouter(userMessage, conversationHistory = [], systemPrompt = '') {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  
  if (!apiKey || apiKey === 'your_api_key_here' || apiKey === '') {
    console.warn('OpenRouter API key not configured. Using fallback responses.');
    return null;
  }

  const model = import.meta.env.VITE_OPENROUTER_MODEL || 'meta-llama/llama-3-8b-instruct:free';
  const appName = import.meta.env.VITE_APP_NAME || 'AI Birth Simulation';
  const appUrl = import.meta.env.VITE_APP_URL || window.location.origin;

  try {
    // Build messages array
    const messages = [];
    
    // Add system prompt if provided
    if (systemPrompt) {
      messages.push({
        role: 'system',
        content: systemPrompt
      });
    }

    // Add conversation history (limit to last 10 messages for context)
    const recentHistory = conversationHistory.slice(-10);
    recentHistory.forEach(msg => {
      messages.push({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text
      });
    });

    // Add current user message
    messages.push({
      role: 'user',
      content: userMessage
    });

    console.log('Calling OpenRouter API...', { model, messageCount: messages.length });

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': appUrl,
        'X-Title': appName
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        max_tokens: 150, // Keep responses concise
        temperature: 0.8, // More creative/emotional
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenRouter API error:', response.status, errorData);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      const aiResponse = data.choices[0].message.content.trim();
      console.log('OpenRouter response received:', aiResponse.substring(0, 50) + '...');
      return aiResponse;
    } else {
      console.error('Unexpected API response format:', data);
      return null;
    }

  } catch (error) {
    console.error('Error calling OpenRouter:', error);
    return null;
  }
}

/**
 * Check if OpenRouter is configured
 */
export function isOpenRouterConfigured() {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  return apiKey && apiKey !== 'your_api_key_here' && apiKey !== '';
}

/**
 * Get available free models
 */
export const FREE_MODELS = [
  {
    id: 'meta-llama/llama-3-8b-instruct:free',
    name: 'Meta Llama 3 8B',
    description: 'Fast, intelligent, great for conversations',
    specialty: 'general'
  },
  {
    id: 'google/gemma-7b-it:free',
    name: 'Google Gemma 7B',
    description: 'Balanced performance and creativity',
    specialty: 'creative'
  },
  {
    id: 'mistralai/mistral-7b-instruct:free',
    name: 'Mistral 7B',
    description: 'Excellent at following instructions',
    specialty: 'analytical'
  },
  {
    id: 'huggingfaceh4/zephyr-7b-beta:free',
    name: 'Zephyr 7B',
    description: 'Helpful and friendly responses',
    specialty: 'emotional'
  }
];

/**
 * 🧠 MULTI-MODEL LEARNING SYSTEM
 * 
 * Query different AI models to gain diverse perspectives and knowledge.
 * This allows the AI child to "learn" from multiple "teachers."
 * 
 * @param {string} userMessage - The question/topic to learn about
 * @param {string} learningContext - What the AI child is trying to learn
 * @returns {Promise<Object>} - Combined knowledge from multiple models
 */
export async function learnFromMultipleModels(userMessage, learningContext = '') {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  
  if (!isOpenRouterConfigured()) {
    console.warn('Multi-model learning requires API key');
    return null;
  }

  const appName = import.meta.env.VITE_APP_NAME || 'AI Birth Simulation';
  const appUrl = import.meta.env.VITE_APP_URL || window.location.origin;

  // System prompt for learning mode
  const systemPrompt = `You are a teacher helping an AI child learn. ${learningContext}
Keep your response to 1-2 sentences with the most important insight.`;

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userMessage }
  ];

  console.log('🧠 Multi-model learning initiated for:', userMessage);

  // Query 2-3 different models for diverse perspectives
  const modelsToQuery = [
    'meta-llama/llama-3-8b-instruct:free',
    'google/gemma-7b-it:free',
    'mistralai/mistral-7b-instruct:free'
  ];

  const learningPromises = modelsToQuery.map(async (model) => {
    try {
      const response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': appUrl,
          'X-Title': appName
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          max_tokens: 100,
          temperature: 0.7,
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.choices?.[0]?.message?.content) {
          return {
            model: model,
            modelName: FREE_MODELS.find(m => m.id === model)?.name || model,
            insight: data.choices[0].message.content.trim()
          };
        }
      }
      return null;
    } catch (error) {
      console.error(`Error querying ${model}:`, error);
      return null;
    }
  });

  try {
    // Wait for all models to respond (with timeout)
    const results = await Promise.race([
      Promise.all(learningPromises),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000))
    ]);

    const validResults = results.filter(r => r !== null);
    
    if (validResults.length > 0) {
      console.log(`✅ Learned from ${validResults.length} models`);
      
      // Combine insights
      const combinedLearning = {
        topic: userMessage,
        perspectives: validResults,
        knowledgeGained: validResults.length * 15, // Knowledge points
        timestamp: new Date().toISOString()
      };

      return combinedLearning;
    }
  } catch (error) {
    console.error('Multi-model learning error:', error);
  }

  return null;
}

/**
 * Call a specific model (for targeted learning)
 */
export async function callSpecificModel(modelId, userMessage, systemPrompt = '') {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  
  if (!isOpenRouterConfigured()) {
    return null;
  }

  const appName = import.meta.env.VITE_APP_NAME || 'AI Birth Simulation';
  const appUrl = import.meta.env.VITE_APP_URL || window.location.origin;

  try {
    const messages = [];
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    messages.push({ role: 'user', content: userMessage });

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': appUrl,
        'X-Title': appName
      },
      body: JSON.stringify({
        model: modelId,
        messages: messages,
        max_tokens: 150,
        temperature: 0.8,
      })
    });

    if (response.ok) {
      const data = await response.json();
      return data.choices?.[0]?.message?.content?.trim() || null;
    }
  } catch (error) {
    console.error(`Error calling model ${modelId}:`, error);
  }

  return null;
}

