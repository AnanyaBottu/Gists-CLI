import client from "../lib/convex.js";
import { highlight } from "cli-highlight";
import blessed from "blessed";

export function listCommand(program) {
    program
        .command("list")
        .action(async () => {
            const result = await client.query("gists:getAllGists", {});
            if (result.length === 0) {
                console.log("No gists found.");
                return;
            }
            const screen=blessed.screen({
                smartCSR: true,
                title: "Gist CLI",                
            });
            screen.key(['q','C-c'],()=>process.exit(1));
            const leftPanel=blessed.list({
                width: '30%',
                height: '100%',
                border: {type: 'line'},
                keys: true,
                label: "Gists",
                mouse: true,
                vi: true,
                style: {selected: {bg: 'blue'}}
            })
            leftPanel.setItems(result.map(ele=>ele.fileName));
            const rightPanel=blessed.box({
                left: "30%",
                width: "70%",
                height: "100%",
                border: { type: "line" },
                label: " Content ",
                tags: true,
                scrollable: true,
                keys: true,
                vi: true,
                mouse: true,
            });
            screen.key("tab", () => {
                if (leftPanel.focused) {
                    rightPanel.focus();
                } else {
                    leftPanel.focus();
                }
                screen.render();
            });
            screen.append(leftPanel);
            screen.append(rightPanel);
            screen.render();
            leftPanel.focus();
            let highlighted = result[0].content;
            try {
                highlighted = highlight(result[0].content, { language: result[0].language });
            } catch {
                // silent fallback
            }
            rightPanel.setContent(`{bold}{cyan-fg}${result[0].user}{/cyan-fg}{/bold}
                \nFile: {yellow-fg}${result[0].fileName}{/yellow-fg}
                \nLanguage: {magenta-fg}${result[0].language}{/magenta-fg}
                \nCreated: ${new Date(result[0].createdAt).toLocaleDateString()}
                \nContent:\n${highlighted}`);

            leftPanel.on("select item", (item, index) => {
                const gist = result[index];
                let highlighted=gist.content;
                try {
                    highlighted = highlight(gist.content, { language: gist.language });
                } catch {
                    // silent fallback to plain content
                }
                const card = `{bold}{cyan-fg}${gist.user}{/cyan-fg}{/bold}
                    \nFile: {yellow-fg}${gist.fileName}{/yellow-fg}
                    \nLanguage: {magenta-fg}${gist.language}{/magenta-fg}
                    \nCreated: ${new Date(gist.createdAt).toLocaleDateString()}
                    \nContent:\n${highlighted}`;

                rightPanel.setContent(card);
                screen.render();
            });
        });
}