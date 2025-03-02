/**
 * Board Layout Utility
 * 
 * This module contains functions for generating the board layout.
 * It defines the positions of cells on the board and the paths for each player.
 */

// Constants for the board layout
export const BOARD_SIZE = 11; // 11x11 grid
export const CELL_TYPES = {
  NORMAL: 'normal',
  SAFE: 'safe',
  HOME: 'home',
  START: 'start',
  CENTER: 'center',
  EMPTY: 'empty',
};

// Define the starting positions for each player
export const STARTING_POSITIONS = {
  red: { row: 1, col: 5 },
  green: { row: 5, col: 9 },
  yellow: { row: 9, col: 5 },
  blue: { row: 5, col: 1 },
};

// Define the home positions for each player
export const HOME_POSITIONS = {
  red: [
    { row: 1, col: 1 },
    { row: 1, col: 2 },
    { row: 2, col: 1 },
    { row: 2, col: 2 },
  ],
  green: [
    { row: 1, col: 8 },
    { row: 1, col: 9 },
    { row: 2, col: 8 },
    { row: 2, col: 9 },
  ],
  yellow: [
    { row: 8, col: 8 },
    { row: 8, col: 9 },
    { row: 9, col: 8 },
    { row: 9, col: 9 },
  ],
  blue: [
    { row: 8, col: 1 },
    { row: 8, col: 2 },
    { row: 9, col: 1 },
    { row: 9, col: 2 },
  ],
};

// Define the home stretch paths for each player
export const HOME_STRETCH_PATHS = {
  red: [
    { row: 5, col: 1 },
    { row: 5, col: 2 },
    { row: 5, col: 3 },
    { row: 5, col: 4 },
    { row: 5, col: 5 },
  ],
  green: [
    { row: 1, col: 5 },
    { row: 2, col: 5 },
    { row: 3, col: 5 },
    { row: 4, col: 5 },
    { row: 5, col: 5 },
  ],
  yellow: [
    { row: 5, col: 9 },
    { row: 5, col: 8 },
    { row: 5, col: 7 },
    { row: 5, col: 6 },
    { row: 5, col: 5 },
  ],
  blue: [
    { row: 9, col: 5 },
    { row: 8, col: 5 },
    { row: 7, col: 5 },
    { row: 6, col: 5 },
    { row: 5, col: 5 },
  ],
};

// Define the safe cells on the board
export const SAFE_CELLS = [
  { row: 1, col: 5 }, // Top
  { row: 5, col: 9 }, // Right
  { row: 9, col: 5 }, // Bottom
  { row: 5, col: 1 }, // Left
  { row: 2, col: 2 }, // Top-left diagonal
  { row: 2, col: 8 }, // Top-right diagonal
  { row: 8, col: 8 }, // Bottom-right diagonal
  { row: 8, col: 2 }, // Bottom-left diagonal
];

// Define the main track positions (clockwise from top-left)
export const MAIN_TRACK = [
  // Top row (left to right, excluding center)
  ...[...Array(5).keys()].map(col => ({ row: 0, col })),
  ...[...Array(5).keys()].map(col => ({ row: 0, col: col + 6 })),
  
  // Right column (top to bottom, excluding center)
  ...[...Array(5).keys()].map(row => ({ row, col: 10 })),
  ...[...Array(5).keys()].map(row => ({ row: row + 6, col: 10 })),
  
  // Bottom row (right to left, excluding center)
  ...[...Array(5).keys()].map(col => ({ row: 10, col: 10 - col })),
  ...[...Array(5).keys()].map(col => ({ row: 10, col: 4 - col })),
  
  // Left column (bottom to top, excluding center)
  ...[...Array(5).keys()].map(row => ({ row: 10 - row, col: 0 })),
  ...[...Array(5).keys()].map(row => ({ row: 4 - row, col: 0 })),
];

// Define the starting indices on the main track for each player
export const STARTING_INDICES = {
  red: 0,      // Top-left
  green: 13,   // Top-right
  yellow: 26,  // Bottom-right
  blue: 39     // Bottom-left
};

