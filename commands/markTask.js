import { readFile, writeFile } from "node:fs/promises";
import { tasksFile } from "../lib/constants.js";
import chalk from "chalk";
import { createNewFileIfDoesNotExist } from "../lib/createNewFileIfDoesNotExist.js";

/**
 * Marks a task with a specified status.
 *
 * This function updates the status of a task identified by the provided ID.
 * The status must be either "in-progress" or "done". If the task exists,
 * its status is updated, and the change is saved to the tasks file.
 *
 * @async
 * @param {number} id - The ID of the task to mark.
 * @param {string} status - The new status for the task ("in-progress" or "done").
 *
 * @example
 * markTask(1, "done");
 * // Output: "Task 'Task description' marked as done"
 */
export async function markTask(id, status) {
  if (createNewFileIfDoesNotExist()) return;

  if (!id) {
    console.log(chalk.red("Error: Please enter a task id"));
  }

  if (!status) {
    console.log(chalk.red("Error: Please enter a task status"));
    return;
  }

  if (status !== "in-progress" && status !== "done") {
    console.log(chalk.red(`Error: Incorrect value '${status}' for status`));
    return;
  }

  try {
    const file = await readFile(tasksFile);
    const data = JSON.parse(file.toString());

    const task = data.tasks[id];

    if (!task) {
      console.log(chalk.red(`Task with ID ${id} does not exist!`));
      return;
    }

    task.status = status;
    task.updatedAt = Date.now();

    await writeFile(tasksFile, JSON.stringify(data));
    console.log(
      chalk.green(
        `Task '${task.description}' marked as ${
          status == "done" ? chalk.bgGreen(status) : chalk.bgYellow(status)
        }`
      )
    );
  } catch (error) {
    console.log(chalk.bgRed(error));
  }
}
