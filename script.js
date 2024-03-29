function Gameboard() {
  const board = setBoard();

  function setBoard() {
    const row = 3;
    const column = 3;
    const board = [];

    for (i = 0; i < row; i++) {
      board[i] = [];
      for (let j = 0; j < column; j++) {
        board[i].push(Cell());
      }
    }
    return board;
  }

  function getBoard() {
    return board;
  }

  function addMarker(row, column, player) {
    if (
      board[row][column].getValue() === "X" ||
      board[row][column].getValue() === "O"
    ) {
      return;
    }
    board[row][column].addToken(player);
  }

  function printBoard() {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  }

  return { getBoard, addMarker, printBoard, setBoard };
}

function Cell() {
  let value = ".";

  function addToken(player) {
    value = player;
  }

  function getValue() {
    return value;
  }

  return { addToken, getValue };
}

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = Gameboard();
  const players = [
    {
      name: playerOneName,
      token: "X",
    },
    {
      name: playerTwoName,
      token: "O",
    },
  ];

  let activePlayer = players[0];
  let winner = "";

  function switchPlayerTurn() {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  function getActivePlayer() {
    return activePlayer;
  }

  function getWinner() {
    return winner;
  }

  function printNewRound() {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn`);
  }

  function playRound(row, column) {
    board.addMarker(row, column, getActivePlayer().token);

    if (checkWinCondition(board)== true) {
      winner = getActivePlayer().name;
      return;
    }else if(checkWinCondition(board)== 'tie'){
      winner = 'tie';
      return;
    }

    switchPlayerTurn();
    // printNewRound();
  }

  function checkWinCondition(board) {
    const winPatterns = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    const boardState = board.getBoard();

    for (const pattern of winPatterns) {
      const [[a1, a2], [b1, b2], [c1, c2]] = pattern;

      if (
        boardState[a1][a2].getValue() !== "." &&
        boardState[a1][a2].getValue() === boardState[b1][b2].getValue() &&
        boardState[a1][a2].getValue() === boardState[c1][c2].getValue()
      ) {
        return true;
      }
    }
    // Check for tie
    let tie = true;
    board.getBoard().forEach(row => {
      row.forEach(cell =>{
        if(cell.getValue() ==="."){
          tie = false;
        }
      })
    })

    return tie === true ? 'tie': false;
  }

  function resetBoard() {
    board.getBoard().forEach(row => {
      row.forEach(cell => {
        cell.addToken(".");
      });
    });
    winner = "";
    activePlayer = players[0];
  }
  // printNewRound();

  return {
    getActivePlayer,
    playRound,
    getBoard: board.getBoard,
    getWinner,
    resetBoard,
  };
}

function ScreenController(playerOneName, playerTwoName) {
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");
  const winnerDiv = document.querySelector(".winner");
  const gameResult = document.querySelector(".game-result");
  const newGameBtn = document.querySelector(".btn-newgame");
  const game = GameController(playerOneName, playerTwoName);

  function updateScreen() {
    boardDiv.textContent = "";

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();
    const winner = game.getWinner();

    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

    board.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = columnIndex;
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
      });
    });

    if (winner !== "" && winner !=="tie") {
      winnerDiv.textContent = `${winner} is the winner !`;
      gameResult.classList.add("show");
    }else if(winner == "tie") {
      winnerDiv.textContent = `It's a Tie !`;
      gameResult.classList.add("show");
    }
  }

  function clickHandlerBoard(event) {
    const selectedRow = event.target.dataset.row;
    const selectedColumn = event.target.dataset.column;

    if (!selectedRow || !selectedColumn) return;

    game.playRound(selectedRow, selectedColumn);
    updateScreen();
  }

  function newGame(){
    game.resetBoard();
    updateScreen();
    gameResult.classList.remove('show');
  }

  boardDiv.addEventListener("click", clickHandlerBoard);
  updateScreen();

  newGameBtn.addEventListener("click", newGame);
}

function Game() {
  function startGame() {
    const playerOneInput = document.querySelector("#playerone");
    const playerTwoInput = document.querySelector("#playertwo");
    ScreenController(playerOneInput.value, playerTwoInput.value);
  }

  document.querySelector(".btn-startgame").addEventListener("click", (e) => {
    startGame();
    e.preventDefault();
    document.querySelector(".input-dialog").classList.remove("show");
  });

}

Game();