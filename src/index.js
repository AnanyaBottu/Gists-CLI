import { program } from "commander";
import { createCommand } from "./command/create.js"
import { updateCommand } from "./command/update.js"
import { deleteCommand } from "./command/delete.js"
import { listCommand } from "./command/list.js"
import { viewCommand } from "./command/view.js"

program
    .name("gist")
    .description("Gist CLI")
    .version("1.0.0");

createCommand(program);
updateCommand(program);
deleteCommand(program);
listCommand(program);
viewCommand(program);
program.parse(process.argv);