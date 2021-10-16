import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10);
	statusBarItem.text = '$(debug-start) Run in REPL';
	statusBarItem.command = 'ocaml-scala-run.runInRepl';

	context.subscriptions.push(vscode.commands.registerCommand('ocaml-scala-run.runInRepl', runInReplCommand));

	context.subscriptions.push(statusBarItem);

	vscode.workspace.onDidOpenTextDocument(document => updateStatusBarItem(document.languageId));
	vscode.window.onDidChangeActiveTextEditor(editor => updateStatusBarItem(editor?.document.languageId ?? ''));

	updateStatusBarItem(vscode.window.activeTextEditor?.document.languageId ?? '');
}

function updateStatusBarItem(languageId: string) {
	if (languageId === 'ocaml' || languageId === 'scala') {
		statusBarItem.show();
	} else {
		statusBarItem.hide();
	}
}

function runInReplCommand() {
	vscode.window.showInformationMessage('Hello World from ocaml-scala-run!');
}
