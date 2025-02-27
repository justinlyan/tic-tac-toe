function Gameboard(gameBoard) {
  const board = gameBoard;
  const updateBoard = (x, y, gamePiece) => {
    board[x][y] = gamePiece;
  };

  const checkForWin = (gamePiece) => {
    let hasWon = false;
    const winConditions = [
      [board[0][0], board[0][1], board[0][2]], [board[1][0], board[1][1], board[1][2]], [board[2][0], board[2][1], board[2][2]], [board[0][0], board[1][0], board[2][0]], [board[0][1], board[1][1], board[2][1]], [board[0][2], board[1][2], board[2][2]], [board[0][0], board[1][1], board[2][2]], [board[0][2], board[1][1], board[2][0]]
    ];
    //Goes through win conditions and determines if player has won the game
    winConditions.forEach((condition) => {
      if (condition.every((element) => element === gamePiece)) {
        hasWon = true;
      }
    });
    return hasWon;
  }

  return {board, updateBoard, checkForWin};
}

function Player(name, gamePiece, turn, score) {
  function updateScore() {
    score++;
    return;
  }

  function getScore() {
    return score;
  }

  return { name, gamePiece, turn, score, updateScore, getScore };
}

function ScreenController(firstPlayer, secondPlayer) {
  const boardDiv = document.querySelector(".board");
  const newGameBtn = document.querySelector(".newGame");
  const winnerDiv = document.querySelector(".winner");
  const firstPlayerScoreDiv = document.querySelector(".player1Score");
  const secondPlayerScoreDiv = document.querySelector(".player2Score");

  let gameBoard = Gameboard([["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]]);

  const players = {
    "player1": firstPlayer,
    "player2": secondPlayer
  }

  let currentPlayer = "player1";
  let hasWon = false;
  let move = 0;

  winnerDiv.textContent = `${players[currentPlayer].name} turn to move`;

  const newBoard = () => {
    gameBoard = Gameboard([["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]]);
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

  const updateScoreDiv = () => {
    firstPlayerScoreDiv.textContent = `${players["player1"].name}: ${players["player1"].getScore()}`;
    secondPlayerScoreDiv.textContent = `${players["player2"].name}: ${players["player2"].getScore()}`;
  }

  boardDiv.addEventListener("click", function eventHandler(e) {
    const target = e.target;
    const x = target.dataset.x;
    const y = target.dataset.y;
    
    if (gameBoard.board[x][y] === "-" && !hasWon) {
      move++;
      let current = players[currentPlayer];
      gameBoard.updateBoard(x, y, current.gamePiece);
      target.innerHTML = `${current.gamePiece}`;
      if (gameBoard.checkForWin(current.gamePiece)) {
        winnerDiv.textContent = `${current.name} wins the game!`;
        current.updateScore();
        updateScoreDiv();
        hasWon = true;
      } else {
        if (move === 9) {
          winnerDiv.textContent = `Tie!`;
        } else {
          currentPlayer = currentPlayer === "player1" ? "player2" : "player1";
          winnerDiv.textContent = `${current.name} turn to move`;
        }
      };
    }
  })

  newGameBtn.addEventListener("click", () => {
    document.querySelector(".board").innerHTML = "";
    currentPlayer = "player1";
    hasWon = false;
    newBoard();
  });

  updateScoreDiv();
  newBoard();
}

function initializeGame() {
  const makePlayersBtn = document.querySelector(".makePlayers");

  makePlayersBtn.addEventListener("click", () => {
    const player1Name = document.querySelector("#player1").value;
    const player2Name = document.querySelector("#player2").value;

    const firstPlayer = Player(player1Name, "X", true, 0);
    const secondPlayer = Player(player2Name, "O", false, 0);
    ScreenController(firstPlayer, secondPlayer);
  })
}

initializeGame();