export const initializeBoard = () => {
    return Array(3).fill().map(() => Array(3).fill(0));
  };
  
  export const emptyCells = (board) => {
    const cells = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === 0) cells.push([i, j]);
      }
    }
    return cells;
  };
  
  export const validMove = (board, x, y) => {
    return 0 <= x && x < 3 && 0 <= y && y < 3 && board[x][y] === 0;
  };
  
  export const applyMove = (board, x, y, player) => {
    if (validMove(board, x, y)) {
      board[x][y] = player;
      return true;
    }
    return false;
  };
  
  export const checkWin = (board, player) => {
    for (let i = 0; i < 3; i++) {
      if (board[i].every(cell => cell === player) || board.every(row => row[i] === player)) {
        return true;
      }
    }
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
      return true;
    }
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
      return true;
    }
    return false;
  };
  
  export const checkDraw = (board) => {
    return board.flat().every(cell => cell !== 0);
  };
  
  const minimax = (board, depth, isMaximizing, alpha, beta) => {
    if (checkWin(board, 1)) return 1;
    if (checkWin(board, -1)) return -1;
    if (checkDraw(board)) return 0;
  
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (const [i, j] of emptyCells(board)) {
        board[i][j] = 1;
        const score = minimax(board, depth + 1, false, alpha, beta);
        board[i][j] = 0;
        bestScore = Math.max(score, bestScore);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) break;
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (const [i, j] of emptyCells(board)) {
        board[i][j] = -1;
        const score = minimax(board, depth + 1, true, alpha, beta);
        board[i][j] = 0;
        bestScore = Math.min(score, bestScore);
        beta = Math.min(beta, score);
        if (beta <= alpha) break;
      }
      return bestScore;
    }
  };
  
  export const bestMove = (board) => {
    let bestScore = -Infinity;
    let move = null;
    for (const [i, j] of emptyCells(board)) {
      board[i][j] = 1;
      const score = minimax(board, 0, false, -Infinity, Infinity);
      board[i][j] = 0;
      if (score > bestScore) {
        bestScore = score;
        move = [i, j];
      }
    }
    return move;
  };
  