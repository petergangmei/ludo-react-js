import React from 'react';
import Token from './Token';
import { PLAYERS } from '../game-logic/gameState';

/**
 * PlayerInfo Component
 * 
 * This component displays information about the current player and game status.
 * 
 * @param {Object} props - Component props
 * @param {string} props.currentPlayer - The current player's color
 * @param {boolean} props.isPlayerTurn - Whether it's the human player's turn
 * @param {Object} props.gameState - The current game state
 */
function PlayerInfo({ currentPlayer, isPlayerTurn, gameState }) {
  // Get player name with first letter capitalized
  const playerName = currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1);
  
  // Define color classes based on the player color
  const colorClasses = {
    red: 'bg-red-100 border-red-500 text-red-800',
    green: 'bg-green-100 border-green-500 text-green-800',
    yellow: 'bg-yellow-100 border-yellow-500 text-yellow-800',
    blue: 'bg-blue-100 border-blue-500 text-blue-800',
  };

  // Get token counts for all players
  const getTokenCounts = (player) => {
    const tokens = gameState.tokenPositions[player];
    if (!tokens) return { start: 0, board: 0, home: 0 };
    
    return {
      start: tokens.filter(pos => pos === 'start').length,
      board: tokens.filter(pos => typeof pos === 'number').length,
      home: tokens.filter(pos => pos === 'home').length,
    };
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className={`p-3 rounded-lg border-2 ${colorClasses[currentPlayer]} mb-3`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-2">
              <Token 
                color={currentPlayer} 
                id={0} 
                isHome={false} 
                isStart={false} 
                isSelectable={false} 
              />
            </div>
            <h3 className="text-lg font-semibold">{playerName}'s Turn</h3>
          </div>
          {gameState.status === 'finished' && (
            <div className="text-green-600 font-bold">
              {gameState.winner === 'red' ? 'You Win!' : `${gameState.winner.charAt(0).toUpperCase() + gameState.winner.slice(1)} Wins!`}
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {PLAYERS.map(player => {
          const counts = getTokenCounts(player);
          const isCurrentPlayer = player === currentPlayer;
          
          return (
            <div 
              key={player}
              className={`p-2 rounded border ${colorClasses[player]} ${isCurrentPlayer ? 'ring-2 ring-offset-1 ring-blue-400' : 'opacity-70'}`}
            >
              <div className="text-center text-sm font-medium mb-1">
                {player.charAt(0).toUpperCase() + player.slice(1)}
              </div>
              <div className="flex justify-around text-xs">
                <div className="text-center">
                  <div>Start</div>
                  <div className="font-bold">{counts.start}</div>
                </div>
                <div className="text-center">
                  <div>Board</div>
                  <div className="font-bold">{counts.board}</div>
                </div>
                <div className="text-center">
                  <div>Home</div>
                  <div className="font-bold">{counts.home}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlayerInfo; 