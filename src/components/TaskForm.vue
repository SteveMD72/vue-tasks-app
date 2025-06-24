<script setup lang="ts">
// Imports
import { ref } from "vue";

// State
const error = ref("");
const newTask = ref("");

// Emits
const emit = defineEmits<{
	addTask: [newTask: string];
}>();

// Methods
const formSubmitted = () => {
	if (newTask.value.trim()) {
		emit("addTask", newTask.value.trim());
		newTask.value = "";
		error.value = "";
	} else {
		error.value = "Please enter a valid task.";
	}
};
</script>

<template>
	<form @submit.prevent="formSubmitted">
		<label>
			New task
			<input
				type="text"
				v-model="newTask"
				:aria-invalid="!!error || undefined"
				aria-describedby="invalid-helper"
				@input="error = ''"
				placeholder="Enter a new task"
			/>
			<small
				v-if="error"
				id="invalid-helper"
				>{{ error }}</small
			>
		</label>
		<div class="button-container">
			<button>Add Task</button>
		</div>
	</form>
</template>
