import * as vscode from "vscode";
import { DecorationRenderOptions, TextEditorDecorationType } from "vscode";

import { getRangeOption } from "./utilities";

let gutterDecorationType: TextEditorDecorationType;
let gutterDecorationList: vscode.DecorationOptions[] = [];

let highlightDecorationType: TextEditorDecorationType;
let highlightDecorationList: vscode.DecorationOptions[] = [];

let clickableLineList: number[] = [];


export function initializeDecorationTypes(context: vscode.ExtensionContext) {

    // TBD: replace with whatever icon you want to use, beaker is just a sample svg 
    // to show how to use light and dark versions of icons
    let gutterOptions: DecorationRenderOptions;
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

    // replace with whatever highlight color you want to use, the sample uses yellow with black
    let highlightOptions: DecorationRenderOptions;
    // Add "isWholeLine": true," if you wnat the highlight to cover the full width of the editor
    highlightOptions = {
        "color": "#1f1f1f",
        "backgroundColor": "#ffcc00",
    };
    highlightDecorationType = vscode.window.createTextEditorDecorationType(highlightOptions);

}

export function applyGutterDecorations(lineList: number[]) {

    let activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
        // toss the old data
        gutterDecorationList = [];
        clickableLineList = [];
        const filePath = activeEditor.document.fileName;

        if (filePath.endsWith(".cpp")) {

            for (let i = 0; i < lineList.length; i++) {
                gutterDecorationList.push(getRangeOption(lineList[i] - 1));
                clickableLineList.push(lineList[i]);
            }

            // update the gutter icon decorations
            activeEditor.setDecorations(
                gutterDecorationType,
                gutterDecorationList
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

export function applyHighlightDecorations(lineList: number[]) {

    let activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
        // toss the old data
        highlightDecorationList = [];

        for (let i = 0; i < lineList.length; i++) {
            // TBD: we could perfectly find the end column but this works fine
            highlightDecorationList.push(getRangeOption(lineList[i] - 1, 200));
        }

        // update the highlight decorations
        activeEditor.setDecorations(
            highlightDecorationType,
            highlightDecorationList
        );
    }
}

