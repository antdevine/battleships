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
  <div class="flex flex-col gap-4 ml-8 text-left">
    <h2 class="text-lg font-bold">Player: {{ playerName }}</h2>

    <div>
      <h2 class="text-lg font-bold">Ships</h2>
      <ul>
        <li v-for="ship in ships" :key="ship.type">
          <span class="font-bold text-blue-400">{{ ship.type }}:</span>
          {{ ship.qty - ship.qtySank }} remaining
        </li>
      </ul>
    </div>
    <p><span class="font-bold text-blue-400">Attempts:</span> {{ attempts }}</p>
  </div>
</template>
