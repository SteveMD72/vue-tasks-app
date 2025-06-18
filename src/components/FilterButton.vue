<script setup lang="ts">
import type { TaskFilter } from "../types";

const props = defineProps<{
	filter: TaskFilter;
	currentFilter: TaskFilter;
}>();

const emit = defineEmits<{
	setFilter: [filter: TaskFilter];
}>();
</script>

<template>
	<button
		class="secondary"
		@click="$emit('setFilter', props.filter)"
		:class="{ contrast: props.filter === props.currentFilter }"
	>
		{{ props.filter }}
	</button>
</template>

<style scoped>
button {
	text-transform: capitalize;
}
</style>
