#!/usr/bin/env node

import { Command } from "commander";
import { addTask } from "../commands/addTask.js";

const program = new Command();

program
  .name("task")
  .description("A CLI Tool to track & manage tasks.")
  .version("0.0.1");

program
  .command("add <description> [status]")
  .description("Add a new task")
  .action(addTask);

program.parse();
