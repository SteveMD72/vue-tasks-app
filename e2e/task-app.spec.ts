import { test, expect } from "@playwright/test";

test.describe("Vue Tasks App", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/");
	});

	test("should display the title and header", async ({ page }) => {
		await expect(page).toHaveTitle(/Vue Tasks App/);

		const header = page.locator("h1");
		await expect(header).toHaveText("Tasks App");
	});

	test("counts the number of rendered tasks", async ({ page }) => {
		// Add three tasks
		await page.getByPlaceholder("Enter a new task").fill("Task 1");
		await page.getByRole("button", { name: /add/i }).click();

		await page.getByPlaceholder("Enter a new task").fill("Task 2");
		await page.getByRole("button", { name: /add/i }).click();

		await page.getByPlaceholder("Enter a new task").fill("Task 3");
		await page.getByRole("button", { name: /add/i }).click();

		// Count the rendered tasks (adjust selector to match your TaskList rendering)
		const tasks = await page.locator('[data-testid="task-item"]');
		await expect(tasks).toHaveCount(3);
	});

	test("should display an error when adding an empty task", async ({ page }) => {
		await page.getByRole("button", { name: "Add Task" }).click();
		await expect(page.getByText("Please enter a valid task.")).toBeVisible();
	});

	test("Should allow the user to delete a task", async ({ page }) => {
		// Add a task
		await page.getByPlaceholder("Enter a new task").fill("Task to delete");
		await page.getByRole("button", { name: /add/i }).click();

		// Ensure the task is added
		const tasks = await page.locator('[data-testid="task-item"]');
		await expect(tasks).toHaveCount(1);

		// Delete the task
		await page.getByRole("button", { name: "Remove" }).click();

		// Verify the task is deleted
		await expect(tasks).toHaveCount(0);
	});
});
