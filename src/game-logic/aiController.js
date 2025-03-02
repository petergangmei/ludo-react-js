/**
 * AI Controller Module
 * 
 * This module contains functions for controlling AI players.
 * It implements basic decision-making logic for AI moves.
 */

import { getValidMoves, moveToken, rollDice } from './gameState';

/**
 * Make an AI move
 * 
 * This function decides which token to move for an AI player.
 * It implements a simple strategy:
 * 1. Roll the dice
 * 2. If there are valid moves, choose one based on a simple heuristic
 * 3. Return the updated game state
 * 
 * @param {Object} gameState - The current game state
 * @returns {Object} The updated game state after the AI move
 */
export const makeAiMove = (gameState) => {
  // Roll the dice
  const stateAfterRoll = rollDice(gameState);
  
  // Get valid moves
  const validMoves = getValidMoves(stateAfterRoll);
  
  // If there are no valid moves, end the turn
  if (validMoves.length === 0) {
    return {
      ...stateAfterRoll,
      diceRolled: true,
      tokenMoved: true, // Force the turn to end
    };
  }
  
  // Choose a token to move based on a simple heuristic
  const tokenIndex = chooseTokenToMove(stateAfterRoll, validMoves);
  
  // Move the chosen token
  return moveToken(stateAfterRoll, tokenIndex);
};

/**
 * Choose a token to move based on a simple heuristic
 * 
 * This function implements a simple strategy for choosing which token to move:
 * 1. Prefer tokens that are already on the board
 * 2. Prefer tokens that are closer to home
 * 3. If all else is equal, choose randomly
 * 
 * @param {Object} gameState - The current game state
 * @param {Array} validMoves - Array of valid token indices that can be moved
 * @returns {number} The index of the token to move
 */
const chooseTokenToMove = (gameState, validMoves) => {
  const { currentPlayerIndex, tokenPositions } = gameState;
  const currentPlayer = ['red', 'green', 'yellow', 'blue'][currentPlayerIndex];
  const currentTokens = tokenPositions[currentPlayer];
  
  // If there's only one valid move, choose it
  if (validMoves.length === 1) {
    return validMoves[0];
  }
  
  // Prefer tokens that are already on the board
  const tokensOnBoard = validMoves.filter(index => 
    typeof currentTokens[index] === 'number'
  );
  
  if (tokensOnBoard.length > 0) {
    // Prefer tokens that are closer to home (higher position value)
    return tokensOnBoard.reduce((bestIndex, currentIndex) => {
      const bestPosition = currentTokens[bestIndex];
      const currentPosition = currentTokens[currentIndex];
      return currentPosition > bestPosition ? currentIndex : bestIndex;
    }, tokensOnBoard[0]);
  }
  
  // If no tokens are on the board, choose randomly
  return validMoves[Math.floor(Math.random() * validMoves.length)];
};

/**
 * Delay the AI move to simulate thinking
 * 
 * @param {Object} gameState - The current game state
 * @param {Function} updateGameState - Function to update the game state
 * @param {number} delay - Delay in milliseconds
 * @returns {Promise} A promise that resolves when the AI move is made
 */
export const delayedAiMove = (gameState, updateGameState, delay = 1000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const newGameState = makeAiMove(gameState);
      updateGameState(newGameState);
      resolve(newGameState);
    }, delay);
  });
}; 