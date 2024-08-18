# Task Tracker CLI

A Command-Line Interface (CLI) tool for tracking and managing tasks. This CLI allows users to add, update, delete, list, and mark tasks with ease.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

1.  **Clone the repository:**

```bash
git clone https://github.com/0xRadioAc7iv/task-tracker-cli.git
```

2.  **Navigate to the project directory:**

```bash
cd task-tracker-cli
```

3.  **Install dependencies:**

```bash
npm install
```

## Usage

The CLI tool is invoked using the `task` command. Below are the available commands and their usage:

### Add Task

Add a new task with a description and optional status.

```bash
task add <description> [status]
```

- **description**: The description of the task.
- **status**: Optional. The status of the task (e.g., "in-progress").

**Example:**

```bash
task add "Finish the report" "in-progress"
```

### Update Task

Update the description of an existing task.

```bash
task update <id> <description>
```

- **id**: The ID of the task to update.
- **description**: The new description for the task.

**Example:**

```bash
task update 1 "Finish the report by Friday"
```

### Delete Task

Delete a task by its ID.

```bash
task delete <id>
```

- **id**: The ID of the task to delete.

**Example:**

```bash
task delete 1
```

### List Tasks

List all tasks or filter by status.

```bash
task list [status]
```

- **status**: Optional. Filter tasks by status ("todo", "in-progress", "done").

**Example:**

```bash
task list "todo"
```

### Mark Task

Mark a task's status as either "in-progress" or "done".

```bash
task mark <id> <status>
```

- **id**: The ID of the task to mark.
- **status**: The new status for the task ("in-progress" or "done").

**Example:**

```bash
task mark 1 "done"
```

## Contributing

1.  **Fork the repository**
2.  **Create a new branch:**

```bash
git checkout -b feature/YourFeature
```

3.  **Commit your changes:**

```bash
git commit -am 'Add new feature'
```

4.  **Push to the branch:**

```bash
git push origin feature/YourFeature
```

5.  **Create a new Pull Request**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Project URL ([roadmap.sh](https://roadmap.sh))
```
https://roadmap.sh/projects/task-tracker
```
