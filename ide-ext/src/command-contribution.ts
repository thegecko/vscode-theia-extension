import { injectable, interfaces } from '@theia/core/shared/inversify';
import { Command, CommandContribution, CommandRegistry } from '@theia/core/lib/common';

@injectable()
export class Contribution implements CommandContribution {

    protected readonly command: Command = {
        id: 'vscode.devices.requestPort',
        label: 'Request Port'
    };

    registerCommands(commands: CommandRegistry): void {
        commands.registerCommand(this.command, {
            execute: async () => {
                return undefined;
            }
        });
    }
}

export const bindCommand = (bind: interfaces.Bind) => {
    bind(CommandContribution).to(Contribution).inSingletonScope();
};
