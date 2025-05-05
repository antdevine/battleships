<script setup>
import { ref } from "vue";

const emit = defineEmits(["startGame"]);
const submitName = ref("");

const submit = () => {
  emit("startGame", submitName.value);
};
</script>

<template>
  <div class="flex flex-col gap-4 items-center justify-center h-screen">
    <h1 class="text-3xl font-bold">Welcome to Battleships</h1>
    <p>Enter your name to begin the battle</p>
    <form @submit.prevent="submit" class="flex flex-row gap-4">
      <label for="name" class="content-center font-bold"
        >Enter your name:</label
      >
      <input
        v-model="submitName"
        placeholder="Enter name"
        class="p-2 border-1"
      />
      <button type="submit" :disabled="submitName === ''">Start</button>
    </form>
  </div>
</template>
