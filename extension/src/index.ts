import * as vscode from 'vscode';

const THEIA_APP_NAME = 'Theia Extension Example';

const getData = (): string => {
    return 'hello';
};

export const activate = async (context: vscode.ExtensionContext): Promise<void> => {
    context.subscriptions.push(
        vscode.commands.registerCommand('showData', () => {
            const data = getData();
            vscode.window.showInformationMessage(data);
        }),
    );

    if (vscode.env.appName === THEIA_APP_NAME) {
        // Implement Theia API
        const api = await import('@extension/api');
        api.host.getDataHandler(() => getData());
    }

    // Enable VS Code views
    vscode.commands.executeCommand('setContext', 'extension.showViews', vscode.env.appName !== THEIA_APP_NAME);
};
