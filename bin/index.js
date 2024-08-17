#!/usr/bin/env node

import { Command } from "commander";
import { addTask } from "../commands/addTask.js";
import { updateTask } from "../commands/updateTask.js";
import { deleteTask } from "../commands/deleteTask.js";
import { listTasks } from "../commands/listTasks.js";
import { markTask } from "../commands/markTask.js";

const program = new Command();

program
  .name("task")
  .description("A CLI Tool to track & manage tasks.")
  .version("0.0.1");

program
  .command("add <description> [status]")
  .description("Add a new task")
  .action(addTask);

program
  .command("update <id> <description>")
  .description("Update a task")
  .action(updateTask);

program.command("delete <id>").description("Delete a task").action(deleteTask);

program.command("list [status]").description("List all task").action(listTasks);

program
  .command("mark [id] <status>")
  .description("Mark a task as 'in-progress' OR 'done'")
  .action(markTask);

program.parse();
