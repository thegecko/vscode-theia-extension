import * as vscode from 'vscode';
import { activateTheia } from './theia';

const THEIA_APP_NAME = 'Theia Extension Example';

export const activate = async (context: vscode.ExtensionContext): Promise<void> => {
    const deviceTree = vscode.window.createTreeView('extension.message', {
        treeDataProvider: {
            getTreeItem: () => ({}),
            getChildren: () => []    
        }
    });

    context.subscriptions.push(
        deviceTree,
        vscode.commands.registerCommand('showMessage', () => vscode.window.showInformationMessage('hello from vscode'))
    );

    // Enable VS Code views
    vscode.commands.executeCommand('setContext', 'extension.showViews', vscode.env.appName !== THEIA_APP_NAME);

    await activateTheia(THEIA_APP_NAME);
};
