<script setup>
 import { ref, onMounted } from 'vue';

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
    };
  });
  board.value[i] = row;
}

const columnSelected = ref('');
const rowSelected = ref(0);

const ships = [
  { name: 'Battleship', size: 5, qty: 1 },
  { name: 'Destroyer', size: 4, qty: 2 },
];

onMounted(() => {
  board.value[1]['A'].isShip = true;
  board.value[1]['B'].isShip = true;
  board.value[1]['C'].isShip = true;
  board.value[1]['D'].isShip = true;
  board.value[1]['E'].isShip = true;

  board.value[1]['A'].locationOfCompleteShip.push(board.value[1]['A'].id);
  board.value[1]['A'].locationOfCompleteShip.push(board.value[1]['B'].id);
  board.value[1]['A'].locationOfCompleteShip.push(board.value[1]['C'].id);
  board.value[1]['A'].locationOfCompleteShip.push(board.value[1]['D'].id);
  board.value[1]['A'].locationOfCompleteShip.push(board.value[1]['E'].id);

  board.value[1]['B'].locationOfCompleteShip.push(board.value[1]['A'].id);
  board.value[1]['B'].locationOfCompleteShip.push(board.value[1]['B'].id);
  board.value[1]['B'].locationOfCompleteShip.push(board.value[1]['C'].id);
  board.value[1]['B'].locationOfCompleteShip.push(board.value[1]['D'].id);
  board.value[1]['B'].locationOfCompleteShip.push(board.value[1]['E'].id);

  board.value[1]['C'].locationOfCompleteShip.push(board.value[1]['A'].id);
  board.value[1]['C'].locationOfCompleteShip.push(board.value[1]['B'].id);
  board.value[1]['C'].locationOfCompleteShip.push(board.value[1]['C'].id);
  board.value[1]['C'].locationOfCompleteShip.push(board.value[1]['D'].id);
  board.value[1]['C'].locationOfCompleteShip.push(board.value[1]['E'].id);

  board.value[1]['D'].locationOfCompleteShip.push(board.value[1]['A'].id);
  board.value[1]['D'].locationOfCompleteShip.push(board.value[1]['B'].id);
  board.value[1]['D'].locationOfCompleteShip.push(board.value[1]['C'].id);
  board.value[1]['D'].locationOfCompleteShip.push(board.value[1]['D'].id);
  board.value[1]['D'].locationOfCompleteShip.push(board.value[1]['E'].id);

  board.value[1]['E'].locationOfCompleteShip.push(board.value[1]['A'].id);
  board.value[1]['E'].locationOfCompleteShip.push(board.value[1]['B'].id);
  board.value[1]['E'].locationOfCompleteShip.push(board.value[1]['C'].id);
  board.value[1]['E'].locationOfCompleteShip.push(board.value[1]['D'].id);
  board.value[1]['E'].locationOfCompleteShip.push(board.value[1]['E'].id);


  board.value[4]['C'].isShip = true;
  board.value[5]['C'].isShip = true;
  board.value[6]['C'].isShip = true;
  board.value[7]['C'].isShip = true;

  board.value[9]['C'].isShip = true;
  board.value[9]['D'].isShip = true;
  board.value[9]['E'].isShip = true;
  board.value[9]['F'].isShip = true;
});

const checkShip = (event) => {
  event.preventDefault();
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
      alert('You sunk a ship!');
    }
    
  } else {
    board.value[rowSelected.value][columnSelected.value].isMiss = true;
  }
}

const addShips = () => {
  // Map through the ships array and add ships to the board randomly
}

</script>

<template>

  <form>
    <select v-model="columnSelected">
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

    <select v-model="rowSelected">
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
    <button :disabled="columnSelected === '' || rowSelected === 0" @click="checkShip">Target Ship</button>
  </form>
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
        class="w-10 h-10 flex items-center justify-center border"
      >
        {{  cell.isShipSunk ? '🚢🌊' : cell.isHit ? '💥' : cell.isMiss ? '❌' : cell.isShip ? '🚢' : '' }}
      </div>
    </div>
  </div>
</template>

