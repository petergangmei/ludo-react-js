import React from 'react';
import { Link } from 'react-router-dom';

/**
 * InstructionsPage Component
 * 
 * This component displays the rules and instructions for playing Ludo.
 */
function InstructionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">How to Play Ludo</h1>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Objective</h2>
          <p className="text-gray-700">
            The objective of Ludo is to race all four of your tokens from the starting point to the finish line (home) before your opponents.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Basic Rules</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Each player has 4 tokens of the same color.</li>
            <li>Players take turns rolling a dice to move their tokens.</li>
            <li>A token can only leave the starting area if a 6 is rolled.</li>
            <li>If you roll a 6, you get an extra turn.</li>
            <li>If your token lands on an opponent's token, their token is sent back to the starting area.</li>
            <li>To win, you must get all 4 tokens to the home (center) area.</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Movement</h2>
          <p className="text-gray-700 mb-2">
            Tokens move in a clockwise direction around the board, following the track of your color.
          </p>
          <p className="text-gray-700">
            To enter the home stretch, your token must make a complete circuit of the board and then turn into the colored path leading to the center.
          </p>
        </section>
        
        <div className="mt-8 text-center">
          <Link to="/">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InstructionsPage; 