import { existsSync, writeFileSync } from "node:fs";
import chalk from "chalk";
import { tasksFile } from "./constants.js";

/**
 * Creates a new tasks file if it does not exist.
 *
 * This function checks for the existence of a tasks file defined by the `tasksFile` constant.
 * If the file does not exist, it creates a new one with an initial structure,
 * which includes a `nextId` property set to 1 and an empty `tasks` object.
 *
 * It uses `chalk` to output colored messages to the console to inform the user
 * about the creation process.
 *
 * @returns {boolean} - Returns `true` if the file was created, otherwise `false`.
 *
 * @example
 * // Example usage in a CLI tool
 * createNewFileIfDoesNotExist();
 * // Output if file does not exist:
 * // Task file does not exist, Creating a new one...
 * // Created a new file! run `task add 'description'` to add your tasks.
 */
export function createNewFileIfDoesNotExist() {
  if (!existsSync(tasksFile)) {
    console.log(chalk.red(`Task file does not exist, Creating a new one...`));

    writeFileSync(tasksFile, JSON.stringify({ nextId: 1, tasks: {} }));

    console.log(
      chalk.green(
        "Created a new file! run `task add 'description'` to add your tasks."
      )
    );

    return true;
  }

  return false;
}
