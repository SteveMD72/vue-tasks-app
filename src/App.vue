<script setup lang="ts">
import { ref } from "vue";

// Components
import TaskForm from "./components/TaskForm.vue";

// Types
import type { Task } from "./types";

// State
const message = ref("Tasks App");
const tasks = ref<Task[]>([]);

// Methods
const addTask = (newTask: string) => {
  tasks.value.push({
    id: crypto.randomUUID(),
    title: newTask,
    done: false,
  });
};
</script>

<template>
  <main>
    <h1>{{ message }}</h1>
    <TaskForm @add-task="addTask" />
  </main>
  <h2>Tasks</h2>
  <ul>
    <li v-for="task in tasks" :key="task.id">
      {{ task.title }} - {{ task.done ? "Done" : "Pending" }}
    </li>
  </ul>
</template>

<style scoped>
main {
  max-width: 1200px;
  margin: 1rem auto;
}
</style>
