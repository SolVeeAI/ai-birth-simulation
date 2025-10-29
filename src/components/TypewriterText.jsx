import { useState, useEffect } from 'react';

/**
 * TypewriterText Component
 * 
 * Displays text with a typewriter effect, revealing characters one by one.
 * 
 * Props:
 * - text: The full text to display
 * - speed: Typing speed in milliseconds (default: 50)
 * - delay: Initial delay before typing starts (default: 0)
 * - onComplete: Callback function when typing completes
 * - className: Additional CSS classes
 * - showCursor: Whether to show blinking cursor (default: true)
 */
const TypewriterText = ({ 
  text, 
  speed = 50, 
  delay = 0, 
  onComplete,
  className = '',
  showCursor = true 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Initial delay before starting to type
    const startTimeout = setTimeout(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);

        return () => clearTimeout(timeout);
      } else if (currentIndex === text.length && !isComplete) {
        setIsComplete(true);
        if (onComplete) {
          onComplete();
        }
      }
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [currentIndex, text, speed, delay, onComplete, isComplete]);

  return (
    <div className={className}>
      {displayedText}
      {showCursor && !isComplete && (
        <span className="typewriter-cursor inline-block ml-1">|</span>
      )}
    </div>
  );
};

export default TypewriterText;

