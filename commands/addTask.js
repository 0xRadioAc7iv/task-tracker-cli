import fs from "node:fs";

export function addTask(description) {
  if (!fs.existsSync("tasks.json")) {
    fs.writeFileSync("tasks.json", JSON.stringify({}));
  }

  fs.readFile("tasks.json", function (err, data) {
    if (err) throw err;

    console.log(JSON.parse(data));
  });
}
