# VS Code & Theia Extension

Example mono-repo demonstrating the following:

## Simple implementation of a custom Theia plugin API namespace

This follows the [custom API namespace documentation](https://github.com/eclipse-theia/theia/blob/master/packages/plugin-ext/doc/how-to-add-new-plugin-namespace.md) and is implemented in the `ide-ext` package, specifically:

- [Backend](https://github.com/thegecko/vscode-theia-extension/tree/main/ide-ext/src/backend) which registers API support in the plugin host
- [Plugin](https://github.com/thegecko/vscode-theia-extension/tree/main/ide-ext/src/plugin) which implements the support for the custom API
- [Frontend](https://github.com/thegecko/vscode-theia-extension/tree/main/ide-ext/src/frontend) which exposes API functionality to the frontend via RPC

The API is outlined in the [api package](https://github.com/thegecko/vscode-theia-extension/blob/main/api/index.d.ts)

## A VS Code Extension which upgrades functionality in Theia

This extension is found in the `extension` package with the Theia plugin namespace implemented [here](https://github.com/thegecko/vscode-theia-extension/blob/main/extension/src/index.ts#L14).

Four custom methods of calling into Theia are outlined:

- [A function handler](https://github.com/thegecko/vscode-theia-extension/blob/main/extension/src/theia.ts#L11)
- [A custom event from Theia](https://github.com/thegecko/vscode-theia-extension/blob/main/extension/src/theia.ts#L12)
- [A custom function in Theia](https://github.com/thegecko/vscode-theia-extension/blob/main/extension/src/theia.ts#L14)
- [Executing a custom command in Theia](https://github.com/thegecko/vscode-theia-extension/blob/main/extension/src/theia.ts#L20)

## Running

Clone this repo and execute:

```bash
yarn
```

Running the `VS Code Extension` launch configuration starts an extension host with the vanilla extension running in VS Code:

<img width="1248" alt="Screenshot 2022-02-17 at 19 14 47" src="https://user-images.githubusercontent.com/61341/154554195-4d79a4bb-648c-4114-b9b4-314e4d20ab58.png">

The extension functionality can be executed using the tree view button exposed in the added view.

Running the `Theia IDE` launch configuration starts a browser-based Theia IDE which also loads the extension:

<img width="1174" alt="Screenshot 2022-02-17 at 19 15 16" src="https://user-images.githubusercontent.com/61341/154554201-c06701f5-53e9-4d3e-bb64-da6e33e02bcc.png">

The `Extension Menu` allows execution of two communication samples:

- `Event to extension` fires a custom event in the extension which is then responded to with a call back into Theia
- `Get message from extension` executes a function handler in the extension
