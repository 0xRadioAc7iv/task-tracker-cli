import { readFile, writeFile } from "node:fs/promises";
import { tasksFile } from "../lib/constants.js";
import chalk from "chalk";
import { createNewFileIfDoesNotExist } from "../lib/createNewFileIfDoesNotExist.js";

/**
 * Adds a new task to the tasks file.
 *
 * This function adds a new task with the provided description and optional status to the tasks file.
 * It ensures the tasks file exists, validates the inputs, and updates the tasks file with the new task.
 *
 * @async
 * @param {string} description - The description of the task to be added.
 * @param {string} [status="todo"] - The status of the task, either "todo" or "in-progress".
 *
 * @example
 * addTask("Finish the report", "in-progress");
 * // Output: "New Task added: Finish the report"
 */
export async function addTask(description, status) {
  createNewFileIfDoesNotExist();

  if (!description) {
    console.log(chalk.red("Error: Please enter a task description"));
    return;
  }

  if (status && status !== "in-progress") {
    console.log(
      chalk.red(`Error: Incorrect value '${status}' for task status`)
    );
    return;
  }

  try {
    const file = await readFile(tasksFile);
    const data = JSON.parse(file.toString());

    data.tasks[data.nextId] = {
      description: description,
      status: status || "todo",
      createdAt: Date.now(),
      updatedAt: null,
    };

    data.nextId++;
    await writeFile(tasksFile, JSON.stringify(data));

    console.log(chalk.green(`New Task added: ${description}`));
  } catch (error) {
    console.log(chalk.bgRed(error));
  }
}
