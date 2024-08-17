import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { tasksFile } from "../constants.js";

export async function listTasks(status) {
  if (!existsSync(tasksFile)) {
    writeFileSync(tasksFile, JSON.stringify({ nextId: 1, tasks: {} }));
    console.log(
      "Created a new file! run `task add 'description'` to add your tasks."
    );
  }

  try {
    const file = await readFile(tasksFile);
    const data = JSON.parse(file.toString());

    if (status) {
      if (status === "todo" || status === "done" || status === "in-progress") {
        const tasksData = data["tasks"];

        for (const key in tasksData) {
          if (tasksData[key].status === status) {
            console.log(tasksData[key]);
          }
        }
      } else {
        console.log(`Error: Incorrect status '${status}' for task`);
      }
    } else {
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
}
