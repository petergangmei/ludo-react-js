import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GameBoard from './GameBoard';
import Dice from './Dice';
import PlayerInfo from './PlayerInfo';
import AnimationToggle from './AnimationToggle';
import { createInitialGameState, rollDice, getValidMoves, moveToken, PLAYERS, endTurn } from '../game-logic/gameState';
import { delayedAiMove } from '../game-logic/aiController';

/**
 * GameController Component
 * 
 * This component manages the game state and controls the flow of the game.
 * It handles turn switching, dice rolling, and token movement.
 */
function GameController() {
  // Initialize game state
  const [gameState, setGameState] = useState(createInitialGameState());
  const [validMoves, setValidMoves] = useState([]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  
  // Update valid moves when game state changes
  useEffect(() => {
    setValidMoves(getValidMoves(gameState));
    
    // Check if no valid moves are available after rolling
    if (gameState.diceRolled && getValidMoves(gameState).length === 0 && !gameState.tokenMoved) {
      // If no valid moves, end the turn after a short delay
      const timer = setTimeout(() => {
        setGameState(prevState => endTurn(prevState));
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [gameState]);
  
  // Handle AI turns
  useEffect(() => {
    const currentPlayer = PLAYERS[gameState.currentPlayerIndex];
    const isAiTurn = currentPlayer !== 'red'; // Assuming 'red' is the human player
    
    if (isAiTurn && !isAiThinking && gameState.status !== 'finished') {
      // Set AI thinking state to prevent multiple AI moves
      setIsAiThinking(true);
      
      // First, roll the dice if not rolled yet
      if (!gameState.diceRolled) {
        setTimeout(() => {
          setGameState(prevState => rollDice(prevState));
          setIsAiThinking(false);
        }, 1000);
        return;
      }
      
      // Then make a move if possible
      if (gameState.diceRolled && !gameState.tokenMoved) {
        // Make AI move after a delay
        delayedAiMove(gameState, setGameState, 1000).then(() => {
          setIsAiThinking(false);
        });
      } else if (gameState.diceRolled && gameState.tokenMoved && gameState.extraTurn) {
        // If AI got an extra turn, roll again
        setTimeout(() => {
          setGameState(prevState => rollDice(prevState));
          setIsAiThinking(false);
        }, 1000);
      } else {
        // AI turn is complete
        setIsAiThinking(false);
      }
    }
  }, [gameState, isAiThinking]);
  
  // Handle dice roll
  const handleDiceRoll = () => {
    if (canRollDice) {
      setGameState(prevState => rollDice(prevState));
    }
  };
  
  // Handle token selection
  const handleTokenSelect = (tokenIndex) => {
    if (validMoves.includes(tokenIndex)) {
      setGameState(prevState => moveToken(prevState, tokenIndex));
    }
  };
  
  // Get the current player color
  const currentPlayer = PLAYERS[gameState.currentPlayerIndex];
  
  // Determine if it's the human player's turn
  const isPlayerTurn = currentPlayer === 'red'; // Assuming 'red' is the human player
  
  // Determine if the dice can be rolled
  const canRollDice = isPlayerTurn && !isAiThinking && (!gameState.diceRolled || (gameState.extraTurn && gameState.tokenMoved));
  
  // Render the game log
  const renderGameLog = () => {
    return gameState.log.map((message, index) => (
      <div key={index} className="py-1 border-b border-gray-200 last:border-0">
        {message}
      </div>
    ));
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Game board and controls */}
        <div className="flex-1">
          <div className="mb-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-800">Ludo King</h1>
            <div className="flex space-x-2">
              <AnimationToggle />
              <Link to="/" className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                Home
              </Link>
            </div>
          </div>
          
          <GameBoard 
            gameState={gameState} 
            onTokenSelect={handleTokenSelect} 
          />
          
          <div className="mt-4 flex justify-between items-center">
            <PlayerInfo 
              currentPlayer={currentPlayer}
              isPlayerTurn={isPlayerTurn}
              gameState={gameState}
            />
            
            <Dice 
              value={gameState.diceValue} 
              canRoll={canRollDice}
              onRoll={handleDiceRoll}
              isRolling={gameState.isRolling}
              disabled={!canRollDice || isAiThinking}
            />
          </div>
        </div>
        
        {/* Game log */}
        <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2 text-blue-800">Game Log</h2>
          <div className="h-64 overflow-y-auto">
            {renderGameLog()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameController; 