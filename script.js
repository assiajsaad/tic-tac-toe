function Gameboard() {
  const row = 3;
  const column = 3;
  const board = [];

  for (i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < column; j++) {
      board[i].push(Cell());
    }
  }

  function getBoard() {
    return board;
  }

  function addMarker(row, column, player) {
    if (
      board[row][column].getValue() === "X" ||
      board[row][column].getValue() === "0"
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

  return { getBoard, addMarker, printBoard };
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

  function switchPlayerTurn() {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  function getActivePlayer() {
    return activePlayer;
  }

  function printNewRound() {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn`);
  }
  function playRound(row, column) {
    console.log(
      `Adding ${
        getActivePlayer().name
      }'s marker to row: ${row}, column: ${column}`
    );
    board.addMarker(row, column, getActivePlayer().token);

    // Logic for checking for winner

    switchPlayerTurn();
    printNewRound();
  }

  printNewRound();

  return {
    getActivePlayer,
    playRound,
    getBoard: board.getBoard,
  };
}

function ScreenController() {
  const game = GameController();
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");

  function updateScreen() {
    boardDiv.textContent = "";

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

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
  }

  function clickHandlerBoard(event) {
    const selectedRow = event.target.dataset.row;
    const selectedColumn = event.target.dataset.column;

    if (!selectedRow || !selectedColumn) return;

    game.playRound(selectedRow, selectedColumn);
    updateScreen();
  }
  boardDiv.addEventListener('click',clickHandlerBoard);
  updateScreen();
}

ScreenController();