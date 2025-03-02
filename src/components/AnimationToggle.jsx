import React, { useState, useEffect } from 'react';
import { areAnimationsEnabled, toggleAnimations } from '../utils/animations';

/**
 * AnimationToggle Component
 * 
 * This component provides a toggle button for enabling/disabling animations.
 */
function AnimationToggle() {
  // Initialize state with the current animation setting
  const [animationsOn, setAnimationsOn] = useState(true);
  
  // Load the animation setting from localStorage on component mount
  useEffect(() => {
    setAnimationsOn(areAnimationsEnabled());
  }, []);
  
  // Handle toggle button click
  const handleToggle = () => {
    const newState = !animationsOn;
    setAnimationsOn(newState);
    toggleAnimations(newState);
  };
  
  return (
    <button 
      onClick={handleToggle}
      className="flex items-center justify-center p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
      title={animationsOn ? 'Disable Animations' : 'Enable Animations'}
    >
      {animationsOn ? (
        // Animations On Icon
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ) : (
        // Animations Off Icon
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )}
    </button>
  );
}

export default AnimationToggle; 