import { existsSync, writeFileSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { tasksFile } from "../constants.js";

export async function deleteTask(id) {
  if (!existsSync(tasksFile)) {
    console.log("Error: There are no tasks to delete");
    return;
  }

  if (!id) {
    console.log("Error: Please enter a task id");
  }

  try {
    const file = await readFile(tasksFile);
    const data = JSON.parse(file.toString());

    if (!data.tasks[`${data.nextId - 1}`]) {
      console.log(`Task with ID ${id} does not exist!`);
      return;
    }

    delete data.tasks[`${data.nextId - 1}`];

    await writeFile(tasksFile, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}
