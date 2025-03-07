
import {
    TextDocument,
    CompletionItem,
    CompletionItemKind,
} from "vscode-languageserver";

import { Position, Range, InsertTextFormat } from "vscode-languageserver-types";


export function buildCompletionList(
    choiceList: string[],
    choiceKind: CompletionItemKind
): CompletionItem[] {
    // the format of what comes in here looks like a list of strings
    // formatted as textValue or textValue@extraInfo

    let i;
    let returnList: CompletionItem[] = [];
    for (i = 0; i < choiceList.length; i++) {
        const rawData = choiceList[i];
        returnList.push({
            label: rawData,
            kind: choiceKind,
            detail: "",
        });
    }
    return returnList;
}

export function getLineFragment(document: TextDocument, position: Position) {
    const startOfLinePosition: Position = Position.create(position.line, 0);
    const rangeOfInterest: Range = Range.create(startOfLinePosition, position);
    return document.getText(rangeOfInterest);
}