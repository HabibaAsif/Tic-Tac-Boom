import React, { useState, useEffect } from 'react';
import './Tictactoeextreme.css';
import O from '../assets/O.png';
import X from '../assets/X.png';
import {
  initializeBoard,
  applyMove,
  checkWin,
  checkDraw,
  bestMove,
  checkLargeBoardWin,
  checkLargeBoardDraw
} from './Tictactoeextremelogic.js';

const Tictactoeextreme = () => {
  const [board, setBoard] = useState(initializeBoard());
  const [closedGrids, setClosedGrids] = useState(Array(3).fill().map(() => Array(3).fill(false)));
  const [activeGrid, setActiveGrid] = useState([-1, -1]); 
  const [isHumanTurn, setIsHumanTurn] = useState(false);
  const [winner, setWinner] = useState(null);
  const [resetting, setResetting] = useState(false);
  const [winningGrids, setWinningGrids] = useState(Array(3).fill().map(() => Array(3).fill(null)));

  useEffect(() => {
    const firstMove = Math.random() < 0.5 ? 'AI' : 'Human';
    setIsHumanTurn(firstMove === 'Human');
    if (firstMove === 'AI') {
      setTimeout(aiMove, 500); 
    }
  }, []);

  const aiMove = () => {
    if (resetting || winner) return;
  
    let [nextX, nextY] = activeGrid;
    if (nextX === -1 && nextY === -1) {
      const openGrids = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (!closedGrids[i][j]) openGrids.push([i, j]);
        }
      }
      if (openGrids.length === 0) return;
      [nextX, nextY] = openGrids[Math.floor(Math.random() * openGrids.length)];
      setActiveGrid([nextX, nextY]);
    }
  
    const grid = board[nextX][nextY];
  
 
    if (closedGrids[nextX][nextY]) return;
  
    if (!grid) return;
  
    const move = bestMove(grid);
    if (move) {
      const [i, j] = move;
      applyMove(grid, i, j, 1);
      const newBoard = board.map(row => row.map(grid => [...grid]));
  
      
      if (checkWin(grid, 1)) {
        setClosedGrids(prev => {
          const newClosedGrids = prev.map(row => [...row]);
          newClosedGrids[nextX][nextY] = true;
          return newClosedGrids;
        });
        setWinningGrids(prev => {
          const newWinningGrids = prev.map(row => [...row]);
          newWinningGrids[nextX][nextY] = 1;
          return newWinningGrids;
        });
      } else if (checkDraw(grid)) {
        setClosedGrids(prev => {
          const newClosedGrids = prev.map(row => [...row]);
          newClosedGrids[nextX][nextY] = true;
          return newClosedGrids;
        });
      }
  
      if (checkLargeBoardWin(newBoard, 1)) {
        setWinner('AI');
      } else if (checkLargeBoardDraw(newBoard)) {
        setWinner('Draw');
      } else {
        setActiveGrid([i, j]); 
      }
      setBoard(newBoard);
      setIsHumanTurn(true);
    } else {
    
      const openGrids = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (!closedGrids[i][j]) openGrids.push([i, j]);
        }
      }
      if (openGrids.length === 0) return;
      [nextX, nextY] = openGrids[Math.floor(Math.random() * openGrids.length)];
      setActiveGrid([nextX, nextY]);
    }
  };
  
 const handleCellClick = (x, y, i, j) => {
  if (!isHumanTurn || winner || resetting || (closedGrids[x][y] && !(x === activeGrid[0] && y === activeGrid[1]))) {
   
    return;
  }

 
  if ((activeGrid[0] === -1 && activeGrid[1] === -1) || closedGrids[activeGrid[0]][activeGrid[1]]) {
    setActiveGrid([x, y]);
  } else {
   
    if (x !== activeGrid[0] || y !== activeGrid[1]) return;
  }

  if (!applyMove(board[x][y], i, j, -1)) return;

  const newBoard = board.map((row, rowIndex) =>
    row.map((grid, colIndex) => {
      if (rowIndex === x && colIndex === y) {
        return grid.map((cellRow, cellRowIndex) =>
          cellRow.map((cell, cellColIndex) => (cellRowIndex === i && cellColIndex === j ? -1 : cell))
        );
      }
      return grid;
    })
  );
  const nextGrid = newBoard[i][j];
  setBoard(newBoard);

  if (checkWin(nextGrid, -1)) {
    setClosedGrids(prev => {
      const newClosedGrids = prev.map(row => [...row]);
      newClosedGrids[i][j] = true;
      return newClosedGrids;
    });
    setWinningGrids(prev => {
      const newWinningGrids = prev.map(row => [...row]);
      newWinningGrids[i][j] = -1;
      return newWinningGrids;
    });
    if (checkLargeBoardWin(newBoard, -1)) {
      setWinner('Human');
      return;
    }
  } else if (checkDraw(nextGrid)) {
    setClosedGrids(prev => {
      const newClosedGrids = prev.map(row => [...row]);
      newClosedGrids[i][j] = true;
      return newClosedGrids;
    });
  }

 
  setActiveGrid([i, j]);
  setIsHumanTurn(false);
  setTimeout(aiMove, 500);
};

  
  const handleReset = () => {
    setResetting(true);

    const newBoard = initializeBoard();
    setBoard(newBoard);
    setClosedGrids(Array(3).fill().map(() => Array(3).fill(false)));
    setActiveGrid([-1, -1]); 
    setWinner(null);
    setWinningGrids(Array(3).fill().map(() => Array(3).fill(null)));

    const firstMove = Math.random() < 0.5 ? 'AI' : 'Human';
    setIsHumanTurn(firstMove === 'Human');

    setTimeout(() => {
      setResetting(false);
      if (firstMove === 'AI') {
        aiMove();
      }
    }, 500);
  };

  return (
    <div className="container">
      <div className='rulesbox'>
      <div className='rules'>
        <h6 className='rulestitle'>Rules To Play</h6>
        <p className='rulestext'>
        ➤ If user's turn is first, then start from 1st grid.<br/>
        ➤ The user has to place the moves in the corresponding position of the small grid move in the big grid.<br/>
        ➤ The AI is allowed to make move in any position.<br/>
        ➤ Win small grids to mark one cell of the big grid.<br/>
        ➤ Win 3 small grids to mark the big grid by the rules of classic tic tac toe.<br/>
        ➤ Win the big grid by the rules of classic tis tac toe<br/>
        "If the AI plays multiple turns, then refresh the game"</p>
      </div>
      </div>
      <h1 className="title">
        {winner
          ? winner === 'Draw'
            ? 'It\'s a draw!'
            : `${winner} wins!`
          : `Turn: ${isHumanTurn ? 'Human' : 'AI'}`}
      </h1>
      <div className={`large-grid ${isHumanTurn ? '' : 'not-allowed'}`}>
        <div className="horizontal-line1"></div>
        <div className="horizontal-line2"></div>
        <div className="vertical-line1"></div>
        <div className="vertical-line2"></div>
        {board.map((row, rowIndex) =>
          row.map((grid, colIndex) => (
            <div className={`small-grid ${activeGrid[0] === rowIndex && activeGrid[1] === colIndex ? 'active' : ''}`} key={`${rowIndex}-${colIndex}`}>
              {winningGrids[rowIndex][colIndex] && (
                <div className="winning-symbol">
                  <img src={winningGrids[rowIndex][colIndex] === 1 ? X : O} alt={winningGrids[rowIndex][colIndex] === 1 ? 'X' : 'O'} />
                </div>
              )}
              {grid.map((cellRow, cellRowIndex) =>
                cellRow.map((cell, cellColIndex) => (
                  <div
                    className={`cell ${closedGrids[rowIndex][colIndex] ? 'closed' : ''}`}
                    key={`${cellRowIndex}-${cellColIndex}`}
                    onClick={() => handleCellClick(rowIndex, colIndex, cellRowIndex, cellColIndex)}
                  >
                    {cell === 1 && <img src={X} alt="X" />}
                    {cell === -1 && <img src={O} alt="O" />}
                  </div>
                ))
              )}
            </div>
          ))
        )}
      </div>
      <button className="reset" onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Tictactoeextreme;
