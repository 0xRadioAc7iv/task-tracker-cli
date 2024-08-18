import { readFile, writeFile } from "node:fs/promises";
import { tasksFile } from "../lib/constants.js";
import chalk from "chalk";
import { confirm } from "@inquirer/prompts";
import { createNewFileIfDoesNotExist } from "../lib/createNewFileIfDoesNotExist.js";

/**
 * Deletes a task from the tasks file by ID.
 *
 * This function attempts to delete a task identified by the provided ID. It first checks if the
 * tasks file exists and validates the ID. If the task exists, it prompts the user for confirmation
 * before proceeding with deletion.
 *
 * @async
 * @param {number} id - The ID of the task to delete.
 *
 * @example
 * deleteTask(1);
 * // Output (if confirmed): "Task deleted: Task description"
 * // Output (if not confirmed): "Task deletion cancelled"
 */
export async function deleteTask(id) {
  if (createNewFileIfDoesNotExist()) return;

  if (!id) {
    console.log(chalk.red("Error: Please enter a task id"));
  }

  try {
    const file = await readFile(tasksFile);
    const data = JSON.parse(file.toString());

    if (!data.tasks[id]) {
      console.log(chalk.red(`Task with ID ${id} does not exist!`));
      return;
    }

    const taskDescription = data.tasks[id].description;

    const answer = await confirm({
      message: `Are you sure you want to delete the task: ${taskDescription}?`,
    });

    if (answer) {
      delete data.tasks[id];
      await writeFile(tasksFile, JSON.stringify(data));
      console.log(chalk.red(`Task deleted: ${taskDescription}`));
    } else {
      console.log(chalk.yellow("Task deletion cancelled"));
    }
  } catch (error) {
    console.log(chalk.bgRed(error));
  }
}
