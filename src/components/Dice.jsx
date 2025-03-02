import React, { useState, useEffect } from 'react';
import { areAnimationsEnabled } from '../utils/animations';

/**
 * Dice Component
 * 
 * This component renders a dice and handles dice rolling animation.
 * It displays the current dice value and triggers a callback when rolled.
 * 
 * @param {Object} props - Component props
 * @param {number} props.value - The current dice value
 * @param {Function} props.onRoll - Callback function called when the dice is rolled
 * @param {boolean} props.canRoll - Whether the dice can be rolled
 * @param {boolean} props.disabled - Whether the dice is disabled
 * @param {boolean} props.isRolling - Whether the dice is currently rolling
 */
function Dice({ value, onRoll, canRoll = true, disabled = false, isRolling = false }) {
  const [displayValue, setDisplayValue] = useState(value || 1);
  const [rolling, setRolling] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  
  // Check if animations are enabled
  useEffect(() => {
    setAnimationsEnabled(areAnimationsEnabled());
  }, []);
  
  // Update display value when prop value changes
  useEffect(() => {
    if (value) {
      setDisplayValue(value);
    }
  }, [value]);
  
  // Handle dice roll animation
  useEffect(() => {
    let rollInterval;
    
    if (rolling) {
      // Animate dice roll by changing values rapidly
      rollInterval = setInterval(() => {
        setDisplayValue(Math.floor(Math.random() * 6) + 1);
      }, 100);
      
      // Stop rolling after 1 second and call the onRoll callback
      setTimeout(() => {
        clearInterval(rollInterval);
        setRolling(false);
        if (onRoll) onRoll();
      }, animationsEnabled ? 1000 : 300);
    }
    
    return () => clearInterval(rollInterval);
  }, [rolling, onRoll, animationsEnabled]);
  
  // Function to handle dice roll
  const handleRoll = () => {
    if (canRoll && !disabled && !rolling) {
      setRolling(true);
    }
  };
  
  // Render dice dots based on value
  const renderDots = () => {
    switch (displayValue) {
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
    
    if (rolling || isRolling) {
      return 'animate-spin';
    } else if (canRoll && !disabled) {
      return 'hover:animate-pulse';
    }
    return '';
  };
  
  return (
    <div 
      className={`w-16 h-16 bg-white rounded-lg shadow-md flex flex-wrap p-2 relative
        ${(canRoll && !disabled) ? 'cursor-pointer hover:scale-110' : 'cursor-not-allowed opacity-70'} 
        ${rolling || isRolling ? 'rotate-12 scale-110' : ''} 
        ${getAnimationClasses()} transform transition-all duration-300`}
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
      <div className={`relative w-full h-full ${(rolling || isRolling) && animationsEnabled ? 'animate-roll' : ''}`}>
        {renderDots()}
      </div>
    </div>
  );
}

export default Dice; 