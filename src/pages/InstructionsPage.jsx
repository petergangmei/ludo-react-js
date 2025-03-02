import React from 'react';
import { Link } from 'react-router-dom';

/**
 * InstructionsPage Component
 * 
 * This component provides instructions on how to play the Ludo game.
 * It includes game rules, objectives, and gameplay mechanics.
 */
function InstructionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800">How to Play Ludo</h1>
          <Link to="/">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Back to Home
            </button>
          </Link>
        </div>
        
        {/* Game Objective */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Game Objective</h2>
          <p className="text-gray-700">
            The objective of Ludo is to be the first player to move all four of your tokens from the starting position to the home position by traversing the board in a clockwise direction.
          </p>
        </section>
        
        {/* Game Setup */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Game Setup</h2>
          <p className="text-gray-700">
            Each player has 4 tokens of their color. All tokens start in the 'start' position. You play as the red player, and you'll compete against AI opponents controlling the green, yellow, and blue tokens.
          </p>
        </section>
        
        {/* Game Rules */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Game Rules</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Players take turns rolling a dice to determine how many spaces to move.</li>
            <li>A player must roll a 6 to move a token from the starting position onto the board.</li>
            <li>If a player rolls a 6, they get an extra turn after moving.</li>
            <li>If a token lands on an opponent's token, the opponent's token is captured and sent back to the starting position.</li>
            <li>Tokens move around the board in a clockwise direction.</li>
            <li>To enter the home stretch, a token must reach the colored path leading to the home position.</li>
            <li>A token must land exactly on the home position. If the dice roll is too high, the token cannot move.</li>
          </ul>
        </section>
        
        {/* How to Win */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">How to Win</h2>
          <p className="text-gray-700">
            The first player to move all four tokens to the home position wins the game. Your game statistics will be updated based on whether you win or lose.
          </p>
        </section>
        
        {/* Controls */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Controls</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Click the "Roll Dice" button to roll the dice on your turn.</li>
            <li>Click on a token to move it after rolling the dice.</li>
            <li>Only tokens that can legally move will be highlighted.</li>
            <li>The game log will show all moves and captures during the game.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default InstructionsPage; 