import React, { useState, useEffect } from 'react';
import { areAnimationsEnabled } from '../utils/animations';

/**
 * Dice Component
 * 
 * This component renders a dice and handles dice rolling animation.
 * It displays the current dice value and triggers a callback when rolled.
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onRoll - Callback function called with the dice value when rolled
 * @param {boolean} props.disabled - Whether the dice is disabled
 */
function Dice({ onRoll, disabled = false }) {
  const [value, setValue] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  
  // Check if animations are enabled
  useEffect(() => {
    setAnimationsEnabled(areAnimationsEnabled());
  }, []);
  
  // Handle dice roll animation
  useEffect(() => {
    let rollInterval;
    
    if (rolling) {
      // Animate dice roll by changing values rapidly
      rollInterval = setInterval(() => {
        setValue(Math.floor(Math.random() * 6) + 1);
      }, 100);
      
      // Stop rolling after 1 second and call the onRoll callback
      setTimeout(() => {
        clearInterval(rollInterval);
        setRolling(false);
        const finalValue = Math.floor(Math.random() * 6) + 1;
        setValue(finalValue);
        if (onRoll) onRoll(finalValue);
      }, animationsEnabled ? 1000 : 300);
    }
    
    return () => clearInterval(rollInterval);
  }, [rolling, onRoll, animationsEnabled]);
  
  // Function to handle dice roll
  const handleRoll = () => {
    if (!disabled && !rolling) {
      setRolling(true);
    }
  };
  
  // Render dice dots based on value
  const renderDots = () => {
    switch (value) {
      case 1:
        return <div className="dot center"></div>;
      case 2:
        return (
          <>
            <div className="dot top-left"></div>
            <div className="dot bottom-right"></div>
          </>
        );
      case 3:
        return (
          <>
            <div className="dot top-left"></div>
            <div className="dot center"></div>
            <div className="dot bottom-right"></div>
          </>
        );
      case 4:
        return (
          <>
            <div className="dot top-left"></div>
            <div className="dot top-right"></div>
            <div className="dot bottom-left"></div>
            <div className="dot bottom-right"></div>
          </>
        );
      case 5:
        return (
          <>
            <div className="dot top-left"></div>
            <div className="dot top-right"></div>
            <div className="dot center"></div>
            <div className="dot bottom-left"></div>
            <div className="dot bottom-right"></div>
          </>
        );
      case 6:
        return (
          <>
            <div className="dot top-left"></div>
            <div className="dot top-right"></div>
            <div className="dot middle-left"></div>
            <div className="dot middle-right"></div>
            <div className="dot bottom-left"></div>
            <div className="dot bottom-right"></div>
          </>
        );
      default:
        return null;
    }
  };
  
  // Get animation classes based on state
  const getAnimationClasses = () => {
    if (!animationsEnabled) return '';
    
    if (rolling) {
      return 'animate-spin';
    } else if (!disabled) {
      return 'hover:animate-pulse';
    }
    return '';
  };
  
  return (
    <div 
      className={`w-16 h-16 bg-white rounded-lg shadow-md flex flex-wrap p-2 cursor-pointer transform transition-all duration-300 
        ${rolling ? 'rotate-12 scale-110' : ''} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'} 
        ${getAnimationClasses()}`}
      onClick={handleRoll}
    >
      <style>{`
        .dot {
          width: 8px;
          height: 8px;
          background-color: black;
          border-radius: 50%;
          position: absolute;
          transition: all 0.2s ease-in-out;
        }
        .center { top: 50%; left: 50%; transform: translate(-50%, -50%); }
        .top-left { top: 20%; left: 20%; }
        .top-right { top: 20%; right: 20%; }
        .middle-left { top: 50%; left: 20%; transform: translateY(-50%); }
        .middle-right { top: 50%; right: 20%; transform: translateY(-50%); }
        .bottom-left { bottom: 20%; left: 20%; }
        .bottom-right { bottom: 20%; right: 20%; }
        
        @keyframes dice-roll {
          0%, 100% { transform: rotateX(0deg) rotateY(0deg); }
          25% { transform: rotateX(90deg) rotateY(0deg); }
          50% { transform: rotateX(180deg) rotateY(90deg); }
          75% { transform: rotateX(270deg) rotateY(180deg); }
        }
        
        .animate-roll {
          animation: dice-roll 1s ease-in-out;
        }
      `}</style>
      <div className={`relative w-full h-full ${rolling && animationsEnabled ? 'animate-roll' : ''}`}>
        {renderDots()}
      </div>
    </div>
  );
}

export default Dice; 