<script setup lang="ts">
import { ref } from "vue";

const newTask = ref("");
const emit = defineEmits<{
  addTask: [newTask: string];
}>();

const formSubmitted = () => {
  emit("addTask", newTask.value);
  newTask.value = "";
};
</script>

<template>
  <form @submit.prevent="formSubmitted">
    <label>
      new task
      <input type="text" v-model="newTask" />
    </label>
    <div class="button-container">
      <button>Add Task</button>
    </div>
  </form>
</template>

<style scoped>
main {
  max-width: 1200px;
  margin: 1rem auto;
}

.button-container {
  display: flex;
  justify-content: end;
  margin-top: 1rem;
}
</style>
