import { describe, it, expect, vi } from "vitest";
import FilterButton from "../src/components/FilterButton.vue";
import { mount } from "@vue/test-utils";

const filters = ["all", "active", "completed"];

describe("FilterButton", () => {
	it("renders the filter name with capitalization", () => {
		const wrapper = mount(FilterButton, {
			props: {
				filter: "todo",
				currentFilter: "all",
			},
		});
		// The button text should be capitalized due to CSS, but the DOM text remains lowercase
		expect(wrapper.find("button").text()).toBe("todo");
	});

	it("applies contrast class when filter is current", () => {
		const wrapper = mount(FilterButton, {
			props: {
				filter: "done",
				currentFilter: "done",
			},
		});
		expect(wrapper.find("button").classes()).toContain("contrast");
	});

	it("emits setFilter event with correct value on click", async () => {
		const wrapper = mount(FilterButton, {
			props: {
				filter: "all",
				currentFilter: "todo",
			},
		});
		await wrapper.find("button").trigger("click");
		expect(wrapper.emitted("setFilter")).toBeTruthy();
		expect(wrapper.emitted("setFilter")![0]).toEqual(["all"]);
	});
});
