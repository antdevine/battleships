<script setup>
const props = defineProps({
  board: {
    type: Object,
    required: true,
  },
  letters: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col gap-1">
    <!-- Top header (A–J) -->
    <div class="grid grid-cols-11 gap-1">
      <div class="w-10 h-10"></div>
      <!-- Empty corner -->
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
        {{
          cell.isShipSunk
            ? "🚢🌊"
            : cell.isHit
            ? "💥"
            : cell.isMiss
            ? "❌"
            : cell.isShip
            ? "🚢"
            : ""
        }}
      </div>
    </div>
  </div>
</template>
