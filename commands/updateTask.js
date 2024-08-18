import { existsSync, writeFileSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { tasksFile } from "../constants.js";
import chalk from "chalk";

export async function updateTask(id, description) {
  if (!existsSync(tasksFile)) {
    console.log("Error: There are no tasks to update");
    writeFileSync(tasksFile, JSON.stringify({ nextId: 1, tasks: {} }));
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
