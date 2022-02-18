import * as vscode from 'vscode';

const THEIA_CUSTOM_COMMAND = 'execution.messageCommand';

const getMessage = (actor: string = 'the extension') => `hello from ${actor}`;

export const activateTheia = async (appName: string) => {
    if (vscode.env.appName === appName) {
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
    }
}
