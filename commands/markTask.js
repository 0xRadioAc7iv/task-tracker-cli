import { existsSync, writeFileSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { tasksFile } from "../constants.js";

export async function markTask(id, status) {
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

  if (!status) {
    console.log("Error: Please enter a task status");
    return;
  }

  if (status !== "in-progress" && status !== "done") {
    console.log(`Error: Incorrect value '${status}' for status`);
    return;
  }

  try {
    const file = await readFile(tasksFile);
    const data = JSON.parse(file.toString());

    const task = data.tasks[id];

    if (!task) {
      console.log(`Task with ID ${id} does not exist!`);
      return;
    }

    task.status = status;
    task.updatedAt = Date.now();

    await writeFile(tasksFile, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}
