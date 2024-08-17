import { homedir } from "node:os";
import { basename } from "node:path";

const userHomeDir = homedir();
const username = basename(userHomeDir);

export const tasksFile = `C:/Users/${username}/Documents/tasks.json`;
