import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import App from "../src/App.vue";

describe("App.vue", () => {
	it("renders the main app container and header", () => {
		const wrapper = mount(App);
		expect(wrapper.find("main").exists()).toBe(true);
		expect(wrapper.find("h1").text()).toBe("Tasks App");
	});

	it("shows the empty state message when there are no tasks", () => {
		const wrapper = mount(App);
		expect(wrapper.text()).toContain("Add a task to get started");
	});

	it("adds a new task and updates the completed count", async () => {
		const wrapper = mount(App);
		const input = wrapper.findComponent({ name: "TaskForm" }).find("input[type='text']");
		await input.setValue("Test new task");
		await wrapper.findComponent({ name: "TaskForm" }).find("form").trigger("submit.prevent");
		expect(wrapper.text()).toContain("Test new task");
		expect(wrapper.text()).toContain("0 / 1 Completed");
	});

	it("toggles a task as done and updates the completed count", async () => {
		const wrapper = mount(App);
		// Add a task
		const input = wrapper.findComponent({ name: "TaskForm" }).find("input[type='text']");
		await input.setValue("Toggle me");
		await wrapper.findComponent({ name: "TaskForm" }).find("form").trigger("submit.prevent");
		// Toggle done
		const checkbox = wrapper.findComponent({ name: "TaskList" }).find("input[type='checkbox']");
		await checkbox.trigger("input");
		expect(wrapper.text()).toContain("1 / 1 Completed");
	});

	it("removes a task from the list", async () => {
		const wrapper = mount(App);
		// Add a task
		const input = wrapper.findComponent({ name: "TaskForm" }).find("input[type='text']");
		await input.setValue("Remove me");
		await wrapper.findComponent({ name: "TaskForm" }).find("form").trigger("submit.prevent");
		// Remove task
		const removeBtn = wrapper.findComponent({ name: "TaskList" }).find("button.outline");
		await removeBtn.trigger("click");
		expect(wrapper.text()).toContain("Add a task to get started");
	});

	it("filters tasks using the filter buttons", async () => {
		const wrapper = mount(App);
		// Add two tasks
		const input = wrapper.findComponent({ name: "TaskForm" }).find("input[type='text']");
		await input.setValue("Task 1");
		await wrapper.findComponent({ name: "TaskForm" }).find("form").trigger("submit.prevent");
		await input.setValue("Task 2");
		await wrapper.findComponent({ name: "TaskForm" }).find("form").trigger("submit.prevent");
		// Mark one as done
		const checkboxes = wrapper.findComponent({ name: "TaskList" }).findAll("input[type='checkbox']");
		await checkboxes[0].trigger("input");
		// Filter to done
		const doneBtn = wrapper.findAllComponents({ name: "FilterButton" }).find((btn) => btn.props("filter") === "done");
		await doneBtn?.trigger("click");
		expect(wrapper.text()).toContain("Task 1");
		expect(wrapper.text()).not.toContain("Task 2");
		// Filter to todo
		const todoBtn = wrapper.findAllComponents({ name: "FilterButton" }).find((btn) => btn.props("filter") === "todo");
		await todoBtn?.trigger("click");
		expect(wrapper.text()).toContain("Task 2");
		expect(wrapper.text()).not.toContain("Task 1");
	});
});
