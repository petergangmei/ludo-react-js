import React, { useState, useEffect } from 'react';
import { isSoundEnabled, toggleSound } from '../utils/soundEffects';

/**
 * SoundToggle Component
 * 
 * This component provides a toggle button for enabling/disabling sound effects.
 */
function SoundToggle() {
  // Initialize state with the current sound setting
  const [soundOn, setSoundOn] = useState(true);
  
  // Load the sound setting from localStorage on component mount
  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);
  
  // Handle toggle button click
  const handleToggle = () => {
    const newState = !soundOn;
    setSoundOn(newState);
    toggleSound(newState);
  };
  
  return (
    <button 
      onClick={handleToggle}
      className="flex items-center justify-center p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
      title={soundOn ? 'Mute Sound' : 'Enable Sound'}
    >
      {soundOn ? (
        // Sound On Icon
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6a9 9 0 010 12m-4.5-9.5L12 3v18l-4.5-4.5H5a1 1 0 01-1-1v-7a1 1 0 011-1h2.5z" />
        </svg>
      ) : (
        // Sound Off Icon
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      )}
    </button>
  );
}

export default SoundToggle; 