import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TaskList from "../src/components/TaskList.vue";
import type { Task } from "../src/types";

describe("TaskList", () => {
	const tasks: Task[] = [
		{ id: "1", title: "Task 1", done: false },
		{ id: "2", title: "Task 2", done: true },
	];

	it("renders all tasks", () => {
		const wrapper = mount(TaskList, {
			props: { tasks },
		});
		expect(wrapper.findAll('[data-testid="task-item"]').length).toBe(tasks.length);
	});

	it("shows task title and done state", () => {
		const wrapper = mount(TaskList, {
			props: { tasks },
		});
		const items = wrapper.findAll('[data-testid="task-item"]');
		const checkbox0 = items[0].find("input[type='checkbox']").element as HTMLInputElement;
		const checkbox1 = items[1].find("input[type='checkbox']").element as HTMLInputElement;
		expect(items[0].text()).toContain("Task 1");
		expect(items[1].text()).toContain("Task 2");
		expect(checkbox0.checked).toBe(false);
		expect(checkbox1.checked).toBe(true);
	});

	it("emits toggleDone when checkbox is clicked", async () => {
		const wrapper = mount(TaskList, {
			props: { tasks },
		});
		await wrapper.findAll("input[type='checkbox']")[0].trigger("input");
		expect(wrapper.emitted("toggleDone")).toBeTruthy();
		expect(wrapper.emitted("toggleDone")![0]).toEqual(["1"]);
	});

	it("emits removeTask when remove button is clicked", async () => {
		const wrapper = mount(TaskList, {
			props: { tasks },
		});
		await wrapper.findAll("button.outline")[0].trigger("click");
		expect(wrapper.emitted("removeTask")).toBeTruthy();
		expect(wrapper.emitted("removeTask")![0]).toEqual(["1"]);
	});
});
