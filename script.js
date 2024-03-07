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
    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
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
    console.log(`Adding ${getActivePlayer().name}'s marker to row: ${row}, column: ${column}`);
    board.addMarker(row,column,getActivePlayer().token);

    switchPlayerTurn();
    printNewRound();
  }

  printNewRound();

  return { 
    getActivePlayer,
    playRound
  }
}
const game = GameController();