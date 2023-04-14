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

    const htmlPath = vscode.Uri.joinPath(
      context.extensionUri,
      "media",
      "index.html"
    );
    const stylePath = vscode.Uri.joinPath(
      context.extensionUri,
      "media",
      "style.css"
    );
    const scriptPath = vscode.Uri.joinPath(
      context.extensionUri,
      "media",
      "main.js"
    );
    const threejsScriptPath = vscode.Uri.joinPath(
      context.extensionUri,
      "media",
      "threejs.js"
    );
    const htmlContent = panel.webview.asWebviewUri(htmlPath);
    const styleContent = panel.webview.asWebviewUri(stylePath);

    const mainScript = panel.webview.asWebviewUri(scriptPath);
    const threejsScript = panel.webview.asWebviewUri(threejsScriptPath);

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
      <script src=${mainScript}></script>
    </head>
    
    <body>
      <div id="main">
        <h1>TIC TAC TOE</h1>
        <div id="canvas"></div>
        <!-- Game Instructions -->
        <p id="ins">Game starts by just Tap on
          box<br><br>First Player starts as
          <b>Player X</b><br>And<br>Second
          Player as <b>Player 0</b>
        </p>
        <br><br>
        <!-- 3*3 grid of Boxes -->
        <input type="text" id="b1" onclick="myfunc_3(); myfunc();" readonly>
    
        <input type="text" id="b2" onclick="myfunc_4(); myfunc();" readonly>
    
        <input type="text" id="b3" onclick="myfunc_5(); myfunc();" readonly>
        <br><br>
    
        <input type="text" id="b4" onclick="myfunc_6(); myfunc();" readonly>
    
        <input type="text" id="b5" onclick="myfunc_7(); myfunc();" readonly>
    
        <input type="text" id="b6" onclick="myfunc_8(); myfunc();" readonly>
        <br><br>
    
        <input type="text" id="b7" onclick="myfunc_9(); myfunc();" readonly>
    
        <input type="text" id="b8" onclick="myfunc_10();myfunc();" readonly>
    
        <input type="text" id="b9" onclick="myfunc_11();myfunc();" readonly>
    
        <!-- Grid end here  -->
        <br><br><br>
        <!-- Button to reset game -->
        <button id="but" onclick="myfunc_2()">
          RESET
        </button>
    
        <br><br>
        <!-- Space to show player turn -->
        <p id="print"></p>
      </div>
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
          vscode.Uri.file(context.asAbsolutePath(" media/tic/dist/")) )}" />
      <title>My React Panel</title>
      <link rel="stylesheet" href="assets/index.css" />
    </head>
    
    <body>
      <div id="root"></div>
      <script src="assets/index.js"></script>
    </body>
    
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
    vscode.window.showInformationMessage("!!!!!!!!!!!!!  new Game !");
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
