import client from "../lib/convex.js";
import boxen from "boxen";
import chalk from "chalk";

export function viewCommand(program) {
  program
    .command("view")
    .option("-i, --id <id>","Enter the id")
    .action(async (options) => {
        const result = await client.query("gists:getGistsById",{id: options.id});
        const card = chalk.bold.cyan(`${result.user}`) + 
             "\nFile: " + chalk.yellow(result.fileName) +
             "\nLanguage: " + chalk.magenta(result.language) +
             "\nCreated: " + new Date(result.createdAt).toLocaleDateString() +
             "\nContent:\n" + result.content.slice(0, 200);
            console.log(
                boxen(card.slice(0,400),{padding:1})
            );  
    });
}