
import * as url from "url";

import {
    CompletionItem,
    CompletionParams,
    createConnection,
    DidChangeConfigurationNotification,
    InitializeParams,
    ProposedFeatures,
    TextDocument,
    TextDocuments,
} from "vscode-languageserver";

import { Hover } from "vscode-languageserver-types";

import { buildCompletionList, getLineFragment } from "./serverUtilities";


// Create a connection for the server. The connection uses Node's IPC as a transport.
// Also include all preview / proposed LSP features.
let connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager. The text document manager
// supports full document sync only
let textDocumentManager: TextDocuments = new TextDocuments();

connection.onInitialize((params: InitializeParams) => {
    // reads the params passed to the server
    // and initializes globals for vpyton path etc.

    connection.console.log("\nInitializing Language Server");
    connection.console.log("  extensionRoot:   " + process.argv[2]);
    connection.console.log("  second argument: " + process.argv[3]);

    return {
        capabilities: {
            textDocumentSync: textDocumentManager.syncKind,
            hoverProvider: true,
            // Tell the client that the server supports code completion
            completionProvider: {
                resolveProvider: true,
                triggerCharacters: ["\n", ":", ".", ",", " ", "="],
            },
        },
    };
});


const helloRegex = /^\s*\/\/\s*hello\s*/;
async function performCompletionProcessing(
    currentDocument: TextDocument,
    completionData: CompletionParams
): Promise<CompletionItem[]> {

    // TBD: Implement the actual completion logic here
    // As an example we have some dummy logic that will return a static
    // choice list of the user enters // hello in a .cpp file
    const filePath = url.fileURLToPath(completionData.textDocument.uri);
    let returnList: CompletionItem[] = [];
    if (filePath.endsWith(".cpp")) {
        // check what the user has typed
        const lineSoFar: string = getLineFragment(
            currentDocument,
            completionData.position
        ).trimEnd();

        if (helloRegex.test(lineSoFar)) {
            const completionList = [
                "john",
                "cindi",
                "kids",
            ];
            returnList = buildCompletionList(completionList, 1);
        }
    }
    return returnList;
}

// This function gets called whenever there is a completion opportunity in the current editor
connection.onCompletion(
    async (completionData: CompletionParams): Promise<CompletionItem[]> => {
        const currentDocument = textDocumentManager.get(
            completionData.textDocument.uri
        );
        if (currentDocument) {
            return await performCompletionProcessing(currentDocument, completionData);
        } else {
            // no text document, do nothing
            return [];
        }
    }
);

// This function gets called when the user hovers over an editor item
// TBD: this is a nonsense example that always retuns the same thing
connection.onHover(
    async (completionData: CompletionParams): Promise<Hover | undefined> => {
        if (completionData.textDocument.uri.endsWith(".cpp")) {
            const hoverString = "Bobally hover string for a .cpp file";
            const hover: Hover = { contents: hoverString };
            return hover;
        } else {
            return undefined;
        }
    }
);



// Make the text document manager listen on the connection
// for open, change and close text document events
textDocumentManager.listen(connection);

// Listen on the connection
connection.listen();