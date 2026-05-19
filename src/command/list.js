import client from "../lib/convex.js";
import boxen from "boxen";
import chalk from "chalk";
import { highlight } from "cli-highlight";

export function listCommand(program) {
    program
        .command("list")
        .action(async () => {
            const result = await client.query("gists:getAllGists", {});
            result.forEach((gist) => {
                const contentPreview = gist.content.replace(/\r/g, "").slice(0, 600);
                let highlighted = contentPreview;
                try {
                    highlighted = highlight(gist.content, { language: gist.language });
                } catch(err) {
                    console.log(chalk.red("Error fetching gists: " + err.message));
                }
                const card = chalk.bold.cyan(`${gist.user}`) +
                    "\nFile: " + chalk.yellow(gist.fileName) +
                    "\nLanguage: " + chalk.magenta(gist.language) +
                    "\nCreated: " + new Date(gist.createdAt).toLocaleDateString() +
                    "\nContent:\n" + highlighted;
                console.log(
                    boxen(card, { padding: 1 })
                )
            });


        });
}