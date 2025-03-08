// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { applyGutterDecorations, applyHighlightDecorations, initializeDecorationTypes } from "./decorator";

import { displayMessage, errorLevel } from "./common/messagePane";
import { activateLanguageServerClient } from "./langserver/client";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// These commands have been defined in the package.json file
	// Now provide the implementation of the commands with registerCommand
	// The commandId parameter must match the command field in package.json
	const cmd1 = vscode.commands.registerCommand('vscode-extension-example.example-command-1', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Example-Command-1 has been selected!');
	});
	context.subscriptions.push(cmd1);

	// Note that in the package.json file, example-command-2 has when=never in the 
	// "menus" -> "commandPalette" section. This means that the command will not be
	// displayed in the command palette. However, it can still be executed by other actions
	const cmd2 = vscode.commands.registerCommand('vscode-extension-example.example-command-2', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Example-Command-2 has been selected!');
	});
	context.subscriptions.push(cmd2);

	displayMessage("Hello from the extension", errorLevel.info);

	// TBD: remove if you don't need a language server
	activateLanguageServerClient(context);

	// TBD: remove if you are not using decorations
	// Initialize all decoration types
	initializeDecorationTypes(context);

	// TBD: example of adding gutter decorations
	const gutterDecorationList = [6, 9];
	applyGutterDecorations(gutterDecorationList);

	// TBD: example of adding highlight decorations	
	applyHighlightDecorations([6]);

	// This gets called when the user changes tabs
	vscode.window.onDidChangeActiveTextEditor(
		// this function gets called when the user changes the
		// active editor, including when closing an editor
		// in which case the "editor" parameter will be undefined
		(editor) => {
			if (editor) {
				// TBD: remove if you don't need a gutter decorator, or add "real" line numbers
				const gutterDecorationList = [6, 9];
				applyGutterDecorations(gutterDecorationList);
				applyHighlightDecorations([6]);
			}
		},
		null,
		context.subscriptions
	);


	// This gets called when the user edits a file - even if not saved
	vscode.workspace.onDidChangeTextDocument(
		async (editor) => {
			if (editor) {
				// TBD: remove if you don't need a gutter decorator, or add "real" line numbers
				const gutterDecorationList = [6, 9];
				applyGutterDecorations(gutterDecorationList);
				applyHighlightDecorations([6]);
			}
		},
		null,
		context.subscriptions
	);


	// This gets called when the user saves | auto-saves a file
	vscode.workspace.onDidSaveTextDocument(
		async (editor) => {
			if (editor) {
				;
			}
		},
		null,
		context.subscriptions
	);

}



// This method is called when your extension is deactivated
export function deactivate() { }
