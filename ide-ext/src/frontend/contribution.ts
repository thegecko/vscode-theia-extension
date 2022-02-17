import { inject, injectable, interfaces } from '@theia/core/shared/inversify';
import { Command, CommandContribution, CommandRegistry, MAIN_MENU_BAR, MenuContribution, MenuModelRegistry } from '@theia/core/lib/common';
import { RpcProvider } from './rpc-provider';

const eventCommand: Command = {
    id: 'execution.eventCommand',
    label: 'Event to Extension'
};

const messageCommand: Command = {
    id: 'execution.messageCommand',
    label: 'Get message from extension'
};

@injectable()
export class Contribution implements CommandContribution, MenuContribution {
    @inject(RpcProvider) protected rpcProvider!: RpcProvider;

    registerCommands(commands: CommandRegistry): void {
        commands.registerCommand(eventCommand, {
            execute: () => this.rpcProvider.api.fireMessageEvent('Theia')
        });

        commands.registerCommand(messageCommand, {
            execute: () => this.rpcProvider.api.getMessage()
        });
    }

    registerMenus(menus: MenuModelRegistry): void {
        const subMenuPath = [...MAIN_MENU_BAR, 'extension-menu'];
        menus.registerSubmenu(subMenuPath, 'Extension Menu', { order: '2' });
        menus.registerMenuAction(subMenuPath, { commandId: eventCommand.id });
        menus.registerMenuAction(subMenuPath, { commandId: messageCommand.id });
    }
}

export const bindContribution = (bind: interfaces.Bind) => {
    bind(CommandContribution).to(Contribution).inSingletonScope();
    bind(MenuContribution).to(Contribution).inSingletonScope();
};
