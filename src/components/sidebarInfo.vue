<script setup>
const props = defineProps({
  ships: {
    type: Array,
    required: true,
  },
  attempts: {
    type: Number,
    required: true,
  },
  playerName: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col gap-4 ml-8">
    <h1 class="text-lg font-bold">
      Battleship Game - Player: {{ playerName }}
    </h1>

    <h2 class="text-lg font-bold">Ships</h2>
    <ul>
      <li v-for="ship in ships" :key="ship.type">
        {{ ship.type }}: {{ ship.qty - ship.qtySank }} remaining
      </li>
    </ul>
    <p>Attempts: {{ attempts }}</p>
  </div>
</template>
