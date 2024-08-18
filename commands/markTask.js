import { existsSync, writeFileSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { tasksFile } from "../constants.js";
import chalk from "chalk";

export async function markTask(id, status) {
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
