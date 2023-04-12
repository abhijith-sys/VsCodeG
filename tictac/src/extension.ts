// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { window, ViewColumn, ExtensionContext } from 'vscode';
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed



export function activate(context: vscode.ExtensionContext) {
	function createWebviewPanel(context: ExtensionContext) {
		const panel = window.createWebviewPanel(
		  'helloWorld',
		  'Hello World',
		  ViewColumn.One,
		  {}
		);
	  
		panel.webview.html = `
		  <html>
			<head>
			  <style>
				body {
				  color: red;
				}
			  </style>
			</head>
			<body>
			  <h1>Hello</h1>
			</body>
		  </html>
		`;
	  }
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "tictac" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('tictac.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user

		createWebviewPanel(context);
		vscode.window.showInformationMessage('!!!!!!!!!!!!!  new Game !');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
