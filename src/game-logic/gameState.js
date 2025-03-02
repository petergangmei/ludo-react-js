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
    
    // Game log for displaying messages
    log: [],
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
  
  // Add a log message
  const currentPlayer = PLAYERS[gameState.currentPlayerIndex];
  const log = [
    ...gameState.log,
    `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)} rolled a ${diceValue}${extraTurn ? ' and gets an extra turn!' : '.'}`
  ];
  
  return {
    ...gameState,
    diceValue,
    diceRolled: true,
    extraTurn,
    tokenMoved: false, // Reset tokenMoved flag
    log,
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
 * Check if a token would capture an opponent's token
 * 
 * @param {Object} gameState - The current game state
 * @param {string} player - The player color
 * @param {number} position - The position on the board
 * @returns {Array} Array of [player, tokenIndex] pairs that would be captured
 */
export const checkForCaptures = (gameState, player, position) => {
  const captures = [];
  
  // Only check for captures on the main track (not in home stretches)
  if (position >= 0 && position < BOARD_SIZE) {
    // Check each player's tokens
    Object.entries(gameState.tokenPositions).forEach(([otherPlayer, tokens]) => {
      // Skip the current player's tokens
      if (otherPlayer !== player) {
        // Check each token
        tokens.forEach((tokenPosition, tokenIndex) => {
          // If the token is on the main track and at the same position
          if (typeof tokenPosition === 'number' && tokenPosition === position) {
            captures.push([otherPlayer, tokenIndex]);
          }
        });
      }
    });
  }
  
  return captures;
};

/**
 * Update game statistics in localStorage
 * 
 * @param {string} winner - The color of the winning player
 */
export const updateGameStats = (winner) => {
  // Get existing stats from localStorage or initialize if not present
  let stats = JSON.parse(localStorage.getItem('ludoGameStats')) || {
    gamesPlayed: 0,
    wins: 0,
    losses: 0
  };
  
  // Update stats based on winner
  stats.gamesPlayed += 1;
  
  if (winner === 'red') { // Assuming 'red' is the human player
    stats.wins += 1;
  } else {
    stats.losses += 1;
  }
  
  // Save updated stats to localStorage
  localStorage.setItem('ludoGameStats', JSON.stringify(stats));
  
  return stats;
};

/**
 * Check if a player has won the game
 * 
 * @param {Object} gameState - The current game state
 * @returns {Object} The updated game state with winner information
 */
export const checkWinner = (gameState) => {
  // Check if any player has all tokens in the home position
  for (const player of PLAYERS) {
    const playerTokens = gameState.tokenPositions[player];
    const allTokensHome = playerTokens.every(pos => pos === 'home');
    
    if (allTokensHome) {
      // Update game statistics
      updateGameStats(player);
      
      // Add a log message
      const log = [
        ...gameState.log,
        `${player.charAt(0).toUpperCase() + player.slice(1)} has won the game!`
      ];
      
      return {
        ...gameState,
        status: 'finished',
        winner: player,
        log,
      };
    }
  }
  
  return gameState;
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
  
  // Check for captures
  let updatedTokenPositions = { ...tokenPositions, [currentPlayer]: currentTokens };
  let log = [...gameState.log];
  
  if (typeof newPosition === 'number') {
    const captures = checkForCaptures(gameState, currentPlayer, newPosition);
    
    // Process captures
    captures.forEach(([capturedPlayer, capturedTokenIndex]) => {
      // Send the captured token back to start
      updatedTokenPositions = {
        ...updatedTokenPositions,
        [capturedPlayer]: [
          ...updatedTokenPositions[capturedPlayer].slice(0, capturedTokenIndex),
          'start',
          ...updatedTokenPositions[capturedPlayer].slice(capturedTokenIndex + 1)
        ]
      };
      
      // Add a log message
      log.push(`${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)} captured ${capturedPlayer}'s token!`);
    });
  }
  
  // Add a log message for the move
  log.push(`${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)} moved token ${tokenIndex + 1}${newPosition === 'home' ? ' to home!' : '.'}`);
  
  // Create updated game state with the new token positions and log
  let updatedGameState = {
    ...gameState,
    tokenPositions: updatedTokenPositions,
    tokenMoved: true,
    log,
  };
  
  // Check if the player has won
  updatedGameState = checkWinner(updatedGameState);
  
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
  const nextPlayer = PLAYERS[nextPlayerIndex];
  
  // Add a log message
  const log = [
    ...gameState.log,
    `It's ${nextPlayer.charAt(0).toUpperCase() + nextPlayer.slice(1)}'s turn.`
  ];
  
  // Limit the log to the last 10 messages
  const limitedLog = log.slice(-10);
  
  return {
    ...gameState,
    currentPlayerIndex: nextPlayerIndex,
    diceValue: null,
    diceRolled: false,
    tokenMoved: false,
    extraTurn: false,
    log: limitedLog,
  };
}; 