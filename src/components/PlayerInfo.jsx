import React from 'react';
import Token from './Token';

/**
 * PlayerInfo Component
 * 
 * This component displays information about a player's tokens.
 * It shows the player's color, name, and the status of their tokens.
 * 
 * @param {Object} props - Component props
 * @param {string} props.color - The player's color
 * @param {Array} props.tokens - Array of token positions
 * @param {boolean} props.isCurrentPlayer - Whether this is the current player
 */
function PlayerInfo({ color, tokens, isCurrentPlayer }) {
  // Count tokens by status
  const tokenCounts = {
    start: tokens.filter(pos => pos === 'start').length,
    board: tokens.filter(pos => typeof pos === 'number').length,
    home: tokens.filter(pos => pos === 'home').length,
  };
  
  // Get player name with first letter capitalized
  const playerName = color.charAt(0).toUpperCase() + color.slice(1);
  
  // Define color classes based on the player color
  const colorClasses = {
    red: 'bg-red-100 border-red-500',
    green: 'bg-green-100 border-green-500',
    yellow: 'bg-yellow-100 border-yellow-500',
    blue: 'bg-blue-100 border-blue-500',
  };
  
  return (
    <div className={`p-3 rounded-lg border-2 ${colorClasses[color]} ${isCurrentPlayer ? 'ring-2 ring-offset-2 ring-blue-400' : ''}`}>
      <div className="flex items-center mb-2">
        <div className="mr-2">
          <Token 
            color={color} 
            id={0} 
            isHome={false} 
            isStart={false} 
            isSelectable={false} 
          />
        </div>
        <h3 className="text-lg font-semibold">{playerName}</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="text-center">
          <div className="font-medium">Start</div>
          <div className="text-lg">{tokenCounts.start}</div>
        </div>
        <div className="text-center">
          <div className="font-medium">Board</div>
          <div className="text-lg">{tokenCounts.board}</div>
        </div>
        <div className="text-center">
          <div className="font-medium">Home</div>
          <div className="text-lg">{tokenCounts.home}</div>
        </div>
      </div>
    </div>
  );
}

export default PlayerInfo; 