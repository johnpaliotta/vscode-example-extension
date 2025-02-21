
// This file contains functions that allow the extension to log
// status to a dedicated output pane in VSCode

// I created this simple wrapper in case we add other features

// This object creates a new output pane in the running extension
// To access: View -> Output, then choose "Output" tab, and pull
// down on the list to the right until you see vTestAdvisor


import * as vscode from "vscode";



let messagePane: vscode.OutputChannel = vscode.window.createOutputChannel(
    "vscode-extension-example"
);


export enum errorLevel {
    error = "[error]",
    warn = "[warn] ",
    info = "[info] ",
    trace = "[trace]",
}

function formattedLine(
    level: errorLevel,
    indent: string,
    line: string
): string {
    let returnString: string = "";
    returnString = level.padEnd(8) + indent + line;
    return returnString;
}


// Note that this is an aysnc function so to if you are using to display
// a message before a long-running process, use await in the caller.
export const indentString = "   "; // for consistency
export async function displayMessage(
    msg: string,
    level: errorLevel = errorLevel.info,
    indent: string = ""
) {
    if (
        level !== errorLevel.trace ||
        (level === errorLevel.trace && globalVerboseOn)
    ) {

        let stringList = msg.split("\n");
        // for errorLevel.error, we show the first line of the msg in a popup
        if (level === errorLevel.error) {
            vscode.window.showErrorMessage(stringList[0]);
        }
        for (let line of stringList) {
            messagePane.appendLine(formattedLine(level, indent, line));
        }
    }
}


let globalVerboseOn: boolean = false;
export function adjustVerboseSetting() {
    const settings = vscode.workspace.getConfiguration("vscode-extension-example");
    globalVerboseOn = settings.get("verboseLogging", false);
}

let globalLogIsOpen: boolean = false;
export function openMessagePane() {
    messagePane.show();
    globalLogIsOpen = true;
}

export function closeMessagePane() {
    messagePane.hide();
    globalLogIsOpen = false;
}

export function toggleMessageLog() {
    if (globalLogIsOpen) {
        messagePane.hide();
        globalLogIsOpen = false;
    } else {
        messagePane.show();
        globalLogIsOpen = true;
    }
}
