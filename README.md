# Functionality
This extension lets you run OCaml (`.ml`) and Scala (`.scala`, `.sc`) files in REPL with a single button.

The evaluate the current file use the "Run in REPL" button located in the left half of the status bar, or use the "Run in REPL" command from the command palette (`Ctrl+Shift+P`). You can also set up a keyboard shortcut, by typing "Run in REPL" into the command palette and clicking the cog on the right of the command.

Only saved files can be run, and the extension runs the last known saved version of the file.

# Details
The extension uses your default VS Code terminal and expects `ocaml` and/or `scala` commands to be available in it. It is compatible with WSL, running files from `/mnt/c` instead of `c:`. It uses following commands to run the files:
* **OCaml**: `ocaml`, then `#use "$filename";;`
* **Scala**: `scala`, then `:load $filename`

The extension creates terminal tabs called `ocaml` and `scala` respectively to run those commands.

# Limitations
Due to limitations in terms of how VS Code extensions can affect the build-in terminal, the extension has no way of reading the output of a command or locking the terminal tabs. Which specifically means that if you exit the OCaml/Scala REPL in their respective tabs the run button will stop working (as it would try to use `#use`/`:load` directly in the terminal). In that case, close the terminal tab and it will reopen correctly on the next button click or command usage. It means that you are advised not to use terminal tabs created by the extension in any way other than reading their content.
