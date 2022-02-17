import { inject, injectable, interfaces } from '@theia/core/shared/inversify';
import { Command, CommandContribution, CommandRegistry } from '@theia/core/lib/common';
import { RpcProvider } from './rpc-provider';

@injectable()
export class Contribution implements CommandContribution {

    protected readonly command: Command = {
        id: 'vscode.devices.requestPort',
        label: 'Request Port'
    };

    @inject(RpcProvider) protected rpcProvider!: RpcProvider;

    registerCommands(commands: CommandRegistry): void {
        commands.registerCommand(this.command, {
            execute: async () => {
                const data = await this.rpcProvider.getData();
                console.log(data);
            }
        });
    }
}

export const bindCommand = (bind: interfaces.Bind) => {
    bind(CommandContribution).to(Contribution).inSingletonScope();
};
