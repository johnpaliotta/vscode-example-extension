import * as vscode from "vscode";
import { DecorationRenderOptions, TextEditorDecorationType } from "vscode";

import { getRangeOption } from "./utilities";

let gutterOptions: DecorationRenderOptions;
let gutterDecorationType: TextEditorDecorationType;
let gutterDecorations: vscode.DecorationOptions[] = [];
let clickableLineList: number[] = [];


export function initializeGutterDecorator(context: vscode.ExtensionContext) {
    // TBD: replace with whatever icon you want to use, beaker is just a sample svg 
    // to show how to use light and dark versions of icons
    gutterOptions = {
        light: {
            gutterIconPath: context.asAbsolutePath("./images/light/beaker.svg"),
        },
        dark: {
            gutterIconPath: context.asAbsolutePath("./images/dark/beaker.svg"),
        },
    };
    gutterDecorationType = vscode.window.createTextEditorDecorationType(
        gutterOptions
    );
}

export function updateGutterDecorations() {

    let activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
        // toss the old data
        gutterDecorations = [];
        clickableLineList = [];
        const filePath = activeEditor.document.fileName;

        if (filePath.endsWith(".cpp")) {

            // TBD: this is hard-coded to put an icon on lines 4 and 6
            // note that the decoration is 0-based, so line 4 is actually index 3
            gutterDecorations.push(getRangeOption(3));
            gutterDecorations.push(getRangeOption(5));
            // TBD: this variable is used to enable and disable the right-click menu
            // for a particular line.  Look for clickableLineList in package.json
            clickableLineList.push(4);
            clickableLineList.push(6);

            // update the gutter icon decorations
            activeEditor.setDecorations(
                gutterDecorationType,
                gutterDecorations
            );

            // push the updated clickableLineList to control content (right click) menu choices
            vscode.commands.executeCommand(
                "setContext",
                "vscode-extension-example.clickableLineList",
                clickableLineList
            );
        }
    }
}