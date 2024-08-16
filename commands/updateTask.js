import { existsSync, writeFileSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { tasksFile } from "../constants.js";

export async function updateTask(id, description) {
  if (!existsSync(tasksFile)) {
    console.log("Error: There are no tasks to update");
    writeFileSync(tasksFile, JSON.stringify({ nextId: 1, tasks: {} }));
    console.log(
      "Created a new file! run `task add 'description'` to add your tasks."
    );

    return;
  }

  if (!id) {
    console.log("Error: Please enter a task id");
  }

  if (!description) {
    console.log("Error: Please enter a task description");
    return;
  }

  try {
    const file = await readFile(tasksFile);
    const data = JSON.parse(file.toString());

    const task = data.tasks[`${data.nextId - 1}`];

    if (!task) {
      console.log(`Task with ID ${id} does not exist!`);
      return;
    }

    task.description = description;
    task.updatedAt = Date.now();

    await writeFile(tasksFile, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}
