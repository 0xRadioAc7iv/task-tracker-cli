import { readFile, writeFile } from "node:fs/promises";
import { tasksFile } from "../lib/constants.js";
import chalk from "chalk";
import { createNewFileIfDoesNotExist } from "../lib/createNewFileIfDoesNotExist.js";

/**
 * Updates the description of a task by ID.
 *
 * This function modifies the description of a task specified by its ID.
 * If the task exists, the description is updated and the changes are saved
 * to the tasks file. The old and new descriptions are logged to the console.
 *
 * @async
 * @param {number} id - The ID of the task to update.
 * @param {string} description - The new description for the task.
 *
 * @example
 * updateTask(1, "New task description");
 * // Output: "Task updated successfully: Old description -> New task description"
 */
export async function updateTask(id, description) {
  if (createNewFileIfDoesNotExist()) return;

  if (!id) {
    console.log(chalk.red("Error: Please enter a task id"));
  }

  if (!description) {
    console.log(chalk.red("Error: Please enter a task description"));
    return;
  }

  try {
    const file = await readFile(tasksFile);
    const data = JSON.parse(file.toString());

    const task = data.tasks[id];
    const oldDescription = task.description;

    if (!task) {
      console.log(chalk.red(`Task with ID ${id} does not exist!`));
      return;
    }

    task.description = description;
    task.updatedAt = Date.now();

    await writeFile(tasksFile, JSON.stringify(data));

    console.log(
      chalk.green(
        `Task updated successfully:\n${oldDescription} -> ${task.description}`
      )
    );
  } catch (error) {
    console.log(chalk.bgRed(error));
  }
}
