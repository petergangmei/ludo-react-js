import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GameBoard from './GameBoard';
import Dice from './Dice';
import PlayerInfo from './PlayerInfo';
import SoundToggle from './SoundToggle';
import AnimationToggle from './AnimationToggle';
import { createInitialGameState, rollDice, getValidMoves, moveToken, PLAYERS } from '../game-logic/gameState';
import { delayedAiMove } from '../game-logic/aiController';
import { playSound, preloadSounds } from '../utils/soundEffects';

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
  
  // Preload sounds when component mounts
  useEffect(() => {
    preloadSounds();
  }, []);
  
  // Update valid moves when game state changes
  useEffect(() => {
    setValidMoves(getValidMoves(gameState));
  }, [gameState]);
  
  // Handle AI turns
  useEffect(() => {
    const currentPlayer = PLAYERS[gameState.currentPlayerIndex];
    const isAiTurn = currentPlayer !== 'red'; // Assuming 'red' is the human player
    
    if (isAiTurn && !isAiThinking && gameState.status !== 'finished') {
      // Set AI thinking state to prevent multiple AI moves
      setIsAiThinking(true);
      
      // Make AI move after a delay
      delayedAiMove(gameState, setGameState, 1000).then(() => {
        setIsAiThinking(false);
      });
    }
  }, [gameState, isAiThinking]);
  
  // Play sounds when game state changes
  useEffect(() => {
    // Check if this is the initial render
    if (gameState.log.length > 0) {
      const lastLogMessage = gameState.log[gameState.log.length - 1];
      
      // Play sound based on the last log message
      if (lastLogMessage.includes('rolled')) {
        playSound('diceRoll');
      } else if (lastLogMessage.includes('captured')) {
        playSound('tokenCapture');
      } else if (lastLogMessage.includes('to home')) {
        playSound('tokenHome');
      } else if (lastLogMessage.includes('moved token')) {
        playSound('tokenMove');
      } else if (lastLogMessage.includes('has won the game')) {
        if (lastLogMessage.includes('Red has won')) {
          playSound('gameWin');
        } else {
          playSound('gameLose');
        }
      }
    }
  }, [gameState.log]);
  
  // Handle dice roll
  const handleDiceRoll = (value) => {
    playSound('buttonClick');
    setGameState(prevState => rollDice(prevState));
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
  const canRollDice = isPlayerTurn && (!gameState.diceRolled || (gameState.extraTurn && gameState.tokenMoved));
  
  // Render the game log
  const renderGameLog = () => {
    return gameState.log.map((message, index) => (
      <div key={index} className="py-1 border-b border-gray-200 last:border-0">
        {message}
      </div>
    ));
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        {/* Game Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800">Ludo King</h1>
          <div className="flex items-center gap-4">
            <SoundToggle />
            <AnimationToggle />
            <Link to="/">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-3/4">
            {/* Game Status */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex justify-between items-center">
                <p className="text-xl font-semibold text-blue-700">
                  {isPlayerTurn ? 'Your Turn' : `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}'s Turn`}
                  {isAiThinking && ' (Thinking...)'}
                </p>
                
                {gameState.diceValue && (
                  <div className="flex items-center">
                    <p className="mr-4 text-lg font-medium">Dice: {gameState.diceValue}</p>
                    <Dice 
                      onRoll={handleDiceRoll} 
                      disabled={!canRollDice || isAiThinking}
                    />
                  </div>
                )}
                
                {!gameState.diceValue && (
                  <Dice 
                    onRoll={handleDiceRoll} 
                    disabled={!canRollDice || isAiThinking}
                  />
                )}
              </div>
              
              {gameState.status === 'finished' && (
                <p className="mt-4 text-center text-2xl font-bold text-green-600">
                  {gameState.winner === 'red' ? 'You Win!' : `${gameState.winner.charAt(0).toUpperCase() + gameState.winner.slice(1)} Wins!`}
                </p>
              )}
            </div>
            
            {/* Player Info Section */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {PLAYERS.map((color) => (
                <PlayerInfo 
                  key={color}
                  color={color}
                  tokens={gameState.tokenPositions[color]}
                  isCurrentPlayer={color === currentPlayer}
                />
              ))}
            </div>
            
            {/* Game Board */}
            <GameBoard 
              gameState={gameState}
              onTokenSelect={handleTokenSelect}
            />
            
            {/* Game Controls */}
            <div className="mt-6 flex justify-center">
              <button 
                className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg text-lg ${(!canRollDice || isAiThinking) ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => handleDiceRoll()}
                disabled={!canRollDice || isAiThinking}
              >
                Roll Dice
              </button>
            </div>
          </div>
          
          {/* Game Log */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-4 h-full">
              <h2 className="text-lg font-semibold text-blue-700 mb-2">Game Log</h2>
              <div className="overflow-y-auto max-h-96">
                {renderGameLog()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameController; 