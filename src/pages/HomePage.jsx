import React from 'react';
import { Link } from 'react-router-dom';

/**
 * HomePage Component
 * 
 * This component serves as the landing page for the Ludo King game.
 * It includes a hero banner, a start game button, and navigation links.
 */
function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex flex-col items-center justify-center p-4">
      {/* Hero Banner */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-blue-800 mb-4">Ludo King</h1>
        <p className="text-xl text-gray-700 max-w-md mx-auto">
          Play the classic board game against AI opponents in this React implementation
        </p>
      </div>
      
      {/* Start Game Button */}
      <Link to="/game">
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transform transition hover:scale-105"
        >
          Start Game
        </button>
      </Link>
      
      {/* Optional Navigation Links */}
      <div className="mt-8 flex gap-4">
        <Link to="/instructions" className="text-blue-600 hover:text-blue-800 underline">Instructions</Link>
        <a href="#" className="text-blue-600 hover:text-blue-800 underline">About</a>
      </div>
    </div>
  );
}

export default HomePage; 