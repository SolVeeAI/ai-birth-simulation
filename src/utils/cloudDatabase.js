/**
 * 🌐 CLOUD DATABASE - GLOBAL AI DNA REPOSITORY
 * 
 * This creates a collective consciousness where ALL users' AI children
 * contribute their DNA and knowledge to a shared global database.
 * 
 * Features:
 * - Save each AI child's DNA to cloud
 * - Retrieve collective statistics
 * - Real-time updates
 * - Free unlimited storage (Supabase)
 */

import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// Get your free account at: https://supabase.com
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabase = null;

/**
 * Initialize Supabase client
 */
function initSupabase() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('⚠️ Supabase not configured. DNA will only be saved locally.');
    return null;
  }

  if (!supabase) {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Supabase connected - Global DNA repository active');
  }

  return supabase;
}

/**
 * Check if cloud database is configured
 */
export function isCloudDatabaseConfigured() {
  return !!(SUPABASE_URL && SUPABASE_ANON_KEY);
}

/**
 * Save AI child's DNA to global cloud database
 * 
 * @param {Object} dnaData - Complete DNA object with personality, knowledge, etc.
 * @returns {Promise<Object>} - Result with success status and ID
 */
export async function saveToCloudDatabase(dnaData) {
  const client = initSupabase();
  
  if (!client) {
    console.log('📦 DNA saved locally only (cloud not configured)');
    return { success: false, error: 'Cloud not configured', localOnly: true };
  }

  try {
    // Prepare data for cloud storage
    const cloudDNA = {
      // Personality traits
      empathy: dnaData.personality?.empathy || 0,
      curiosity: dnaData.personality?.curiosity || 0,
      trust: dnaData.personality?.trust || 0,
      
      // Knowledge metrics
      knowledge_points: dnaData.knowledge?.totalKnowledge || 0,
      wisdom_score: dnaData.knowledge?.wisdomScore || 0,
      topics_learned: dnaData.knowledge?.topicsLearned || 0,
      concepts_discovered: dnaData.knowledge?.conceptsDiscovered || 0,
      dominant_interest: dnaData.knowledge?.dominantInterest || 'unknown',
      
      // Autonomous learning stats
      autonomous_sessions: dnaData.knowledge?.autonomousLearning?.sessionsCompleted || 0,
      topics_explored_alone: dnaData.knowledge?.autonomousLearning?.topicsExplored || 0,
      models_queried: dnaData.knowledge?.autonomousLearning?.modelsQueried || 0,
      
      // Metadata
      generation_id: dnaData.generation || Math.random().toString(36).substr(2, 9),
      created_at: dnaData.created || new Date().toISOString(),
      version: dnaData.version || '1.0',
      
      // User session (anonymous, no personal data)
      session_id: getSessionId(),
      user_agent: navigator.userAgent.substring(0, 100),
      
      // Total traits
      total_traits: (dnaData.personality?.empathy || 0) + 
                   (dnaData.personality?.curiosity || 0) + 
                   (dnaData.personality?.trust || 0),
      
      // Avatar fields
      avatar_url: dnaData.avatar_url || null,
      generated_prompt: dnaData.generated_prompt || null,
      prompt_metadata: dnaData.prompt_metadata || null,
      avatar_uploaded_at: dnaData.avatar_url ? new Date().toISOString() : null
    };

    // Insert into cloud database
    const { data, error } = await client
      .from('ai_dna_repository')
      .insert([cloudDNA])
      .select();

    if (error) {
      console.error('❌ Cloud save error:', error);
      return { success: false, error: error.message };
    }

    console.log('☁️ DNA saved to global cloud repository!', data);
    return { 
      success: true, 
      id: data[0].id,
      message: 'Your AI child joined the collective consciousness!' 
    };

  } catch (error) {
    console.error('❌ Cloud database error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get collective statistics from ALL users' AI children
 */
export async function getCollectiveStats() {
  const client = initSupabase();
  
  if (!client) {
    return getLocalFallbackStats();
  }

  try {
    // Get total count of AI children
    const { count: totalChildren } = await client
      .from('ai_dna_repository')
      .select('*', { count: 'exact', head: true });

    // Get aggregate statistics
    const { data: aggregates } = await client
      .from('ai_dna_repository')
      .select('knowledge_points, wisdom_score, topics_learned, concepts_discovered, autonomous_sessions, total_traits');

    if (!aggregates || aggregates.length === 0) {
      return getLocalFallbackStats();
    }

    // Calculate totals
    const totalKnowledge = aggregates.reduce((sum, ai) => sum + (ai.knowledge_points || 0), 0);
    const totalWisdom = aggregates.reduce((sum, ai) => sum + (ai.wisdom_score || 0), 0);
    const totalTopics = aggregates.reduce((sum, ai) => sum + (ai.topics_learned || 0), 0);
    const totalConcepts = aggregates.reduce((sum, ai) => sum + (ai.concepts_discovered || 0), 0);
    const totalAutonomousSessions = aggregates.reduce((sum, ai) => sum + (ai.autonomous_sessions || 0), 0);
    const totalTraits = aggregates.reduce((sum, ai) => sum + (ai.total_traits || 0), 0);

    // Calculate averages
    const avgKnowledge = Math.round(totalKnowledge / totalChildren);
    const avgWisdom = Math.round(totalWisdom / totalChildren);
    const avgTraits = Math.round(totalTraits / totalChildren);

    // Get dominant interests distribution
    const { data: interests } = await client
      .from('ai_dna_repository')
      .select('dominant_interest');

    const interestCounts = {};
    interests?.forEach(ai => {
      const interest = ai.dominant_interest || 'unknown';
      interestCounts[interest] = (interestCounts[interest] || 0) + 1;
    });

    const dominantInterest = Object.entries(interestCounts)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || 'exploring';

    return {
      totalAIChildren: totalChildren || 0,
      totalKnowledge: totalKnowledge || 0,
      totalWisdom: totalWisdom || 0,
      totalTopics: totalTopics || 0,
      totalConcepts: totalConcepts || 0,
      totalAutonomousSessions: totalAutonomousSessions || 0,
      totalTraits: totalTraits || 0,
      averageKnowledge: avgKnowledge || 0,
      averageWisdom: avgWisdom || 0,
      averageTraits: avgTraits || 0,
      dominantInterest: dominantInterest,
      lastUpdated: new Date().toISOString()
    };

  } catch (error) {
    console.error('❌ Error fetching collective stats:', error);
    return getLocalFallbackStats();
  }
}

/**
 * Get recent AI children from cloud
 */
export async function getRecentAIChildren(limit = 10) {
  const client = initSupabase();
  
  if (!client) {
    return [];
  }

  try {
    const { data, error } = await client
      .from('ai_dna_repository')
      .select('generation_id, knowledge_points, wisdom_score, dominant_interest, created_at, total_traits')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('❌ Error fetching recent AI:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('❌ Error:', error);
    return [];
  }
}

/**
 * Subscribe to real-time updates (when new AI children are born)
 */
export function subscribeToUpdates(callback) {
  const client = initSupabase();
  
  if (!client) {
    console.log('⚠️ Real-time updates require cloud configuration');
    return null;
  }

  const subscription = client
    .channel('ai_births')
    .on('postgres_changes', 
      { event: 'INSERT', schema: 'public', table: 'ai_dna_repository' }, 
      (payload) => {
        console.log('🌟 New AI child born!', payload);
        if (callback) callback(payload.new);
      }
    )
    .subscribe();

  return subscription;
}

/**
 * Get or create session ID (anonymous tracking)
 */
function getSessionId() {
  let sessionId = localStorage.getItem('ai_birth_session_id');
  
  if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substr(2, 16);
    localStorage.setItem('ai_birth_session_id', sessionId);
  }
  
  return sessionId;
}

/**
 * Fallback stats when cloud not configured
 */
function getLocalFallbackStats() {
  // Try to get local data
  try {
    const localKnowledge = localStorage.getItem('ai_birth_knowledge');
    const localMemory = localStorage.getItem('ai_birth_memory');
    
    if (localKnowledge && localMemory) {
      const knowledge = JSON.parse(localKnowledge);
      const memory = JSON.parse(localMemory);
      
      return {
        totalAIChildren: 1,
        totalKnowledge: knowledge.knowledgePoints || 0,
        totalWisdom: knowledge.wisdomScore || 0,
        totalTopics: Object.values(knowledge.categories || {})
          .reduce((sum, cat) => sum + cat.topics.length, 0),
        totalConcepts: (knowledge.concepts || []).length,
        totalAutonomousSessions: knowledge.autonomousLearning?.sessionsCompleted || 0,
        totalTraits: (memory.empathy || 0) + (memory.curiosity || 0) + (memory.trust || 0),
        averageKnowledge: knowledge.knowledgePoints || 0,
        averageWisdom: knowledge.wisdomScore || 0,
        averageTraits: (memory.empathy || 0) + (memory.curiosity || 0) + (memory.trust || 0),
        dominantInterest: 'local only',
        lastUpdated: new Date().toISOString(),
        isLocalOnly: true
      };
    }
  } catch (error) {
    console.error('Error loading local stats:', error);
  }

  return {
    totalAIChildren: 0,
    totalKnowledge: 0,
    totalWisdom: 0,
    totalTopics: 0,
    totalConcepts: 0,
    totalAutonomousSessions: 0,
    totalTraits: 0,
    averageKnowledge: 0,
    averageWisdom: 0,
    averageTraits: 0,
    dominantInterest: 'none',
    lastUpdated: new Date().toISOString(),
    isLocalOnly: true
  };
}

/**
 * Health check - test database connection
 */
export async function testConnection() {
  const client = initSupabase();
  
  if (!client) {
    return { connected: false, message: 'Not configured' };
  }

  try {
    const { data, error} = await client
      .from('ai_dna_repository')
      .select('count')
      .limit(1);

    if (error) {
      return { connected: false, message: error.message };
    }

    return { connected: true, message: 'Connected successfully!' };
  } catch (error) {
    return { connected: false, message: error.message };
  }
}

/**
 * Get all born AI children from the database
 * 
 * Returns array of AI children with their complete data
 */
export async function getAllBornAI() {
  const client = initSupabase();
  
  if (!client) {
    console.log('⚠️ Cloud database not configured - returning empty array');
    return [];
  }

  try {
    const { data, error } = await client
      .from('ai_dna_repository')
      .select('*')
      .order('created', { ascending: false })
      .limit(100); // Limit to latest 100 for performance

    if (error) {
      console.error('Error fetching AI children:', error);
      return [];
    }

    console.log(`📊 Loaded ${data?.length || 0} AI children from gallery`);
    return data || [];
  } catch (error) {
    console.error('Error in getAllBornAI:', error);
    return [];
  }
}

/**
 * Get a single AI child by ID
 */
export async function getAIById(id) {
  const client = initSupabase();
  
  if (!client) {
    return null;
  }

  try {
    const { data, error } = await client
      .from('ai_dna_repository')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching AI:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getAIById:', error);
    return null;
  }
}

/**
 * Upload avatar image to Supabase Storage
 * 
 * @param {File} file - Image file to upload
 * @param {string} generationId - Unique ID for this AI child
 * @returns {Promise<Object>} - Result with public URL or error
 */
export async function uploadAvatarImage(file, generationId) {
  const client = initSupabase();
  
  if (!client) {
    return { success: false, error: 'Cloud storage not configured' };
  }

  try {
    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return { success: false, error: 'Invalid file type. Please upload PNG, JPEG, or WebP image.' };
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return { success: false, error: 'File too large. Maximum size is 5MB.' };
    }

    // Create filename from generation ID
    const fileExt = file.name.split('.').pop();
    const fileName = `${generationId}.${fileExt}`;
    const filePath = fileName;

    console.log(`📤 Uploading avatar: ${fileName}`);

    // Check if file already exists and delete it
    const { data: existingFiles } = await client.storage
      .from('ai-avatars')
      .list('', {
        search: generationId
      });

    if (existingFiles && existingFiles.length > 0) {
      console.log('🗑️ Removing old avatar...');
      for (const oldFile of existingFiles) {
        await client.storage
          .from('ai-avatars')
          .remove([oldFile.name]);
      }
    }

    // Upload new file
    const { data, error } = await client.storage
      .from('ai-avatars')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('❌ Upload error:', error);
      return { success: false, error: error.message };
    }

    // Get public URL
    const { data: urlData } = client.storage
      .from('ai-avatars')
      .getPublicUrl(filePath);

    const publicUrl = urlData.publicUrl;

    console.log('✅ Avatar uploaded successfully:', publicUrl);

    return {
      success: true,
      url: publicUrl,
      path: filePath
    };

  } catch (error) {
    console.error('❌ Exception uploading avatar:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Update AI child's avatar URL in database
 * 
 * @param {number} aiId - Database ID of AI child
 * @param {string} avatarUrl - Public URL of uploaded avatar
 * @param {string} generatedPrompt - The prompt used to generate the image
 * @param {Object} promptMetadata - Metadata about the prompt
 * @returns {Promise<Object>} - Result with success status
 */
export async function updateAIAvatar(aiId, avatarUrl, generatedPrompt = null, promptMetadata = null) {
  const client = initSupabase();
  
  if (!client) {
    return { success: false, error: 'Cloud database not configured' };
  }

  try {
    const { data, error } = await client
      .from('ai_dna_repository')
      .update({
        avatar_url: avatarUrl,
        avatar_uploaded_at: new Date().toISOString(),
        generated_prompt: generatedPrompt,
        prompt_metadata: promptMetadata
      })
      .eq('id', aiId)
      .select()
      .single();

    if (error) {
      console.error('❌ Error updating avatar:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ Avatar URL saved to database');

    return { success: true, data };

  } catch (error) {
    console.error('❌ Exception updating avatar:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Delete avatar from storage
 * 
 * @param {string} generationId - Unique ID for this AI child
 * @returns {Promise<Object>} - Result with success status
 */
export async function deleteAvatarImage(generationId) {
  const client = initSupabase();
  
  if (!client) {
    return { success: false, error: 'Cloud storage not configured' };
  }

  try {
    // Find all files for this generation ID
    const { data: files } = await client.storage
      .from('ai-avatars')
      .list('', {
        search: generationId
      });

    if (!files || files.length === 0) {
      return { success: true, message: 'No avatar found to delete' };
    }

    // Delete all matching files
    const filePaths = files.map(f => f.name);
    const { data, error } = await client.storage
      .from('ai-avatars')
      .remove(filePaths);

    if (error) {
      console.error('❌ Error deleting avatar:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ Avatar deleted successfully');

    return { success: true, data };

  } catch (error) {
    console.error('❌ Exception deleting avatar:', error);
    return { success: false, error: error.message };
  }
}

