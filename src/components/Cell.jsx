import React from 'react';

/**
 * Cell Component
 * 
 * This component renders a single cell on the game board.
 * It can display different types of cells (normal, safe, home, etc.) and contain tokens.
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - The type of cell ('normal', 'safe', 'home', 'start')
 * @param {string} props.color - The color of the cell (for colored paths)
 * @param {Array} props.tokens - Array of tokens in this cell
 * @param {Function} props.onCellClick - Callback function called when the cell is clicked
 */
function Cell({ type = 'normal', color, tokens = [], onCellClick }) {
  // Define background color classes based on cell type and color
  const getBgColorClass = () => {
    if (type === 'safe') return 'bg-gray-200';
    if (type === 'home') return 'bg-gray-100';
    if (type === 'start') {
      switch (color) {
        case 'red': return 'bg-red-200';
        case 'green': return 'bg-green-200';
        case 'yellow': return 'bg-yellow-200';
        case 'blue': return 'bg-blue-200';
        default: return 'bg-white';
      }
    }
    if (color) {
      switch (color) {
        case 'red': return 'bg-red-100';
        case 'green': return 'bg-green-100';
        case 'yellow': return 'bg-yellow-100';
        case 'blue': return 'bg-blue-100';
        default: return 'bg-white';
      }
    }
    return 'bg-white';
  };
  
  // Define border color classes based on cell type
  const getBorderColorClass = () => {
    if (type === 'safe') return 'border-gray-400';
    if (type === 'home') return 'border-gray-300';
    if (type === 'start') {
      switch (color) {
        case 'red': return 'border-red-400';
        case 'green': return 'border-green-400';
        case 'yellow': return 'border-yellow-400';
        case 'blue': return 'border-blue-400';
        default: return 'border-gray-300';
      }
    }
    return 'border-gray-300';
  };
  
  // Handle cell click
  const handleClick = () => {
    if (onCellClick) {
      onCellClick();
    }
  };
  
  // Render tokens in the cell
  const renderTokens = () => {
    if (tokens.length === 0) return null;
    
    // If there's only one token, center it
    if (tokens.length === 1) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          {tokens[0]}
        </div>
      );
    }
    
    // If there are multiple tokens, arrange them in a grid
    return (
      <div className="absolute inset-0 grid grid-cols-2 gap-1 p-1">
        {tokens.map((token, index) => (
          <div key={index} className="flex items-center justify-center">
            {token}
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div 
      className={`relative w-full h-full border ${getBorderColorClass()} ${getBgColorClass()} 
        ${onCellClick ? 'cursor-pointer hover:bg-opacity-80' : ''}`}
      onClick={handleClick}
    >
      {renderTokens()}
    </div>
  );
}

export default Cell; 