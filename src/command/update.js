import fs from "fs";
import path from "path";
import client from "../lib/convex.js";

export function updateCommand(program) {
  program
    .command("update")
    .option("-i, --id <id>","gist id")
    .option("--file [path]", "path to file")
    .option("--lang [language]", "programming language")
    .action(async (options) => {
        if(!options.id){
            console.log("Id is required");
                process.exit(1);
        }
        const fileName = options.file ? path.basename(options.file) : undefined;
        const fileContents = options.file ? fs.readFileSync(options.file, "utf-8") : undefined;
        const result=await client.mutation("gists:updateGist",{
            id: options.id,
            fileName: fileName,
            language: options.lang,
            content: fileContents,
        })
        console.log("Gist Updated!!");
    });
}