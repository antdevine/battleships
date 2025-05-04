<script setup>
import { ref } from 'vue';

const emit = defineEmits(['targetShipCordinates']);
const columnSelected = ref('');
const rowSelected = ref(0);

const targetShip = () => {
  emit('targetShipCordinates', {
    column: columnSelected.value,
    row: rowSelected.value,
  });
};
</script>

<template>
  <form class="flex flex-row gap-4" @submit.prevent="targetShip">
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
    <button :disabled="columnSelected === '' || rowSelected === 0">Target Ship</button>
  </form>


</template>