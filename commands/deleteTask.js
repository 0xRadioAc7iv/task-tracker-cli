import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { tasksFile } from "../constants.js";
import chalk from "chalk";
import { confirm } from "@inquirer/prompts";

export async function deleteTask(id) {
  if (!existsSync(tasksFile)) {
    console.log(chalk.red("Error: There are no tasks to delete"));
    console.log(
      chalk.green(
        "Created a new file! run `task add 'description'` to add your tasks."
      )
    );
    return;
  }

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
