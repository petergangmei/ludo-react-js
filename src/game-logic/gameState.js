/**
 * Game State Module
 * 
 * This module contains functions for managing the game state.
 * It handles player turns, token movement, and game rules.
 */

// Constants for the game
export const PLAYERS = ['red', 'green', 'yellow', 'blue'];
export const TOKENS_PER_PLAYER = 4;
export const BOARD_SIZE = 52; // Number of cells in the main track
export const HOME_STRETCH_SIZE = 6; // Number of cells in the home stretch

// Initial game state
export const createInitialGameState = () => {
  return {
    // Current player index (0-3)
    currentPlayerIndex: 0,
    
    // Current dice value (1-6)
    diceValue: null,
    
    // Whether the dice has been rolled this turn
    diceRolled: false,
    
    // Whether a token has been moved this turn
    tokenMoved: false,
    
    // Whether the current player gets an extra turn (rolled a 6)
    extraTurn: false,
    
    // Token positions for each player
    // Each token can be in one of these states:
    // - 'home': In the home position (finished)
    // - 'start': In the starting position (not on the board yet)
    // - number: Position on the board (0-51 for main track, 52-57 for home stretch)
    tokenPositions: {
      red: Array(TOKENS_PER_PLAYER).fill('start'),
      green: Array(TOKENS_PER_PLAYER).fill('start'),
      yellow: Array(TOKENS_PER_PLAYER).fill('start'),
      blue: Array(TOKENS_PER_PLAYER).fill('start'),
    },
    
    // Game status
    status: 'playing', // 'playing', 'finished'
    
    // Winner (if the game is finished)
    winner: null,
  };
};

/**
 * Roll the dice and update the game state
 * 
 * @param {Object} gameState - The current game state
 * @returns {Object} The updated game state
 */
export const rollDice = (gameState) => {
  // Can only roll the dice once per turn (unless an extra turn was earned)
  if (gameState.diceRolled && !gameState.extraTurn) {
    return gameState;
  }
  
  // Roll the dice
  const diceValue = Math.floor(Math.random() * 6) + 1;
  
  // Check if the player gets an extra turn (rolled a 6)
  const extraTurn = diceValue === 6;
  
  return {
    ...gameState,
    diceValue,
    diceRolled: true,
    extraTurn,
    tokenMoved: false, // Reset tokenMoved flag
  };
};

/**
 * Get the valid moves for the current player
 * 
 * @param {Object} gameState - The current game state
 * @returns {Array} Array of valid token indices that can be moved
 */
export const getValidMoves = (gameState) => {
  const { currentPlayerIndex, diceValue, diceRolled, tokenMoved, tokenPositions } = gameState;
  const currentPlayer = PLAYERS[currentPlayerIndex];
  const currentTokens = tokenPositions[currentPlayer];
  
  // If the dice hasn't been rolled or a token has already been moved (and no extra turn),
  // there are no valid moves
  if (!diceRolled || (tokenMoved && !gameState.extraTurn)) {
    return [];
  }
  
  // Get valid token indices that can be moved
  return currentTokens.map((position, index) => {
    // If the token is in the starting position, it can only move if a 6 is rolled
    if (position === 'start' && diceValue === 6) {
      return index;
    }
    
    // If the token is already on the board, it can move
    if (position !== 'start' && position !== 'home') {
      // Check if the move would take the token beyond the home stretch
      if (typeof position === 'number') {
        const newPosition = position + diceValue;
        if (newPosition < BOARD_SIZE + HOME_STRETCH_SIZE) {
          return index;
        }
      }
    }
    
    // This token can't move
    return null;
  }).filter(index => index !== null);
};

/**
 * Move a token and update the game state
 * 
 * @param {Object} gameState - The current game state
 * @param {number} tokenIndex - The index of the token to move
 * @returns {Object} The updated game state
 */
export const moveToken = (gameState, tokenIndex) => {
  const { currentPlayerIndex, diceValue, tokenPositions } = gameState;
  const currentPlayer = PLAYERS[currentPlayerIndex];
  const currentTokens = [...tokenPositions[currentPlayer]];
  const position = currentTokens[tokenIndex];
  
  // Calculate the new position
  let newPosition;
  if (position === 'start') {
    // If the token is in the starting position, move it to the first position on the board
    newPosition = 0;
  } else if (typeof position === 'number') {
    // If the token is already on the board, move it forward
    newPosition = position + diceValue;
    
    // Check if the token has reached home
    if (newPosition >= BOARD_SIZE + HOME_STRETCH_SIZE - 1) {
      newPosition = 'home';
    }
  } else {
    // The token can't move (already home)
    return gameState;
  }
  
  // Update the token position
  currentTokens[tokenIndex] = newPosition;
  
  // Check if the player has won (all tokens are home)
  const hasWon = currentTokens.every(pos => pos === 'home');
  
  // Update the game state
  const updatedGameState = {
    ...gameState,
    tokenPositions: {
      ...tokenPositions,
      [currentPlayer]: currentTokens,
    },
    tokenMoved: true,
    status: hasWon ? 'finished' : gameState.status,
    winner: hasWon ? currentPlayer : gameState.winner,
  };
  
  // If the player didn't roll a 6 or has already moved a token after rolling a 6,
  // move to the next player's turn
  if (!gameState.extraTurn || (gameState.extraTurn && gameState.tokenMoved)) {
    return endTurn(updatedGameState);
  }
  
  return updatedGameState;
};

/**
 * End the current player's turn and move to the next player
 * 
 * @param {Object} gameState - The current game state
 * @returns {Object} The updated game state
 */
export const endTurn = (gameState) => {
  // If the game is finished, don't change the player
  if (gameState.status === 'finished') {
    return gameState;
  }
  
  // Move to the next player
  const nextPlayerIndex = (gameState.currentPlayerIndex + 1) % PLAYERS.length;
  
  return {
    ...gameState,
    currentPlayerIndex: nextPlayerIndex,
    diceValue: null,
    diceRolled: false,
    tokenMoved: false,
    extraTurn: false,
  };
}; 