import client from "../lib/convex.js";
import boxen from "boxen";
import chalk from "chalk";
import { highlight } from "cli-highlight";

export function viewCommand(program) {
  program
    .command("view")
    .option("-i, --id <id>","Enter the id")
    .action(async (options) => {
        const result = await client.query("gists:getGistsById",{id: options.id});
        let highlighted = result.content;
        try {
            highlighted = highlight(result.content, { language: result.language });
        } catch(err) {
            console.log(chalk.red("Error fetching gists: " + err.message));
        }
        const card = chalk.bold.cyan(`${result.user}`) + 
             "\nFile: " + chalk.yellow(result.fileName) +
             "\nLanguage: " + chalk.magenta(result.language) +
             "\nCreated: " + new Date(result.createdAt).toLocaleDateString() +
             "\nContent:\n" + highlighted.slice(0,600);
            console.log(
                boxen(card.slice(0,400),{padding:1})
            );  
    });
}