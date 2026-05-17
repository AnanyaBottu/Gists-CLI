import fs from "fs";
import path from "path";
import client from "../lib/convex.js";

export function createCommand(program) {
  program
    .command("create")
    .description("Create a new gist from a file")
    .requiredOption("--file <path>", "path to file")
    .requiredOption("--lang <language>", "programming language")
    .option("--user <name>", "username", "anonymous")
    .action(async (options) => {
        try {
            const fileName = path.basename(options.file);
            const fileContents = fs.readFileSync(options.file, "utf-8");
            
            const result = await client.mutation("gists:createGist", {
                user: options.user,
                fileName: fileName,
                language: options.lang,
                content: fileContents,
                createdAt: Date.now(),
            });
            
            console.log(`Gist Created!! ID: ${result}`);
        } catch (error) {
            console.error("Failed to create gist:", error.message);
            process.exitCode = 1;
        }
    });
}
