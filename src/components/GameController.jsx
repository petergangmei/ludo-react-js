import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GameBoard from './GameBoard';

/**
 * GameController Component
 * 
 * This component manages the game state and controls the flow of the game.
 * It will handle turn switching, dice rolling, and token movement.
 */
function GameController() {
  // Basic game state (to be expanded in Phase 3)
  const [currentPlayer, setCurrentPlayer] = useState('player'); // 'player' or 'ai'
  const [gameStatus, setGameStatus] = useState('waiting'); // 'waiting', 'playing', 'finished'
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        {/* Game Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800">Ludo King</h1>
          <Link to="/">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Back to Home
            </button>
          </Link>
        </div>
        
        {/* Game Status */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 text-center">
          <p className="text-xl font-semibold text-blue-700">
            {currentPlayer === 'player' ? 'Your Turn' : 'AI is thinking...'}
          </p>
        </div>
        
        {/* Game Board */}
        <GameBoard />
        
        {/* Game Controls */}
        <div className="mt-6 flex justify-center">
          <button 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg text-lg"
            onClick={() => console.log('Roll dice - to be implemented')}
          >
            Roll Dice
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameController; 