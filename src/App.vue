<script setup>
 import { ref } from 'vue';

 const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

 const board = ref({});

for (let i = 1; i <= 10; i++) {
  const row = {};
  letters.forEach(letter => {
    row[letter] = { 
      id: `${i}${letter}`,
      isHit: false,
      isMiss: false,
      isShip: false,
      isShipSunk: false,
      locationOfCompleteShip: [],
      shipType: '',
    };
  });
  board.value[i] = row;
}

const gameStarted = ref(false);
const playerName = ref('');
const columnSelected = ref('');
const rowSelected = ref(0);
let startingCell = ref({});
let nextShipCoordinates = [];
const attempts = ref(0);

const ships = [
  { type: 'Battleship', size: 5, qty: 1, qtySank: 0 },
  { type: 'Destroyer', size: 4, qty: 2, qtySank: 0 },
];

const targetShip = (event) => {
  event.preventDefault();
  attempts.value++;

  if(board.value[rowSelected.value][columnSelected.value].isShip) {
    if(board.value[rowSelected.value][columnSelected.value].isShipSunk) {
      alert('This ship has already been sunk!');
      return;
    }
    board.value[rowSelected.value][columnSelected.value].isHit = true;
    const shipLocation = board.value[rowSelected.value][columnSelected.value].locationOfCompleteShip;
    const checkSunk = shipLocation.map(location => {
      const [row, col] = location.split('');
      return board.value[Number(row)][col].isHit;
    });
    if(checkSunk.includes(false)) {
      alert('You hit a ship!');
    } else {
      shipLocation.forEach(location => {
        const [row, col] = location.split('');
        board.value[Number(row)][col].isShipSunk = true;
      });
      alert(`You sunk a ${board.value[rowSelected.value][columnSelected.value].shipType}!`);
      ships.map((ship) => {
        if(ship.type === board.value[rowSelected.value][columnSelected.value].shipType) {
          ship.qtySank++;
          if(ship.qtySank === ship.qty) {
            alert(`You sunk all ${ship.type}s!`);
          }
        }
      });
      if (ships.every(ship => ship.qtySank === ship.qty)) {
          alert(`You won the game! You have sunk all ships in ${attempts.value} attempts!  Try again to beat your score!`);
        }
    }
    
  } else {
    board.value[rowSelected.value][columnSelected.value].isMiss = true;
  }
}

const initialShipPosition = () => {
  // Generate a random number seperate for letters and numbers otherwise it will be the same pair each time
  const randomNumberLetter = Math.floor(Math.random() * 10);
  // Numbers array dont start at 0 so adding 1
  const randomNumber = Math.floor(Math.random() * 10) + 1;
  // Generate a random letter from A to J
  const randomLetter = letters[randomNumberLetter];
  startingCell = board.value[randomNumber][randomLetter];
}

const horizontalCheck = (rowNumber, colLetter, size) => {
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
        
        nextShipCoordinates = horizontalCheck(rowNumber, colLetter, size);

        if(nextShipCoordinates.length === 0) {
          nextShipCoordinates = verticalCheck(rowNumber, colLetter, size);
        }
        

          // Check if all coordinates are empty
          const canPlaceShip = nextShipCoordinates.every(coord => {
            const row = parseInt(coord.match(/\d+/)[0]);
            const col = coord.match(/[A-Z]/i)[0];
            return !board.value[row][col].isShip;
          });

          

          if (canPlaceShip) {
            nextShipCoordinates.forEach(coord => {
              const row = parseInt(coord.match(/\d+/)[0]);
              const col = coord.match(/[A-Z]/i)[0];

              board.value[row][col].isShip = true;
              board.value[row][col].locationOfCompleteShip = [...nextShipCoordinates];
              board.value[row][col].shipType = type;
              found = true;
            });

            
          } else {
            startingCell.isShip = false;
            continue;
          }
        }
      }
    }
  }

