import { readFile } from "node:fs/promises";
import { dateTimeOptions, tasksFile } from "../lib/constants.js";
import chalk from "chalk";
import { table } from "table";
import { createNewFileIfDoesNotExist } from "../lib/createNewFileIfDoesNotExist.js";

/**
 * Lists tasks from the tasks file, optionally filtered by status.
 *
 * This function retrieves and displays tasks stored in the tasks file. If a status is provided,
 * it filters tasks based on that status. The tasks are displayed in a table format with columns
 * for ID, Description, Status, Created at, and Updated at.
 *
 * @async
 * @param {string} [status] - Optional task status to filter by ("todo", "done", or "in-progress").
 *
 * @example
 * listTasks();
 * // Output: A table with all tasks
 *
 * listTasks("todo");
 * // Output: A table with tasks filtered by "todo" status
 */
export async function listTasks(status) {
  if (createNewFileIfDoesNotExist()) return;

  try {
    const file = await readFile(tasksFile);
    const data = JSON.parse(file.toString());

    const tasksData = data["tasks"];

    const tasksArray = [
      ["ID", "Description", "Status", "Created at", "Updated at"],
    ];

    if (status) {
      if (status === "todo" || status === "done" || status === "in-progress") {
        for (const key in tasksData) {
          const updatedTime =
            tasksData[key].updatedAt === null
              ? "N/A"
              : new Date(tasksData[key].updatedAt).toLocaleString(
                  "en-IN",
                  dateTimeOptions
                );

          if (tasksData[key].status === status) {
            tasksArray.push([
              key,
              tasksData[key].description,
              tasksData[key].status,
              new Date(tasksData[key].createdAt).toLocaleString(
                "en-IN",
                dateTimeOptions
              ),
              updatedTime,
            ]);
          }
        }

        if (status === "todo") {
          console.log(chalk.red(`Remaining Tasks: ${tasksArray.length - 1}\n`));
        } else if (status === "in-progress") {
          console.log(
            chalk.yellow(`Current Tasks: ${tasksArray.length - 1}\n`)
          );
        } else {
          console.log(
            chalk.green(`Completed Tasks: ${tasksArray.length - 1}\n`)
          );
        }

        console.log(table(tasksArray));
      } else {
        console.log(`Error: Incorrect status '${status}' for task`);
      }
    } else {
      for (const key in tasksData) {
        const taskStatus = tasksData[key].status;
        const updatedTime =
          tasksData[key].updatedAt === null
            ? "N/A"
            : new Date(tasksData[key].updatedAt).toLocaleString(
                "en-IN",
                dateTimeOptions
              );

        let coloredTaskStatus;

        if (taskStatus === "todo") {
          coloredTaskStatus = chalk.red(taskStatus);
        } else if (taskStatus === "in-progress") {
          coloredTaskStatus = chalk.yellow(taskStatus);
        } else {
          coloredTaskStatus = chalk.green(taskStatus);
        }

        tasksArray.push([
          key,
          tasksData[key].description,
          coloredTaskStatus,
          new Date(tasksData[key].createdAt).toLocaleString(
            "en-IN",
            dateTimeOptions
          ),
          updatedTime,
        ]);
      }

      console.log(table(tasksArray));
    }
  } catch (error) {
    console.log(chalk.bgRed(error));
  }
}
