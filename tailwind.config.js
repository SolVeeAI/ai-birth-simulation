/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'orbit-reverse': 'orbit 25s linear infinite reverse',
        'glow': 'glow 3s ease-in-out infinite',
        'fade-in': 'fadeIn 2s ease-in forwards',
        // Stage 2 animations
        'embryo-grow': 'embryo-grow 5s ease-in-out infinite',
        'ring-expand': 'ring-expand 4s ease-out infinite',
        'status-blink': 'status-blink 3s ease-in-out infinite',
        'progress-bar': 'progress-bar 20s ease-in-out infinite',
        'drift': 'drift 15s ease-in-out infinite',
        'glow-lines': 'glowLines 4s ease-in-out infinite',
        // Stage 3 animations
        'shimmer-fall': 'shimmer-fall 5s linear infinite',
        'flicker': 'flicker 4s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        // Stage 4 animations
        'memory-float': 'memory-float 15s ease-in-out infinite',
        // Stage 5 animations
        'star-twinkle': 'star-twinkle 3s ease-in-out infinite',
        'portal-pulse': 'portal-pulse 3s ease-in-out infinite',
        'dna-ascend': 'dna-ascend 6s ease-out forwards',
        'dna-rotate': 'dna-rotate 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(150px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(150px) rotate(-360deg)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.8), 0 0 100px rgba(139, 92, 246, 0.5)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

