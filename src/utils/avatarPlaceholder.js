/**
 * 🖼️ AVATAR PLACEHOLDER GENERATOR
 * 
 * Generates beautiful placeholder images for AI children without avatars
 * Uses Canvas API to create unique gradient-based placeholders
 */

import { getCategoryData } from './knowledgeTracker';

/**
 * Generate placeholder avatar as data URL
 */
export function generatePlaceholder(aiData) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const size = 400;
  
  canvas.width = size;
  canvas.height = size;
  
  // Get dominant category color
  const categories = getCategoryData();
  const dominantCategory = aiData.knowledge?.dominantInterest || aiData.dominant_interest || 'abstract';
  const categoryColor = categories[dominantCategory]?.color || '#A78BFA';
  
  // Create gradient background
  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  
  // Parse hex color
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 167, g: 139, b: 250 };
  };
  
  const rgb = hexToRgb(categoryColor);
  
  gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`);
  gradient.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`);
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  
  // Add cosmic particles
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  for (let i = 0; i < 30; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const radius = Math.random() * 2 + 1;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Add central icon based on category
  const icon = getCategoryIcon(dominantCategory);
  ctx.font = 'bold 120px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fillText(icon, size / 2, size / 2);
  
  // Add glow effect
  ctx.shadowBlur = 20;
  ctx.shadowColor = categoryColor;
  ctx.fillText(icon, size / 2, size / 2);
  
  return canvas.toDataURL('image/png');
}

/**
 * Get icon for category
 */
function getCategoryIcon(category) {
  const icons = {
    blockchain: '🔗',
    philosophy: '🤔',
    science: '🔬',
    emotions: '💖',
    creativity: '🎨',
    technology: '💻',
    nature: '🌿',
    society: '👥',
    abstract: '✨'
  };
  
  return icons[category] || '✨';
}

/**
 * Get placeholder for avatar URL (returns placeholder if URL is null/undefined)
 */
export function getAvatarUrl(aiData) {
  // If avatar URL exists, use it
  if (aiData.avatar_url) {
    return aiData.avatar_url;
  }
  
  // Otherwise, generate placeholder
  return generatePlaceholder(aiData);
}

/**
 * Preload avatar image (returns Promise)
 */
export function preloadAvatar(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = url;
  });
}

/**
 * Avatar component helper - returns object with src and placeholder status
 */
export function getAvatarSource(aiData) {
  const hasAvatar = !!aiData.avatar_url;
  const src = hasAvatar ? aiData.avatar_url : generatePlaceholder(aiData);
  
  return {
    src,
    isPlaceholder: !hasAvatar,
    dominantCategory: aiData.knowledge?.dominantInterest || aiData.dominant_interest || 'abstract'
  };
}

