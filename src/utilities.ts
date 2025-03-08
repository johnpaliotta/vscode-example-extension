
import * as vscode from "vscode";

export function getRangeOption(lineIndex: number, endColumn = 0): vscode.DecorationOptions {
    // this function returns a single line range DecorationOption
    const startPos = new vscode.Position(lineIndex, 0);
    const endPos = new vscode.Position(lineIndex, endColumn);
    return { range: new vscode.Range(startPos, endPos) };
}