<script setup>
import { ref } from "vue";

const emit = defineEmits(["startGame"]);
const submitName = ref("");

const submit = () => {
  emit("startGame", submitName.value);
};
</script>

<template>
  <form @submit.prevent="submit" class="flex flex-row gap-4">
    <label for="name" class="content-center">Enter your name:</label>
    <input v-model="submitName" placeholder="Enter name" class="p-2" />
    <button type="submit" :disabled="submitName === ''">Start</button>
  </form>
</template>
