import React from 'react';
import Cell from './Cell';
import Token from './Token';
import { generateBoardLayout, CELL_TYPES, getTokenBoardPosition } from '../utils/boardLayout';
import { getValidMoves, PLAYERS } from '../game-logic/gameState';

/**
 * GameBoard Component
 * 
 * This component renders the Ludo game board.
 * It displays the board layout, safe zones, and token tracks.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.gameState - The current game state
 * @param {Function} props.onTokenSelect - Callback function called when a token is selected
 */
function GameBoard({ gameState, onTokenSelect }) {
  // Generate the board layout
  const boardLayout = generateBoardLayout();
  
  // Get valid moves for the current player
  const validMoves = getValidMoves(gameState);
  const currentPlayer = PLAYERS[gameState.currentPlayerIndex];
  
  // Create a map of tokens on the board
  const tokenMap = {};
  
  // Place tokens on the board based on their positions
  Object.entries(gameState.tokenPositions).forEach(([player, positions]) => {
    positions.forEach((position, tokenId) => {
      const boardPosition = getTokenBoardPosition(player, position);
      
      if (boardPosition) {
        const key = `${boardPosition.row}-${boardPosition.col}`;
        
        if (!tokenMap[key]) {
          tokenMap[key] = [];
        }
        
        // Check if this token is selectable (valid move)
        const isSelectable = player === currentPlayer && validMoves.includes(tokenId);
        
        // Create the token component
        tokenMap[key].push(
          <Token
            key={`${player}-${tokenId}`}
            color={player}
            id={tokenId}
            isHome={position === 'home'}
            isStart={position === 'start'}
            isSelectable={isSelectable}
            onSelect={() => onTokenSelect(tokenId)}
          />
        );
      }
    });
  });
  
  // Render a cell at the specified position
  const renderCell = (row, col) => {
    const cell = boardLayout[row][col];
    const key = `${row}-${col}`;
    
    // If the cell is empty, render nothing
    if (cell.type === CELL_TYPES.EMPTY) {
      return <div key={key} className="ludo-cell"></div>;
    }
    
    // Render the cell with its type, color, and tokens
    return (
      <div className="ludo-cell">
        <Cell
          key={key}
          type={cell.type}
          color={cell.color}
          tokens={tokenMap[key] || []}
        />
      </div>
    );
  };
  
  // Render the board grid
  const renderBoard = () => {
    const cells = [];
    
    for (let row = 0; row < boardLayout.length; row++) {
      for (let col = 0; col < boardLayout[row].length; col++) {
        cells.push(
          <div key={`${row}-${col}`} style={{ gridRow: row + 1, gridColumn: col + 1 }}>
            {renderCell(row, col)}
          </div>
        );
      }
    }
    
    return cells;
  };
  
  return (
    <div className="board-container">
      <div className="ludo-board bg-white rounded-lg shadow-xl p-2">
        {renderBoard()}
      </div>
    </div>
  );
}

export default GameBoard; 