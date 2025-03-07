import * as vscode from "vscode";
import { DecorationRenderOptions, TextEditorDecorationType } from "vscode";

import { getRangeOption } from "./utilities";

let gutterOptions: DecorationRenderOptions;
let gutterDecorationType: TextEditorDecorationType;
let gutterDecorations: vscode.DecorationOptions[] = [];
let clickableLineList: number[] = [];


export function initializeGutterDecorations(context: vscode.ExtensionContext) {
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

export function applyGutterDecorations(lineList: number[]) {

    let activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
        // toss the old data
        gutterDecorations = [];
        clickableLineList = [];
        const filePath = activeEditor.document.fileName;

        if (filePath.endsWith(".cpp")) {

            for (let i = 0; i < lineList.length; i++) {
                gutterDecorations.push(getRangeOption(lineList[i]-1));
                clickableLineList.push(lineList[i]);
            }

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