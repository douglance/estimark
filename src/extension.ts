import * as vscode from "vscode";
import Feature from "./feature";
import Specification from "./specification";

export function activate(context: vscode.ExtensionContext) {
  console.log("Hey buddy, it's your esti-mate!");
  const specification = new Specification("", vscode.window.activeTextEditor);
  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument(document => {
      if (!specification.editor) {
        console.log("Not active editor");
        return;
      }
      specification.source = document.getText();
      specification.parse();
    }),
    vscode.workspace.onDidChangeTextDocument(({ document, contentChanges }) => {
      if (!specification.editor) {
        console.log("Not active editor");
        return;
      }
      specification.source = document.getText();
      specification.parse();
      specification.parse();
    })
  );

  let disposable = vscode.commands.registerCommand("extension.estimate", () => {
    vscode.window.showInformationMessage("Hello World!!");
  });
  context.subscriptions.push(disposable);
}

export function deactivate() {}
