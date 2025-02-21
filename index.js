function Gameboard(gameBoard) {
  const checkForWin = (Player, gamePiece) => {
    const winConditions = [
      [gameBoard[0][0], gameBoard[0][1], gameBoard[0][2]],
      [gameBoard[1][0], gameBoard[1][1], gameBoard[1][2]],
      [gameBoard[2][0], gameBoard[2][1], gameBoard[2][2]],
      [gameBoard[0][0], gameBoard[1][0], gameBoard[2][0]],
      [gameBoard[0][1], gameBoard[1][1], gameBoard[2][1]],
      [gameBoard[0][2], gameBoard[1][2], gameBoard[2][2]],
      [gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]],
      [gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]]
    ];

    
  }

  return {
    gameBoard,
    checkForWin
  }
}

function Player(name, gamePiece, turn) {
  
  const move = () => {

  }

  return {
    name,
    gamePiece,
    turn
  } 
}

function Game() {
  const Player1 = Player("Player 1", "X", true);
  const Player2 = Player("Player 2", "O", false);

  const gameBoard = Gameboard([["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]]);
}

Game();