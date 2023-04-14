// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

import { window, ViewColumn, ExtensionContext } from "vscode";
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
// /home/alenjoy/Desktop/vscodeExtension/VsCodeG/tictac/src/index.html
export function activate(context: vscode.ExtensionContext) {
  function createWebviewPanel(context: ExtensionContext) {
    const panel = window.createWebviewPanel(
      "helloWorld",
      "tic tac",
      ViewColumn.One,
      {
        enableScripts: true,
      }
    );

    const stylePath = vscode.Uri.joinPath(
      context.extensionUri,
      "media",
      "style.css"
    );
    const threejsScriptPath = vscode.Uri.joinPath(
      context.extensionUri,
      "media",
      "threejs.js"
    );
    const styleContent = panel.webview.asWebviewUri(stylePath);

    const threejsScript = panel.webview.asWebviewUri(threejsScriptPath);
    // <h1>TIC TAC TOE</h1>
    const htmlTemplate = `
    <!DOCTYPE html>

    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
      <link rel="stylesheet" href="${styleContent}">
    
      <script async src="https://unpkg.com/es-module-shims@1.6.3/dist/es-module-shims.js"></script>
    
      <script type="importmap">
        {
          "imports": {
            "three": "https://unpkg.com/three@0.151.3/build/three.module.js",
            "three/addons/": "https://unpkg.com/three@0.151.3/examples/jsm/"
          }
        }
        </script>
      <script type="module" src=${threejsScript}></script>
    </head>
    
    <body>
    <h1 id="gameresult"></h1>
    </body>
    
    </html>
`;
    const reactPanelHtml = `
    <!DOCTYPE html>
    <html>
    
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="Content-Security-Policy"
        content="default-src 'none'; script-src 'self' vscode-resource:; style-src 'self' vscode-resource: 'unsafe-inline'; img-src vscode-resource: data:;">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <base href="${panel.webview.asWebviewUri(
        vscode.Uri.file(context.asAbsolutePath("media/tic/dist/"))
      )}" />
      <title>My React Panel</title>
      <link rel="stylesheet" href="assets/index.css" />
    </head>
    
    <body>
      <div id="root"></div>
      <script src="assets/index.js"></script>
    </body>
    <div id="canvas"></div>
    </html>
`;
    panel.webview.html = htmlTemplate;
  }
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "tictac" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("tictac.helloWorld", () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user

    createWebviewPanel(context);
    vscode.window.showInformationMessage("TIC TAC TOE ! new Game !");
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
