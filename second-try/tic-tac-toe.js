function Gameboard() {
  const board = [];
  const rows = 3;
  const column = 3;

  for ( i = 0; i < rows; i++) {
    board[i] = [];
    for ( j = 0; j < column; j++) {
      board[i].push(Cell());
    }
  }


  function getBoard() {
    return board;
  }

  function printBoard() {
    const boardWithCellValues = board.map((row) => {
      return row.map((cell) => {
       return cell.getValue();
      });
    });
    console.log(boardWithCellValues);

  }

  function addMarker(row, column, player) {
    // if (
    //   board[row][column].getValue() === "X" ||
    //   board[row][column].getValue() === "0"
    // ) {
    //   return;
    // }
    // board[row][column].addToken(player);

    if (
        board[row][column].getValue() === "X" ||
        board[row][column].getValue() === "O"
      ) {
        return;
      }
      board[row][column].addToken(player);
  }

  return {
    getBoard,
    printBoard,
    addMarker,
  };
}

function Cell() {
  value = ".";

  function addToken(player) {
    value = player;
  }

  function getValue() {
    return value;
  }
  return {
    addToken,
    getValue,
  };
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

  function getActivePlayer() {
    return activePlayer;
  }

  function switchPlayerTurn() {
    activePlayer = activePlayer == players[0] ? players[1] : players[0];
  }

  function printNewRound() {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s Turn`);
  }

  function playRound(row, column) {
    console.log(
      `Adding ${
        getActivePlayer().name
      }'s marker to row : ${row}, column: ${column}`
    );
    board.addMarker(row, column, getActivePlayer().token);

    // Logic for win condition

    switchPlayerTurn();
    printNewRound();
  }

  printNewRound();
  return {
    getActivePlayer,
    playRound,
    getBoard: board.getBoard,
    board
  };
}

let game = GameController();
