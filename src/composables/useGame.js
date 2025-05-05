import { ref } from "vue";

export function useGame() {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  const board = ref({});

  const resetBoard = () => {
    //Initial state for the board where each cell is set to false and empty
    for (let i = 1; i <= 10; i++) {
      const row = {};
      letters.forEach((letter) => {
        row[letter] = {
          id: `${i}${letter}`,
          isHit: false,
          isMiss: false,
          isShip: false,
          isShipSunk: false,
          locationOfCompleteShip: [],
          shipType: "",
        };
      });
      board.value[i] = row;
    }
  };

  const gameStarted = ref(false);
  const playerName = ref("");
  const columnSelected = ref("");
  const rowSelected = ref(0);
  let startingCell = {};
  let nextShipCoordinates = [];
  const attempts = ref(0);
  const showShipLocations = ref(false);

  const ships = [
    { type: "Battleship", size: 5, qty: 1, qtySank: 0 },
    { type: "Destroyer", size: 4, qty: 2, qtySank: 0 },
  ];

  const startGame = (name) => {
    playerName.value = name;
    addShips();
  };

  const targetShipCordinates = ({ column, row }) => {
    rowSelected.value = Number(row);
    columnSelected.value = column;
    targetShip();
  };

  const targetShip = () => {
    attempts.value++;

    if (board.value[rowSelected.value][columnSelected.value].isShip) {
      // Check if the ship has already been sunk
      if (board.value[rowSelected.value][columnSelected.value].isShipSunk) {
        alert("This ship has already been sunk!");
        return;
      }
      // Sets the ship to be hit and then checks if it is sunk by looking at the other coordinates in locationOfCompleteShip
      // It sees if any of them are false and if they are it says you hit a ship but if they are all true it will say you sunk a ship
      board.value[rowSelected.value][columnSelected.value].isHit = true;
      const shipLocation =
        board.value[rowSelected.value][columnSelected.value]
          .locationOfCompleteShip;
      const checkSunk = shipLocation.map((location) => {
        const [row, col] = location.split("");
        return board.value[Number(row)][col].isHit;
      });
      
      if (checkSunk.includes(false)) {
        alert("You hit a ship!");
      } else {
        shipLocation.forEach((location) => {
          const [row, col] = location.split("");
          board.value[Number(row)][col].isShipSunk = true;
        });
        alert(
          `You sunk a ${
            board.value[rowSelected.value][columnSelected.value].shipType
          }!`
        );
        // Check if all ships of a certain type have been sunk
        ships.map((ship) => {
          if (
            ship.type ===
            board.value[rowSelected.value][columnSelected.value].shipType
          ) {
            ship.qtySank++;
            if (ship.qtySank === ship.qty) {
              alert(`You sunk all ${ship.type}s!`);
            }
          }
        });
        // Check if all ships have been sunk
        // If all ships have been sunk, display a win message
        if (ships.every((ship) => ship.qtySank === ship.qty)) {
          alert(
            `You won the game! You have sunk all ships in ${attempts.value} attempts!  Try again to beat your score!`
          );
        }
      }
    } else {
      // If the cell is not a ship, it will set it to be a miss
      board.value[rowSelected.value][columnSelected.value].isMiss = true;
    }
  };

  const initialShipPosition = () => {
    // Generate a random number seperate for letters and numbers otherwise it will be the same pair each time
    const randomNumberLetter = Math.floor(Math.random() * 10);
    // Numbers array dont start at 0 so adding 1
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    // Generate a random letter from A to J
    const randomLetter = letters[randomNumberLetter];
    startingCell = board.value[randomNumber][randomLetter];
  };

  const horizontalCheck = (rowNumber, colLetter, size) => {
    // Check if the ship can be placed horizontally, if it fits on the board from its initial position
    const startIndex = letters.indexOf(colLetter);
    const coordinates = [];

    if (startIndex + size <= letters.length) {
      for (let j = 0; j < size; j++) {
        const letter = letters[startIndex + j];
        coordinates.push(`${rowNumber}${letter}`);
      }
    }

    return coordinates;
  };

  const verticalCheck = (rowNumber, colLetter, size) => {
    // Check if the ship can be placed vertically, if it fits on the board from its initial position
    const coordinates = [];

    if (rowNumber + size <= 10) {
      for (let j = 0; j < size; j++) {
        const number = rowNumber + j;
        coordinates.push(`${number}${colLetter}`);
      }
    }

    return coordinates;
  };

  const setShips = (size, qty, type) => {
    for (let i = 0; i < qty; i++) {
      let found = false;

      while (!found) {
        initialShipPosition();

        if (!startingCell.isShip) {
          const rowNumber = parseInt(startingCell.id.match(/\d+/)[0]);
          const colLetter = startingCell.id.match(/[A-Z]/i)[0];

          // Check if the ship can be placed horizontally before vertically
          nextShipCoordinates = horizontalCheck(rowNumber, colLetter, size);

          if (nextShipCoordinates.length === 0) {
            nextShipCoordinates = verticalCheck(rowNumber, colLetter, size);
          }

          // Check if all coordinates are empty and if they are then place the ship
          const canPlaceShip = nextShipCoordinates.every((coord) => {
            const row = parseInt(coord.match(/\d+/)[0]);
            const col = coord.match(/[A-Z]/i)[0];
            return !board.value[row][col].isShip;
          });

          if (canPlaceShip) {
            // Place the ship on the board and add the data to the cells
            nextShipCoordinates.forEach((coord) => {
              const row = parseInt(coord.match(/\d+/)[0]);
              const col = coord.match(/[A-Z]/i)[0];

              board.value[row][col].isShip = true;
              board.value[row][col].locationOfCompleteShip = [
                ...nextShipCoordinates,
              ];
              board.value[row][col].shipType = type;
              found = true;
            });
          } else {
            // If the ship cannot be placed it will go back to the beginning of the function and randomly select a new starting point
            startingCell.isShip = false;
            continue;
          }
        }
      }
    }
  };

  const addShips = () => {
    // When you add ships it will reset the board and then add the ships and then it sets all of the other values to their default values
    resetBoard();
    ships.map((ship) => {
      setShips(ship.size, ship.qty, ship.type);
    });
    gameStarted.value = true;
    attempts.value = 0;
    columnSelected.value = "";
    rowSelected.value = 0;
    startingCell.value = {};
    nextShipCoordinates = [];
    // Reset the ships
    ships.map((ship) => {
      ship.qtySank = 0;
    });
  };

  return {
    letters,
    board,
    gameStarted,
    playerName,
    columnSelected,
    rowSelected,
    attempts,
    showShipLocations,
    ships,
    startGame,
    addShips,
    targetShipCordinates,
  };
}
