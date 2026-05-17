import client from "../lib/convex.js";
import boxen from "boxen";
import chalk from "chalk";

export function listCommand(program) {
    program
        .command("list")
        .action(async () => {
            const result = await client.query("gists:getAllGists", {});
            result.forEach((gist) => {
                const contentPreview = gist.content.replace(/\r/g, "").slice(0, 600);
                const card = chalk.bold.cyan(`${gist.user}`) +
                    "\nFile: " + chalk.yellow(gist.fileName) +
                    "\nLanguage: " + chalk.magenta(gist.language) +
                    "\nCreated: " + new Date(gist.createdAt).toLocaleDateString() +
                    "\nContent:\n" + contentPreview;
                console.log(
                    boxen(card, { padding: 1 })
                )
            });


        });
}