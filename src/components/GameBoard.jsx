import React from 'react';
import Cell from './Cell';
import Token from './Token';
import { generateBoardLayout, CELL_TYPES } from '../utils/boardLayout';

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
  
  // Render a cell at the specified position
  const renderCell = (row, col) => {
    const cell = boardLayout[row][col];
    
    // If the cell is empty, render nothing
    if (cell.type === CELL_TYPES.EMPTY) {
      return <div key={`${row}-${col}`} className="w-full h-full"></div>;
    }
    
    // Render the cell with its type and color
    return (
      <Cell
        key={`${row}-${col}`}
        type={cell.type}
        color={cell.color}
        tokens={[]} // TODO: Add tokens based on game state
      />
    );
  };
  
  // Render the board grid
  const renderBoard = () => {
    const rows = [];
    
    for (let row = 0; row < boardLayout.length; row++) {
      const cols = [];
      
      for (let col = 0; col < boardLayout[row].length; col++) {
        cols.push(
          <div key={`${row}-${col}`} className="w-full h-full">
            {renderCell(row, col)}
          </div>
        );
      }
      
      rows.push(
        <div key={row} className="flex w-full h-full">
          {cols}
        </div>
      );
    }
    
    return rows;
  };
  
  return (
    <div className="w-full max-w-2xl aspect-square bg-white rounded-lg shadow-xl p-4">
      <div className="w-full h-full grid grid-cols-11 grid-rows-11 gap-1">
        {renderBoard()}
      </div>
    </div>
  );
}

export default GameBoard; 