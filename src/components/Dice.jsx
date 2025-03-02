import React, { useState, useEffect } from 'react';

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
      }, 1000);
    }
    
    return () => clearInterval(rollInterval);
  }, [rolling, onRoll]);
  
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
  
  return (
    <div 
      className={`w-16 h-16 bg-white rounded-lg shadow-md flex flex-wrap p-2 cursor-pointer transform transition-transform ${rolling ? 'rotate-12' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
      onClick={handleRoll}
    >
      <style jsx>{`
        .dot {
          width: 8px;
          height: 8px;
          background-color: black;
          border-radius: 50%;
          position: absolute;
        }
        .center { top: 50%; left: 50%; transform: translate(-50%, -50%); }
        .top-left { top: 20%; left: 20%; }
        .top-right { top: 20%; right: 20%; }
        .middle-left { top: 50%; left: 20%; transform: translateY(-50%); }
        .middle-right { top: 50%; right: 20%; transform: translateY(-50%); }
        .bottom-left { bottom: 20%; left: 20%; }
        .bottom-right { bottom: 20%; right: 20%; }
      `}</style>
      <div className="relative w-full h-full">
        {renderDots()}
      </div>
    </div>
  );
}

export default Dice; 