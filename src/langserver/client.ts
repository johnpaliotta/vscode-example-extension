import * as path from "path";
import { ExtensionContext } from "vscode";

import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    TransportKind,
} from "vscode-languageclient";

import { displayMessage } from "../common/messagePane";


let client: LanguageClient;

export function activateLanguageServerClient(context: ExtensionContext) {

    // The server is implemented in nodejs also
    let serverModule = context.asAbsolutePath(path.join("out", "server.js"));

    // The debug options for the server
    // --inspect=6009: runs the tserver in Node's Inspector mode so VS Code can attach to the server for debugging
    let debugOptions = { execArgv: ["--nolazy", "--inspect=6009"] };

    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used

    // TBD: replace "dummy-argument" with any actual argument needed by the server

    let serverOptions: ServerOptions = {
        run: {
            module: serverModule,
            args: [
                context.asAbsolutePath("."),
                "dummy-argument",
            ],
            transport: TransportKind.ipc,
        },
        debug: {
            module: serverModule,
            args: [
                context.asAbsolutePath("."),
                "dummy-argument",
            ],
            transport: TransportKind.ipc,
            options: debugOptions,
        },
    };

    // Options to control the language client
    // TBD: add additional file extensions as needed
    // You can register multiple fiole extensions and then do the 
    // right thing in the callback depending on the extension of the file
    let clientOptions: LanguageClientOptions = {
        documentSelector: [
            { scheme: "file", language: "c" },
            { scheme: "file", language: "cpp" },
            { scheme: "file", language: "cuda-cpp" },
        ],
    };

    // Create the language client and start the client.
    client = new LanguageClient(
        "vscode-extension-example server",
        "vscode-extension-example server",
        serverOptions,
        clientOptions
    );

    // Start the client. This will also launch the server
    displayMessage(
        "Starting the language server client ..."
    );
    client.start();

}
