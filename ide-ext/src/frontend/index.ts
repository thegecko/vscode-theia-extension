import { inject, injectable, interfaces, ContainerModule } from 'inversify';
import { Command, CommandContribution, CommandRegistry, MAIN_MENU_BAR, MenuContribution, MenuModelRegistry } from '@theia/core';
import { MainPluginApiProvider } from '@theia/plugin-ext';
import { RPCProtocol } from '@theia/plugin-ext/lib/common/rpc-protocol';
import { ApiMainImpl } from './api-main-impl';
import { PLUGIN_RPC_CONTEXT } from '../common/api-rpc';

const eventCommand: Command = {
    id: 'execution.eventCommand',
    label: 'Event to Extension'
};

const messageCommand: Command = {
    id: 'execution.messageCommand',
    label: 'Get message from extension'
};

@injectable()
class ApiProvider implements MainPluginApiProvider {
    public api!: ApiMainImpl;

    public initialize(rpc: RPCProtocol, container: interfaces.Container): void {
        this.api = new ApiMainImpl(container, rpc);
        rpc.set(PLUGIN_RPC_CONTEXT.API_MAIN, this.api);
    }
}

@injectable()
class Contribution implements CommandContribution, MenuContribution {
    @inject(ApiProvider) protected rpcProvider!: ApiProvider;

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

export default new ContainerModule(bind => {
    bind(ApiProvider).toSelf().inSingletonScope();
    bind(MainPluginApiProvider).toService(ApiProvider);
    bind(CommandContribution).to(Contribution).inSingletonScope();
    bind(MenuContribution).to(Contribution).inSingletonScope();
});
