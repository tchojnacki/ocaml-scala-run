import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('ocaml-scala-run.runOCaml', () => {
		vscode.window.showInformationMessage('Hello World from ocaml-scala-run!');
	}));

	context.subscriptions.push(vscode.commands.registerCommand('ocaml-scala-run.runScala', () => {
		vscode.window.showInformationMessage('Hello World from ocaml-scala-run!');
	}));
}

export function deactivate() { }
