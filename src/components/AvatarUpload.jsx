import { useState, useRef } from 'react';
import { generateAvatarPrompt, generatePromptVariations, formatPromptForDisplay, exportPromptAsFile } from '../utils/promptGenerator';
import { uploadAvatarImage } from '../utils/cloudDatabase';

/**
 * 🎨 AVATAR UPLOAD COMPONENT
 * 
 * Displays AI-generated prompt and allows avatar image upload
 * 
 * Features:
 * - Auto-generate prompt based on AI DNA
 * - Copy prompt to clipboard
 * - Download prompt as .txt file
 * - Drag & drop image upload
 * - File selection upload
 * - Image preview
 * - Upload progress
 */

function AvatarUpload({ aiData, onAvatarUploaded }) {
  const [promptData, setPromptData] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState(0);
  const [showVariations, setShowVariations] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // null, 'uploading', 'success', 'error'
  const [uploadError, setUploadError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Generate prompt on mount
  useState(() => {
    if (aiData) {
      const prompt = generateAvatarPrompt(aiData);
      setPromptData(prompt);
    }
  }, []);

  // Copy prompt to clipboard
  const handleCopyPrompt = () => {
    const variations = generatePromptVariations(aiData);
    const prompt = variations[selectedVariation].prompt;
    
    navigator.clipboard.writeText(prompt);
    
    // Show toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
    toast.textContent = '✅ Prompt copied to clipboard!';
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  // Download prompt as file
  const handleDownloadPrompt = () => {
    if (!promptData) return;
    
    const content = exportPromptAsFile(promptData);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-avatar-prompt-${promptData.metadata.generation_id.substring(0, 8)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  // Handle drag events
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file);
    } else {
      setUploadError('Please drop an image file (PNG, JPEG, or WebP)');
    }
  };

  // Upload file
  const handleFileUpload = async (file) => {
    setUploadStatus('uploading');
    setUploadError(null);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target.result);
    };
    reader.readAsDataURL(file);

    try {
      // Upload to Supabase
      const result = await uploadAvatarImage(file, aiData.generation_id);

      if (result.success) {
        setUploadStatus('success');
        
        // Notify parent component
        if (onAvatarUploaded) {
          onAvatarUploaded({
            url: result.url,
            generatedPrompt: promptData?.prompt,
            promptMetadata: promptData?.metadata
          });
        }
      } else {
        setUploadStatus('error');
        setUploadError(result.error || 'Upload failed');
      }
    } catch (error) {
      setUploadStatus('error');
      setUploadError(error.message);
    }
  };

  if (!promptData) {
    return (
      <div className="bg-black/50 backdrop-blur-xl border border-violet-500/30 rounded-2xl p-6 animate-pulse">
        <div className="h-4 bg-violet-500/20 rounded w-3/4 mb-4"></div>
        <div className="h-20 bg-violet-500/20 rounded"></div>
      </div>
    );
  }

  const variations = generatePromptVariations(aiData);
  const currentPrompt = variations[selectedVariation].prompt;

  return (
    <div className="space-y-6">
      {/* Prompt Display */}
      <div className="bg-black/50 backdrop-blur-xl border border-violet-500/30 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-violet-200 text-lg font-light flex items-center gap-2">
            <span className="text-2xl">📝</span>
            <span>AI-Generated Avatar Prompt</span>
          </h3>
          <button
            onClick={() => setShowVariations(!showVariations)}
            className="px-3 py-1 bg-violet-500/20 hover:bg-violet-500/30 text-violet-200 text-sm rounded-lg transition-all"
          >
            {showVariations ? 'Hide' : 'Show'} Variations
          </button>
        </div>

        {/* Variation Tabs */}
        {showVariations && (
          <div className="flex gap-2 mb-4">
            {variations.map((v, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedVariation(idx)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  selectedVariation === idx
                    ? 'bg-violet-500/40 text-violet-100 border border-violet-400/50'
                    : 'bg-violet-500/10 text-violet-300 hover:bg-violet-500/20'
                }`}
              >
                {v.name}
              </button>
            ))}
          </div>
        )}

        {/* Prompt Text */}
        <div className="bg-gray-900/50 rounded-lg p-4 mb-4 border border-violet-500/20">
          <p className="text-violet-100 text-sm leading-relaxed font-mono">
            {currentPrompt}
          </p>
        </div>

        {/* Prompt Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
          <div className="bg-violet-500/10 rounded p-2">
            <span className="text-violet-300/70">Dominant:</span>{' '}
            <span className="text-violet-200 font-medium capitalize">{promptData.metadata.dominantCategory}</span>
          </div>
          <div className="bg-violet-500/10 rounded p-2">
            <span className="text-violet-300/70">Blockchain:</span>{' '}
            <span className="text-violet-200 font-medium">{promptData.metadata.blockchainExpert ? 'Expert ⚡' : 'Learning'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleCopyPrompt}
            className="flex-1 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <span>📋</span>
            <span>Copy Prompt</span>
          </button>
          <button
            onClick={handleDownloadPrompt}
            className="px-6 py-3 bg-violet-500/20 hover:bg-violet-500/30 border border-violet-400/30 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
          >
            <span>💾</span>
            <span>Download</span>
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-4 pt-4 border-t border-violet-500/20">
          <p className="text-violet-300/70 text-xs leading-relaxed">
            💡 <strong>Next steps:</strong> Copy this prompt, generate an image using Nano Banana (or any AI art tool), then upload it below!
          </p>
        </div>
      </div>

      {/* Image Upload */}
      <div className="bg-black/50 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6 shadow-2xl">
        <h3 className="text-emerald-200 text-lg font-light mb-4 flex items-center gap-2">
          <span className="text-2xl">🖼️</span>
          <span>Upload Avatar Image</span>
        </h3>

        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-emerald-400 bg-emerald-500/20'
              : uploadStatus === 'success'
              ? 'border-green-400 bg-green-500/10'
              : 'border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={handleFileSelect}
            className="hidden"
          />

          {uploadStatus === 'uploading' ? (
            <div className="space-y-4">
              <div className="text-4xl animate-spin">⏳</div>
              <p className="text-emerald-300 text-lg">Uploading...</p>
              <div className="w-full bg-emerald-500/20 rounded-full h-2">
                <div className="bg-emerald-400 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
              </div>
            </div>
          ) : uploadStatus === 'success' ? (
            <div className="space-y-4">
              <div className="text-5xl">✅</div>
              <p className="text-green-300 text-lg font-bold">Avatar Uploaded Successfully!</p>
              {previewUrl && (
                <img src={previewUrl} alt="Uploaded avatar" className="max-w-xs mx-auto rounded-lg shadow-lg" />
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setUploadStatus(null);
                  setPreviewUrl(null);
                }}
                className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 rounded-lg text-sm"
              >
                Upload Different Image
              </button>
            </div>
          ) : uploadStatus === 'error' ? (
            <div className="space-y-4">
              <div className="text-5xl">❌</div>
              <p className="text-red-300 text-lg font-bold">Upload Failed</p>
              <p className="text-red-400 text-sm">{uploadError}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setUploadStatus(null);
                  setUploadError(null);
                }}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg text-sm"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-5xl">📁</div>
              <p className="text-emerald-200 text-lg font-medium">
                Drag & Drop your avatar image here
              </p>
              <p className="text-emerald-300/70 text-sm">or click to browse</p>
              <p className="text-emerald-300/50 text-xs">
                Supports PNG, JPEG, WebP • Max 5MB
              </p>
            </div>
          )}
        </div>

        {/* Upload Info */}
        <div className="mt-4 bg-emerald-500/10 rounded-lg p-4 border border-emerald-400/20">
          <p className="text-emerald-200 text-sm font-medium mb-2">📸 Tips for best results:</p>
          <ul className="text-emerald-300/70 text-xs space-y-1 list-disc list-inside">
            <li>Use high-resolution images (at least 512x512px)</li>
            <li>Square images work best (1:1 aspect ratio)</li>
            <li>Cosmic/energy themed images match the aesthetic</li>
            <li>PNG format with transparency looks great</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AvatarUpload;

