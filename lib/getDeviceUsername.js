import { homedir } from "node:os";
import { basename } from "node:path";

const userHomeDir = homedir(); // Returns path of User's HOME Directory

export const username = basename(userHomeDir); // Extracts and exports the username from the path
