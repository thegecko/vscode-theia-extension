import * as vscode from 'vscode';

// const THEIA_APP_NAME = 'Theia Extension Example';

class DataProvider implements vscode.TreeDataProvider<void> {
    onDidChangeTreeData?: vscode.Event<void | null | undefined> | undefined;
    getTreeItem(_element?: void): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return {};
    }
    getChildren(_element?: never): vscode.ProviderResult<void[]> {
        return [];
    }
}

export const activate = async (context: vscode.ExtensionContext): Promise<void> => {
    context.subscriptions.push(
        vscode.window.createTreeView('extension.data', { treeDataProvider: new DataProvider() }),
        vscode.commands.registerCommand('showData', () => {
            const data = 'hi';//getData();
            vscode.window.showInformationMessage(data);
        }),
    );

    // Enable VS Code views
    vscode.commands.executeCommand('setContext', 'extension.showViews', true);
};
