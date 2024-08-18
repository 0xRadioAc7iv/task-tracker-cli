import { username } from "./getDeviceUsername.js";

/**
 * Path to the tasks file specific to the current user.
 *
 * This constant constructs the path to the `tasks.json` file located in the
 * user's Documents directory.
 *
 * @type {string}
 *
 * @example
 * console.log(tasksFile);
 * // Output: "C:/Users/username/Documents/tasks.json" (depends on the system)
 */
export const tasksFile = `C:/Users/${username}/Documents/tasks.json`;

/**
 * Options for formatting date and time.
 *
 * This object defines the options used for formatting dates and times, including
 * day, month, year, hour, and minute, with a 12-hour clock format.
 *
 * @type {Object}
 * @property {string} day - The numeric day of the month.
 * @property {string} month - The full name of the month.
 * @property {string} year - The numeric year.
 * @property {string} hour - The numeric hour.
 * @property {string} minute - The numeric minute.
 * @property {boolean} hour12 - Whether to use a 12-hour clock.
 *
 * @example
 * console.log(new Intl.DateTimeFormat('en-US', dateTimeOptions).format(new Date()));
 * // Output: "August 18, 2024 at 10:15 AM" (example)
 */
export const dateTimeOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};
