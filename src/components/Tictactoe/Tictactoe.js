import React, { useState, useEffect } from 'react';
import './Tictactoe.css';
import O from '../assets/O.png';
import X from '../assets/X.png';
import {
  initializeBoard,
  applyMove,
  checkWin,
  checkDraw,
  bestMove
} from './Tictactoelogic.js';

const Tictactoe = () => {
  const [board, setBoard] = useState(initializeBoard());
  const [isHumanTurn, setIsHumanTurn] = useState(false);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    
    const firstMove = Math.random() < 0.5 ? 'AI' : 'Human';
    if (firstMove === 'AI') {
      const aiMove = bestMove(board);
      if (aiMove) {
        applyMove(board, aiMove[0], aiMove[1], 1);
        setBoard([...board]);
      }
      setIsHumanTurn(true);
    } else {
      setIsHumanTurn(true);
    }
  }, []);

  const handleCellClick = (x, y) => {
    if (!isHumanTurn || winner || !applyMove(board, x, y, -1)) return;

    setBoard([...board]);
    if (checkWin(board, -1)) {
      setWinner('Human');
    } else if (checkDraw(board)) {
      setWinner('Draw');
    } else {
      setIsHumanTurn(false);
      setTimeout(() => {
        const aiMove = bestMove(board);
        if (aiMove) {
          applyMove(board, aiMove[0], aiMove[1], 1);
          setBoard([...board]);
        }
        if (checkWin(board, 1)) {
          setWinner('AI');
        } else if (checkDraw(board)) {
          setWinner('Draw');
        } else {
          setIsHumanTurn(true);
        }
      }, 500);
    }
  };

  const handleReset = () => {
    const newBoard = initializeBoard();
    setBoard(newBoard);
    setIsHumanTurn(false);
    setWinner(null);
    const firstMove = Math.random() < 0.5 ? 'AI' : 'Human';
    if (firstMove === 'AI') {
      const aiMove = bestMove(newBoard);
      if (aiMove) {
        applyMove(newBoard, aiMove[0], aiMove[1], 1);
        setBoard([...newBoard]);
      }
      setIsHumanTurn(true);
    } else {
      setIsHumanTurn(true);
    }
  };

  return (
    <div className='container'>
      <h1 className='title'>
        {winner ? `Winner: ${winner}` : `Turn: ${isHumanTurn ? 'Human' : 'AI'}`}
      </h1>
      <div className='board'>
        {board.flatMap((row, i) =>
          row.map((cell, j) => (
            <div key={`${i}-${j}`} className="boxes" onClick={() => handleCellClick(i, j)}>
              {cell === 1 && <img src={X} alt="X" />}
              {cell === -1 && <img src={O} alt="O" />}
            </div>
          ))
        )}
      </div>
      <button className='reset' onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Tictactoe;
