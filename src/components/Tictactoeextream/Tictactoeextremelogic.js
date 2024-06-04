
export const initializeGrid = () => {
  return Array(3).fill().map(() => Array(3).fill(0));
};


export const initializeBoard = () => {
  return Array(3).fill().map(() => Array(3).fill().map(() => initializeGrid()));
};


const emptyCells = (grid) => {
  const cells = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i][j] === 0) cells.push([i, j]);
    }
  }
  return cells;
};


const validMove = (grid, x, y) => {
  return 0 <= x && x < 3 && 0 <= y && y < 3 && grid[x][y] === 0;
};


const applyMove = (grid, x, y, player) => {
  if (validMove(grid, x, y)) {
    grid[x][y] = player;
    return true;
  }
  return false;
};


const checkWin = (grid, player) => {
  for (let i = 0; i < 3; i++) {
    if (grid[i].every(cell => cell === player) || grid.every(row => row[i] === player)) {
     
      return true;
    }
  }
  if (grid[0][0] === player && grid[1][1] === player && grid[2][2] === player) {
    return true;
  }
  if (grid[0][2] === player && grid[1][1] === player && grid[2][0] === player) {
    return true;
  }
  return false;
};


const checkDraw = (grid) => {
  return grid.flat().every(cell => cell !== 0);
};


const minimax = (grid, depth, isMaximizing, alpha, beta) => {
  if (checkWin(grid, 1)) return 1;
  if (checkWin(grid, -1)) return -1;
  if (checkDraw(grid)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const [i, j] of emptyCells(grid)) {
      grid[i][j] = 1;
      const score = minimax(grid, depth + 1, false, alpha, beta);
      grid[i][j] = 0;
      bestScore = Math.max(bestScore, score);
      alpha = Math.max(alpha, score);
      if (beta <= alpha) break;
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (const [i, j] of emptyCells(grid)) {
      grid[i][j] = -1;
      const score = minimax(grid, depth + 1, true, alpha, beta);
      grid[i][j] = 0;
      bestScore = Math.min(bestScore, score);
      beta = Math.min(beta, score);
      if (beta <= alpha) break;
    }
    return bestScore;
  }
};


const bestMove = (grid) => {
  let bestScore = -Infinity;
  let move = null;
  for (const [i, j] of emptyCells(grid)) {
    grid[i][j] = 1;
    const score = minimax(grid, 0, false, -Infinity, Infinity);
    grid[i][j] = 0;
    if (score > bestScore) {
      bestScore = score;
      move = [i, j];
    }
  }
  return move;
};


const checkLargeBoardWin = (board, player) => {
  for (let i = 0; i < 3; i++) {
    if (board[i].every(grid => checkWin(grid, player)) || board.every(row => checkWin(row[i], player))) {
      return true;
    }
  }
  if ([0, 1, 2].every(i => checkWin(board[i][i], player)) || [0, 1, 2].every(i => checkWin(board[i][2 - i], player))) {
    return true;
  }
  return false;
};


const checkLargeBoardDraw = (board) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!(checkWin(board[i][j], 1) || checkWin(board[i][j], -1) || checkDraw(board[i][j]))) {
        return false;
      }
    }
  }
  return true;
};

export {
 
  emptyCells,
  validMove,
  applyMove,
  checkWin,
  checkDraw,
  minimax,
  bestMove,
  checkLargeBoardWin,
  checkLargeBoardDraw
};
