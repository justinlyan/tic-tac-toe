function Gameboard(gameBoard) {
  const board = gameBoard
  const updateBoard = (x, y, gamePiece) => {
    board[x][y] = gamePiece;
  };

  const checkForWin = (Player, gamePiece) => {
    let hasWon = false;
    const winConditions = [
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]]
    ];
    //Goes through win conditions and determines if player has won the game
    winConditions.forEach((condition) => {
      if (condition.every((element) => element === gamePiece)) {
        hasWon = true;
      }
    });
    
    return hasWon;
  }

  return {
    board,
    updateBoard,
    checkForWin
  }
}

function Player(name, gamePiece, turn) {
  return { name, gamePiece, turn } 
}

function GameController() {

  const gameBoard = Gameboard([["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]]);

  const Player1 = Player("Player 1", "X", true);
  const Player2 = Player("Player 2", "O", false);

  const move = (x, y) => {
    if (Player1.turn) {
      if (gameBoard.board[x][y] === "-") {
        gameBoard.updateBoard(x, y, Player1.gamePiece);
        Player1.turn = false;
        Player2.turn = true;
      }
    } else if (Player2.turn) {
      if (gameBoard.board[x][y] === "-") {
        gameBoard.updateBoard(x, y, Player2.gamePiece);
        Player2.turn = false;
        Player1.turn = true;
      }
    }
    console.log(gameBoard.board);
    console.log("checking for win");
  }

  move(0,0);
  move(0,1);
  move(0,2);

  if (gameBoard.checkForWin(Player1, Player1.gamePiece)) {
    console.log("win");
  } else {
    console.log("move again");
  };
}

function initializeBoard() {
  const boardDiv = document.querySelector(".board");
  const gameBoard = Gameboard([["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]]);
  const board = gameBoard.board;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell", "unpicked");
      cell.dataset.x = i;
      cell.dataset.y = j;

      boardDiv.appendChild(cell);
    }
  }
}

function ScreenController() {
  
}

initializeBoard();

GameController();