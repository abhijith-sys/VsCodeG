/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __webpack_require__(1);
const vscode_1 = __webpack_require__(1);
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
// /home/alenjoy/Desktop/vscodeExtension/VsCodeG/tictac/src/index.html
function activate(context) {
    function createWebviewPanel(context) {
        const panel = vscode_1.window.createWebviewPanel("helloWorld", "tic tac", vscode_1.ViewColumn.One, {
            enableScripts: true,
        });
        const htmlPath = vscode.Uri.joinPath(context.extensionUri, "media", "index.html");
        const stylePath = vscode.Uri.joinPath(context.extensionUri, "media", "style.css");
        const scriptPath = vscode.Uri.joinPath(context.extensionUri, "media", "main.js");
        const threejsScriptPath = vscode.Uri.joinPath(context.extensionUri, "media", "threejs.js");
        const htmlContent = panel.webview.asWebviewUri(htmlPath);
        const styleContent = panel.webview.asWebviewUri(stylePath);
        const mainScript = panel.webview.asWebviewUri(scriptPath);
        const threejsScript = panel.webview.asWebviewUri(threejsScriptPath);
        // panel.webview.html = `<!DOCTYPE html>
        //   <html lang="en">
        //   <head>
        //       <meta charset="UTF-8">
        //       <meta http-equiv="X-UA-Compatible" content="IE=edge">
        //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //       <title>Document</title>
        //       <link rel="stylesheet" href="${styleContent}">
        //   </head>
        //   <body>
        //       <div id="intro-screen" class="center">
        //           <h2>Choose your symbol:</h2>
        //           <button type="button" id="choose-x" class="choose">X</button>
        //           <button type="button" id="choose-o" class="choose">O</button>
        //       </div>
        //       <div id="enemy-screen" class="center hidden">
        //           <h2>Play against:</h2>
        //           <button type="button" id="choose-human" class="choose">Human</button>
        //           <button type="button" id="choose-cpu" class="choose">CPU</button>
        //       </div>
        //       <div id="game-screen" class="center hidden">
        //           <!-- Every cell has an id "cell" followed by cell row and cell column -->
        //           <table class="center">
        //               <tr>
        //                   <td>
        //                       <button type="button" class="cell" id="cell00"></button>
        //                   </td>
        //                   <td>
        //                       <button type="button" class="cell" id="cell01"></button>
        //                   </td>
        //                   <td>
        //                       <button type="button" class="cell" id="cell02"></button>
        //                   </td>
        //               </tr>
        //               <tr>
        //                   <td>
        //                       <button type="button" class="cell" id="cell10"></button>
        //                   </td>
        //                   <td>
        //                       <button type="button" class="cell" id="cell11"></button>
        //                   </td>
        //                   <td>
        //                       <button type="button" class="cell" id="cell12"></button>
        //                   </td>
        //               </tr>
        //               <tr>
        //                   <td>
        //                       <button type="button" class="cell" id="cell20"></button>
        //                   </td>
        //                   <td>
        //                       <button type="button" class="cell" id="cell21"></button>
        //                   </td>
        //                   <td>
        //                       <button type="button" class="cell" id="cell22"></button>
        //                   </td>
        //               </tr>
        //           </table>
        //           <button type="button" id="restart">Restart</button>
        //           <div>
        //   </body>
        //   <script src=${mainScript}></script>
        //   </html>`;
        const htmlTemplate = `<!DOCTYPE html>
   
    <head>
        <meta name="viewport" content=
            "width=device-width, initial-scale=1.0">
       
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
        <script  src=${mainScript}></script>
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
            <input type="text" id="b1" onclick=
                "myfunc_3(); myfunc();" readonly>
       
            <input type="text" id="b2" onclick=
                "myfunc_4(); myfunc();" readonly>
       
            <input type="text" id="b3" onclick=
                "myfunc_5(); myfunc();" readonly>
            <br><br>
       
            <input type="text" id="b4" onclick=
                "myfunc_6(); myfunc();" readonly>
                   
            <input type="text" id="b5" onclick=
                "myfunc_7(); myfunc();" readonly>
       
            <input type="text" id="b6" onclick=
                "myfunc_8(); myfunc();" readonly>
            <br><br>
       
            <input type="text" id="b7" onclick=
                "myfunc_9(); myfunc();" readonly>
       
            <input type="text" id="b8" onclick=
                "myfunc_10();myfunc();" readonly>
       
            <input type="text" id="b9" onclick=
                "myfunc_11();myfunc();" readonly>
       
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
       
    </!DOCTYPE>`;
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
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map