import React, { useState, useEffect } from 'react';
import { areAnimationsEnabled } from '../utils/animations';

/**
 * Token Component
 * 
 * This component renders a player token on the game board.
 * It handles token selection and displays the token's current state.
 * 
 * @param {Object} props - Component props
 * @param {string} props.color - The color of the token ('red', 'green', 'yellow', 'blue')
 * @param {number} props.id - The ID of the token (0-3)
 * @param {boolean} props.isHome - Whether the token is in the home position
 * @param {boolean} props.isStart - Whether the token is in the starting position
 * @param {boolean} props.isSelectable - Whether the token can be selected
 * @param {Function} props.onSelect - Callback function called when the token is selected
 */
function Token({ color, id, isHome, isStart, isSelectable, onSelect }) {
  // State for animation
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  
  // Check if animations are enabled
  useEffect(() => {
    setAnimationsEnabled(areAnimationsEnabled());
  }, []);
  
  // Define color classes based on the token color
  const colorClasses = {
    red: 'bg-red-500 hover:bg-red-600',
    green: 'bg-green-500 hover:bg-green-600',
    yellow: 'bg-yellow-500 hover:bg-yellow-600',
    blue: 'bg-blue-500 hover:bg-blue-600',
  };
  
  // Define animation classes
  const getAnimationClass = () => {
    if (!animationsEnabled) return '';
    
    if (isSelectable) {
      return 'animate-pulse';
    } else if (isHome) {
      return 'animate-bounce';
    } else if (isAnimating) {
      return 'animate-spin';
    }
    return '';
  };
  
  // Handle token click
  const handleClick = () => {
    if (isSelectable && onSelect) {
      // Trigger animation
      if (animationsEnabled) {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 500);
      }
      
      onSelect(id);
    }
  };
  
  return (
    <div 
      className={`w-8 h-8 rounded-full ${colorClasses[color]} shadow-md flex items-center justify-center text-white font-bold
        ${isSelectable ? 'cursor-pointer transform hover:scale-110 ring-2 ring-white' : 'opacity-80'}
        ${isHome ? 'border-2 border-white' : ''}
        ${getAnimationClass()}
        transition-all duration-200`}
      onClick={handleClick}
    >
      {id + 1}
    </div>
  );
}

export default Token; 