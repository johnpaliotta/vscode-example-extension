# vscode-extension-example

This is an example extension that has examples of all of the pieces
that Bobally extensions might use.  In GitHub this repo is marked
as a template.

## Usage

To use this template to create a new repository: 

- Navigate to [the repo](https://github.com/johnpaliotta/vscode-example-extension),
click the button: "Use this Template" in the upper right of the page, 
and choose "Create a new Repository" from the drop down.

- Clone the new repository and replace all instances of: "vscode-extension-example"
with the appropriate name of the new extension.


## Commands and Extension Calls

There are place holders for the following things

The package.json defines the following commands

- example-command-1 -> shown in the command pallette menu -> pops up a message dialog
- example-command-2 -> activated from right click on lines with flask icon

The extension.ts file has calls the following files.functions

 - messagePane.displayMessage()          - which displays a message in a custom "vscode-estension-example" output pane
 - client.activateLanguageServerClient() - which starts the lang server and handles auto completions
 - decorator.updateGutterDecorations()   - which initializes the gutter decorations if a file is open
 
The extension.ts file registers the following handlers

- onDidChangeActiveTextEditor


## User Facing Features

Run the extension and open the ./tests directory and open file example.cpp, notice

- A Flask Icon should be displayed in the gutter on lines 4 and 6

Chjeck that the following user actions are available 

 - CTRL-SHIFT-P -> Example Command 1 -> should result in an info popup message 
 - Typing: "// hello " on a new line -> should show Auto-complete list with [cindi, john, kids]
 - View -> Output                    -> vscode-extension-example and -server should be in pull-down
 - Right click on flask icons        -> example-command-2 should be shown
 - example-command-2                 -> should result in an info popup message 
