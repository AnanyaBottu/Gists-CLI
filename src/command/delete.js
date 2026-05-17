import client from "../lib/convex.js";
import inquirer from "inquirer";

export function deleteCommand(program) {
  program
    .command("delete")
    .option("-i, --id <id>","gist id")
    .action(async (options) => {
        if(!options.id){
            console.log("Id is required");
                process.exit(1);
        }
        const choice=await inquirer.prompt({
            type: "confirm",
            name: "sure",
            message: "Are you sure?"
        });
         if(choice.sure){
            const result=await client.mutation("gists:deleteGist",{id: options.id});
            console.log("Gist Deleted!!");
         }
         else{
            console.log("Gist not Deleted!!");
         }
    });
}