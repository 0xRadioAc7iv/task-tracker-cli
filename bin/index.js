#!/usr/bin/env node

import { Command } from "commander";
import { addTask } from "../commands/addTask.js";
import { updateTask } from "../commands/updateTask.js";
import { deleteTask } from "../commands/deleteTask.js";
import { listTasks } from "../commands/listTasks.js";
import { markTask } from "../commands/markTask.js";

const program = new Command();

/**
 * CLI Tool for task management.
 *
 * This tool provides various commands to manage tasks, including adding, updating, deleting,
 * listing, and marking tasks. The CLI is built using the `commander` library.
 *
 * @command task
 * @description A CLI tool to track & manage tasks.
 * @version 0.0.1
 */
program
  .name("task")
  .description("A CLI Tool to track & manage tasks.")
  .version("0.0.1");

/**
 * Add a new task.
 *
 * @command add <description> [status]
 * @description Adds a new task with the specified description and an optional status.
 * @action addTask
 */
program
  .command("add <description> [status]")
  .description("Add a new task")
  .action(addTask);

/**
 * Update an existing task's description.
 *
 * @command update <id> <description>
 * @description Updates the description of the task with the given ID.
 * @action updateTask
 */
program
  .command("update <id> <description>")
  .description("Update a task's description")
  .action(updateTask);

/**
 * Delete a task.
 *
 * @command delete <id>
 * @description Deletes the task with the specified ID.
 * @action deleteTask
 */
program.command("delete <id>").description("Delete a task").action(deleteTask);

/**
 * List all tasks.
 *
 * @command list [status]
 * @description Lists all tasks or filters them by the specified status.
 * @action listTasks
 */
program
  .command("list [status]")
  .description("List all tasks")
  .action(listTasks);

/**
 * Mark a task's status.
 *
 * @command mark [id] <status>
 * @description Marks the task with the specified ID as 'in-progress' or 'done'.
 * @action markTask
 */
program
  .command("mark [id] <status>")
  .description("Mark a task's status as 'in-progress' OR 'done'")
  .action(markTask);

program.parse();
