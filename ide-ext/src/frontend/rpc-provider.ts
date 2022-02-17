import { injectable, interfaces } from 'inversify';
import { RPCProtocol } from '@theia/plugin-ext/lib/common/rpc-protocol';
import { MainPluginApiProvider } from '@theia/plugin-ext';
import { PLUGIN_RPC_CONTEXT } from '../common/api-rpc';
import { ApiMainImpl } from './api-main-impl';

@injectable()
export class RpcProvider implements MainPluginApiProvider {

    private apiMain!: ApiMainImpl;

    public initialize(rpc: RPCProtocol, container: interfaces.Container): void {
        this.apiMain = new ApiMainImpl(container, rpc);
        rpc.set(PLUGIN_RPC_CONTEXT.API_MAIN, this.apiMain);
    }

    public getData(): Promise<string | undefined> {
        return this.apiMain.getData();
    }
}

export const bindProvider = (bind: interfaces.Bind) => {
    bind(RpcProvider).toSelf().inSingletonScope();
    bind(MainPluginApiProvider).toService(RpcProvider);
};
