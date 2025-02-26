function Gameboard(gameBoard) {
  const board = gameBoard
  const updateBoard = (x, y, gamePiece) => {
    board[x][y] = gamePiece;
  };

  const checkForWin = (gamePiece) => {
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
        return hasWon;
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
  return { name, gamePiece, turn };
}

function ScreenController(gameBoard) {
  const boardDiv = document.querySelector(".board");

  const Player1 = Player("Player 1", "X", true);
  const Player2 = Player("Player 2", "O", false);

  const players = {
    "player1": Player1,
    "player2": Player2
  }

  let currentPlayer = "player1";

  boardDiv.addEventListener("click", (e) => {
    const target = e.target;
    const x = target.dataset.x;
    const y = target.dataset.y;

    const winnerDiv = document.querySelector(".winner");
    
    if (gameBoard.board[x][y] === "-") {
      gameBoard.updateBoard(x, y, players[currentPlayer].gamePiece);
      target.innerHTML = `${players[currentPlayer].gamePiece}`;
      if (gameBoard.checkForWin(players[currentPlayer].gamePiece)) {
        winnerDiv.textContent = `${players[currentPlayer].name} wins the game!`;
      } else {
        currentPlayer = currentPlayer === "player1" ? "player2" : "player1";
        winnerDiv.textContent = `${players[currentPlayer].name} turn to move`;
      };
    }
  })
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

  ScreenController(gameBoard);
}
initializeBoard();