const addShips = (event) => {
  event.preventDefault();

  // Reset the board
  for (let i = 1; i <= 10; i++) {
    const row = {};
    letters.forEach(letter => {
      row[letter] = { 
        id: `${i}${letter}`,
        isHit: false,
        isMiss: false,
        isShip: false,
        isShipSunk: false,
        locationOfCompleteShip: [],
        shipType: '',
      };
    });
    board.value[i] = row;
  }
  ships.map((ship) => {
    setShips(ship.size, ship.qty, ship.type);
  })
  gameStarted.value = true;
  attempts.value = 0;
  columnSelected.value = '';
  rowSelected.value = 0;
  startingCell.value = {};
  nextShipCoordinates = [];
  // Reset the ships
  ships.map((ship) => {
    ship.qtySank = 0;
  });
}

</script>

<template>

<form v-if="!gameStarted" class="flex flex-row gap-4">
    <label for="playerName" class="content-center">Enter your name:</label>
    <input type="text" id="playerName" v-model="playerName" placeholder="Enter your name" class="p-2" />
    <button :disabled="playerName === ''" @click="addShips">Start Game</button>
  </form>

<div v-if="gameStarted" class="flex flex-row justify-between gap-4 mb-10">
  <form class="flex flex-row gap-4">
    <select v-model="columnSelected" class="cursor-pointer">
      <option disabled value="">Select a Column</option>
      <option value="A">Column A</option>
      <option value="B">Column B</option>
      <option value="C">Column C</option>
      <option value="D">Column D</option>
      <option value="E">Column E</option>
      <option value="F">Column F</option>
      <option value="G">Column G</option>
      <option value="H">Column H</option>
      <option value="I">Column I</option>
      <option value="J">Column J</option>
    </select>

    <select v-model="rowSelected" class="cursor-pointer">
      <option disabled value=0>Select a Row</option>
      <option value=1>Row 1</option>
      <option value=2>Row 2</option>
      <option value=3>Row 3</option>
      <option value=4>Row 4</option>
      <option value=5>Row 5</option>
      <option value=6>Row 6</option>
      <option value=7>Row 7</option>
      <option value=8>Row 8</option>
      <option value=9>Row 9</option>
      <option value=10>Row 10</option>
    </select>
    <button :disabled="columnSelected === '' || rowSelected === 0" @click="targetShip">Target Ship</button>
  </form>

  <button @click="addShips">New game</button>
</div>
  

  <div class="flex flex-wrap flex-col md:flex-row gap-4" v-if="gameStarted">
    <div class="flex flex-col gap-1">
    <!-- Top header (A–J) -->
    <div class="grid grid-cols-11 gap-1">
      <div class="w-10 h-10"></div> <!-- Empty corner -->
      <div
        v-for="letter in letters"
        :key="'header-' + letter"
        class="w-10 h-10 flex items-center justify-center font-bold"
      >
        {{ letter }}
      </div>
    </div>

    <!-- Rows with side numbers -->
    <div
      v-for="(row, rowIndex) in board"
      :key="'row-' + rowIndex"
      class="grid grid-cols-11 gap-1"
    >
      <!-- Row number -->
      <div class="w-10 h-10 flex items-center justify-center font-bold">
        {{ rowIndex }}
      </div>

      <!-- Cells -->
      <div
        v-for="(cell, colKey) in row"
        :key="colKey"
        class="w-10 h-10 flex items-center justify-center border min-w-[50px]"
      >
        {{  cell.isShipSunk ? '🚢🌊' : cell.isHit ? '💥' : cell.isMiss ? '❌' : cell.isShip ? '🚢' : '' }}
      </div>
    </div>
  </div>

  <div class="flex flex-col gap-4 ml-8" v-if="gameStarted">
    <h1 class="text-lg font-bold">Battleship Game - Player: {{ playerName }}</h1>

    <h2 class="text-lg font-bold">Ships</h2>
    <ul>
      <li v-for="ship in ships" :key="ship.type">
        {{ ship.type }}: {{ ship.qty - ship.qtySank }} remaining
      </li>
    </ul>
    <p>Attempts: {{ attempts }}</p>
  </div>
</div>
  
</template>

