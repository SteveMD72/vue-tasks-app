import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TaskForm from "../src/components/TaskForm.vue";

describe("TaskForm", () => {
	it("renders input and button", () => {
		const wrapper = mount(TaskForm);
		expect(wrapper.find("input[type='text']").exists()).toBe(true);
		expect(wrapper.find("button").text().toLowerCase()).toContain("add task");
	});

	it("emits addTask with input value and clears input on submit", async () => {
		const wrapper = mount(TaskForm);
		const input = wrapper.find("input[type='text']");
		await input.setValue("My new task");
		await wrapper.find("form").trigger("submit.prevent");
		expect(wrapper.emitted("addTask")).toBeTruthy();
		expect(wrapper.emitted("addTask")![0]).toEqual(["My new task"]);
		expect((input.element as HTMLInputElement).value).toBe("");
	});

	it("shows error if submitted with empty input", async () => {
		const wrapper = mount(TaskForm);
		await wrapper.find("form").trigger("submit.prevent");
		expect(wrapper.text()).toContain("Please enter a valid task.");
	});
});
