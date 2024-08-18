import { existsSync, writeFileSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { tasksFile } from "../constants.js";
import chalk from "chalk";

export async function addTask(description, status) {
  if (!existsSync(tasksFile)) {
    writeFileSync(tasksFile, JSON.stringify({ nextId: 1, tasks: {} }));
  }

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
