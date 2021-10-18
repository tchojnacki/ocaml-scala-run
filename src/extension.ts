import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10);
	statusBarItem.text = '$(debug-start) Run in REPL';
	statusBarItem.command = 'ocaml-scala-run.runInRepl';

	context.subscriptions.push(vscode.commands.registerCommand('ocaml-scala-run.runInRepl', runInReplCommand));

	context.subscriptions.push(statusBarItem);

	vscode.workspace.onDidOpenTextDocument(updateStatusBarItem);
	vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem);

	updateStatusBarItem();
}

function updateStatusBarItem() {
	const languageId = vscode.window.activeTextEditor?.document.languageId ?? '';

	if (languageId === 'ocaml' || languageId === 'scala') {
		statusBarItem.show();
	} else {
		statusBarItem.hide();
	}
}

function runInReplCommand() {
	const languageId = vscode.window.activeTextEditor?.document.languageId ?? '';

	if (vscode.window.activeTextEditor?.document.isUntitled ?? true) {
		vscode.window.showErrorMessage('The file must be saved before it can be run in REPL.');
		return;
	}

	if (vscode.window.activeTextEditor?.document.isDirty) {
		vscode.window.showWarningMessage('You are running an outdated version of the file.');
	}

	if (languageId === 'ocaml') {
		languageSpecificReplSteps('ocaml', path => `#use "${path}";;`);
	} else if (languageId === 'scala') {
		languageSpecificReplSteps('scala', path => `:load ${path}`);
	} else {
		vscode.window.showErrorMessage('Can only use on OCaml or Scala files.');
	}
}

function languageSpecificReplSteps(commandName: string, fileLoader: (path: string) => string) {
	let terminal = vscode.window.terminals.find(terminal => terminal.name === commandName) ?? null;
	if (terminal === null) {
		terminal = vscode.window.createTerminal(commandName);
		terminal.sendText(commandName);
	}

	let filename = vscode.window.activeTextEditor?.document.uri.fsPath ?? '';

	if (vscode.env.remoteName === 'wsl') {
		filename = filename.replace(/^([a-z]):/, '/mnt/$1');
	}

	terminal.sendText(fileLoader(filename));
	terminal.show();
}
