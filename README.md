# Gists CLI

A powerful command-line interface tool for managing code snippets (gists) powered by a Convex backend. This tool allows you to easily create, view, list, update, and delete gists directly from your terminal.

## Features

- **Create**: Save code snippets from local files.
- **List**: Browse all your saved gists in a nicely formatted UI.
- **View**: Inspect a specific gist by its ID.
- **Update**: Modify existing gists.
- **Delete**: Remove gists safely with an interactive prompt.

## Prerequisites

- **Node.js** (v14 or higher recommended)
- **Convex** Database setup and environment variables (`.env.local`)

## Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <your-repo-url>
   cd Gists
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Ensure you have your `.env.local` configured with your Convex URL:
   ```env
   CONVEX_URL="your-convex-deployment-url"
   ```

4. You can link the tool globally using npm (optional):
   ```bash
   npm link
   ```
   *(If not linked globally, use `node src/index.js` instead of `gist` in the commands below).*

## Usage

### 1. Create a Gist
Upload a file's content to your database as a new gist.
```bash
gist create --file <path_to_file> --lang <programming_language> [--user <username>]
```
**Example:**
```bash
gist create --file package.json --lang json --user john_doe
```

### 2. List Gists
View all created gists in your terminal. This command displays beautifully formatted cards with the gist details and a preview of the content.
```bash
gist list
```

### 3. View a Gist
View details and content of a specific gist using its ID.
```bash
gist view -i <gist_id>
```

### 4. Update a Gist
Update an existing gist's file content or language.
```bash
gist update -i <gist_id> [--file <new_path_to_file>] [--lang <new_language>]
```
**Example:**
```bash
gist update -i j57... --lang javascript
```

### 5. Delete a Gist
Delete a specific gist. You will be prompted to confirm before the deletion completes.
```bash
gist delete -i <gist_id>
```

## Technologies Used

- [Commander.js](https://github.com/tj/commander.js) - Command-line interface framework.
- [Convex](https://www.convex.dev/) - Reactive backend database.
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) - Interactive CLI prompts.
- [Boxen](https://github.com/sindresorhus/boxen) & [Chalk](https://github.com/chalk/chalk) - Terminal styling.

## License

ISC License
