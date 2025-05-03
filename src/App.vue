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
    };
  });
  board.value[i] = row;
}

onMounted(() => {
  // board.value[1]['A'].isShip = true;
  // board.value[1]['B'].isHit = true;
  // board.value[2]['C'].isMiss = true;
  // board.value[3]['D'].isShipSunk = true;
});

</script>

<template>
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
        {{ cell.isShip ? '🚢' : cell.isHit ? '💥' : cell.isMiss ? '❌' : '' }}
      </div>
    </div>
  </div>
</template>