/**
 * Generate the initial board layout
 * 
 * @returns {Array} 2D array representing the board layout
 */
export const generateBoardLayout = () => {
  // Create an empty board
  const board = Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(null));
  
  // Fill the board with empty cells
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      board[row][col] = {
        type: CELL_TYPES.EMPTY,
        color: null,
        position: { row, col },
      };
    }
  }
  
  // Define the main track (outer ring)
  const mainTrack = [];
  
  // Top row (left to right)
  for (let col = 0; col < BOARD_SIZE; col++) {
    if (col !== 5) {
      mainTrack.push({ row: 0, col });
    }
  }
  
  // Right column (top to bottom)
  for (let row = 0; row < BOARD_SIZE; row++) {
    if (row !== 5) {
      mainTrack.push({ row, col: BOARD_SIZE - 1 });
    }
  }
  
  // Bottom row (right to left)
  for (let col = BOARD_SIZE - 1; col >= 0; col--) {
    if (col !== 5) {
      mainTrack.push({ row: BOARD_SIZE - 1, col });
    }
  }
  
  // Left column (bottom to top)
  for (let row = BOARD_SIZE - 1; row >= 0; row--) {
    if (row !== 5) {
      mainTrack.push({ row, col: 0 });
    }
  }
  
  // Set the main track cells
  mainTrack.forEach(({ row, col }) => {
    board[row][col] = {
      type: CELL_TYPES.NORMAL,
      color: null,
      position: { row, col },
    };
  });
  
  // Set the safe cells
  SAFE_CELLS.forEach(({ row, col }) => {
    board[row][col] = {
      type: CELL_TYPES.SAFE,
      color: null,
      position: { row, col },
    };
  });
  
  // Set the starting positions
  Object.entries(STARTING_POSITIONS).forEach(([color, { row, col }]) => {
    board[row][col] = {
      type: CELL_TYPES.START,
      color,
      position: { row, col },
    };
  });
  
  // Set the home positions
  Object.entries(HOME_POSITIONS).forEach(([color, positions]) => {
    positions.forEach(({ row, col }) => {
      board[row][col] = {
        type: CELL_TYPES.HOME,
        color,
        position: { row, col },
      };
    });
  });
  
  // Set the home stretch paths
  Object.entries(HOME_STRETCH_PATHS).forEach(([color, path]) => {
    path.forEach(({ row, col }) => {
      board[row][col] = {
        type: CELL_TYPES.NORMAL,
        color,
        position: { row, col },
      };
    });
  });
  
  // Set the center cell
  board[5][5] = {
    type: CELL_TYPES.CENTER,
    color: null,
    position: { row: 5, col: 5 },
  };
  
  return board;
};

/**
 * Get the position on the board for a token
 * 
 * @param {string} player - The player color
 * @param {number|string} position - The token position
 * @returns {Object|null} The position on the board (row, col) or null if not on the board
 */
export const getTokenBoardPosition = (player, position) => {
  // If the token is in the starting position, return the starting position for the player
  if (position === 'start') {
    return STARTING_POSITIONS[player];
  }
  
  // If the token is in the home position, return one of the home positions for the player
  if (position === 'home') {
    // For simplicity, we'll just return the first home position
    // In a more advanced implementation, you might want to distribute tokens across home positions
    return HOME_POSITIONS[player][0];
  }
  
  // If the token is on the main track, calculate its position
  if (typeof position === 'number') {
    // If the position is in the home stretch
    if (position >= 52) {
      const homeStretchIndex = position - 52;
      if (homeStretchIndex < HOME_STRETCH_PATHS[player].length) {
        return HOME_STRETCH_PATHS[player][homeStretchIndex];
      }
      return null; // Beyond the home stretch
    }
    
    // Calculate the position on the main track
    const startingIndex = STARTING_INDICES[player];
    const mainTrackIndex = (startingIndex + position) % 52;
    return MAIN_TRACK[mainTrackIndex];
  }
  
  return null;
}; 