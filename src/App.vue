<script setup>
import { useGame } from "./composables/useGame";
import StartGameForm from "./components/startGameForm.vue";
import targetShipSelect from "./components/targetShipSelect.vue";
import sidebarInfo from "./components/sidebarInfo.vue";
import boardGid from "./components/boardGrid.vue";

const {
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
} = useGame();
</script>

<template>
  <StartGameForm v-if="!gameStarted" @start-game="startGame" />

  <div
    class="flex flex-wrap flex-col md:flex-row justify-between gap-4 mb-10"
    v-if="gameStarted"
  >
    <targetShipSelect @target-ship-cordinates="targetShipCordinates" />
    <div class="inline-flex items-baseline gap-2">
      <button @click="addShips">New game</button>
      <button @click="showShipLocations = !showShipLocations">
        {{
          showShipLocations
            ? "Hide ship locations"
            : "Cheat mode(Reveal ship locations)"
        }}
      </button>
    </div>
  </div>

  <div class="flex flex-wrap flex-col md:flex-row gap-4" v-if="gameStarted">
    <boardGid
      :board="board"
      :letters="letters"
      :showShipLocations="showShipLocations"
    />

    <sidebarInfo
      :ships="ships"
      :attempts="attempts"
      :playerName="playerName"
      v-if="gameStarted"
    />
  </div>
</template>
