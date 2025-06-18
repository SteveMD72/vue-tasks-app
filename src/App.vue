<script setup lang="ts">
import { ref, computed } from "vue";

// Components
import TaskForm from "./components/TaskForm.vue";
import TaskList from "./components/TaskList.vue";
import FilterButton from "./components/FilterButton.vue";

// Types
import type { Task, TaskFilter } from "./types";

// State
const message = ref<string>("Tasks App");
const tasks = ref<Task[]>([]);
const filter = ref<TaskFilter>("all");

// Computed
const totalDone = computed(() => tasks.value.reduce((total, task) => (task.done ? total + 1 : total), 0));

const filteredTasks = computed(() => {
	switch (filter.value) {
		case "all":
			return tasks.value;

		case "done":
			return tasks.value.filter((task) => task.done);

		case "todo":
			return tasks.value.filter((task) => !task.done);
	}
	return tasks.value; // Fallback to all tasks if no filter matches
});

// Methods
const addTask = (newTask: string) => {
	tasks.value.push({
		id: crypto.randomUUID(),
		title: newTask,
		done: false,
	});
};

const removeTask = (id: string) => {
	const index = tasks.value.findIndex((task) => task.id === id);

	if (index !== -1) {
		tasks.value.splice(index, 1);
	}
};

const toggleDone = (id: string) => {
	const task = tasks.value.find((task) => task.id === id);
	if (task) {
		task.done = !task.done;
	}
};

const setFilter = (newFilter: TaskFilter) => {
	filter.value = newFilter;
};
</script>

<template>
	<main>
		<h1>{{ message }}</h1>
		<TaskForm @add-task="addTask" />
		<h3 v-if="!tasks.length">Add a task to get started</h3>
		<h3 v-else>{{ totalDone }} / {{ tasks.length }} Completed</h3>
		<div
			class="button-container"
			v-if="tasks.length"
		>
			<FilterButton
				filter="all"
				@setFilter="setFilter"
				:currentFilter="filter"
			/>
			<FilterButton
				filter="todo"
				@setFilter="setFilter"
				:currentFilter="filter"
			/>
			<FilterButton
				filter="done"
				@setFilter="setFilter"
				:currentFilter="filter"
			/>
		</div>
		<TaskList
			:tasks="filteredTasks"
			@toggleDone="toggleDone"
			@removeTask="removeTask"
		/>
	</main>
</template>

<style scoped>
main {
	max-width: 1200px;
	margin: 1rem auto;
}
</style>
