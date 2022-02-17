import { injectable, interfaces } from 'inversify';
import { MainPluginApiProvider } from '@theia/plugin-ext';
import { RPCProtocol } from '@theia/plugin-ext/lib/common/rpc-protocol';
import { PLUGIN_RPC_CONTEXT } from '../common/api-rpc';
import { ApiMainImpl } from './api-main-impl';

@injectable()
export class RpcProvider implements MainPluginApiProvider {
    public api!: ApiMainImpl;

    public initialize(rpc: RPCProtocol, container: interfaces.Container): void {
        this.api = new ApiMainImpl(container, rpc);
        rpc.set(PLUGIN_RPC_CONTEXT.API_MAIN, this.api);
    }
}

export const bindProvider = (bind: interfaces.Bind) => {
    bind(RpcProvider).toSelf().inSingletonScope();
    bind(MainPluginApiProvider).toService(RpcProvider);
};
