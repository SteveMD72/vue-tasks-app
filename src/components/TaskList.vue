<script setup lang="ts">
// Types
import type { Task } from "./types";

const props = defineProps<{
	tasks: Task[];
}>();

const emit = defineEmits<{
	toggleDone: [id: string];
	removeTask: [id: string];
}>();
</script>

<template>
	<TransitionGroup
		name="task-list"
		tag="div"
		class="task-list"
	>
		<article
			class="task"
			v-for="task in props.tasks"
			:key="task.id"
			data-testid="task-item"
		>
			<label>
				<input
					type="checkbox"
					@input="emit('toggleDone', task.id)"
					:checked="task.done"
				/>
				<span :class="{ done: task.done }">{{ task.title }}</span>
			</label>
			<button
				class="outline"
				@click="emit('removeTask', task.id)"
			>
				Remove
			</button>
		</article>
	</TransitionGroup>
</template>

<style scoped>
.task-list {
	margin-top: 2rem;
}
.done {
	color: #999;
	text-decoration: line-through;
}
.task {
	align-items: center;
	display: flex;
	justify-content: space-between;
}
.task-list-enter-active,
.task-list-leave-active {
	transition: all 0.5s ease;
}
.task-list-enter-from,
.task-list-leave-to {
	opacity: 0;
	transform: translateX(300px);
}
</style>
