import * as vscode from 'vscode';

const THEIA_APP_NAME = 'Theia Extension Example';
const THEIA_CUSTOM_COMMAND = 'execution.messageCommand';

const getMessage = (actor: string = 'the extension'): string => {
    return `hello from ${actor}`;
};

export const activate = async (context: vscode.ExtensionContext): Promise<void> => {

    if (vscode.env.appName === THEIA_APP_NAME) {
        // Implement Theia API
        const api = await import('@extension/api');
        api.host.getMessageHandler(() => getMessage());
        api.host.onRequestMessage((actor: string) => {
            const message = getMessage(actor);
            api.host.showMessage(message);
        });

        // Execute Theia custom command
        const commands = await vscode.commands.getCommands();
        if (commands.indexOf(THEIA_CUSTOM_COMMAND) > -1) {
            vscode.commands.executeCommand(THEIA_CUSTOM_COMMAND);
        }

        // Disable VS Code views
        vscode.commands.executeCommand('setContext', 'extension.showViews', false);
    } else {
        // Register command for VS Code
        context.subscriptions.push(
            vscode.commands.registerCommand('showData', () => {
                const message = getMessage();
                vscode.window.showInformationMessage(message);
            }),
        );

        // Enable VS Code views
        vscode.commands.executeCommand('setContext', 'extension.showViews', true);
    }
};
