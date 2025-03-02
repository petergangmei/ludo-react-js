import React, { useState, useEffect } from 'react';

/**
 * GameStats Component
 * 
 * This component displays game statistics such as wins, losses, and games played.
 * It retrieves the stats from localStorage and displays them in a formatted way.
 */
function GameStats() {
  // Initialize stats state
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    wins: 0,
    losses: 0
  });
  
  // Load stats from localStorage on component mount
  useEffect(() => {
    const savedStats = localStorage.getItem('ludoGameStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);
  
  // Calculate win percentage
  const winPercentage = stats.gamesPlayed > 0 
    ? Math.round((stats.wins / stats.gamesPlayed) * 100) 
    : 0;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold text-blue-700 mb-3">Game Statistics</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600">Games Played</p>
          <p className="text-2xl font-bold text-blue-800">{stats.gamesPlayed}</p>
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600">Win Percentage</p>
          <p className="text-2xl font-bold text-green-700">{winPercentage}%</p>
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600">Wins</p>
          <p className="text-2xl font-bold text-green-700">{stats.wins}</p>
        </div>
        
        <div className="bg-red-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600">Losses</p>
          <p className="text-2xl font-bold text-red-700">{stats.losses}</p>
        </div>
      </div>
    </div>
  );
}

export default GameStats; 