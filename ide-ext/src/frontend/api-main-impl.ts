import { interfaces } from 'inversify';
import { RPCProtocol } from '@theia/plugin-ext/lib/common/rpc-protocol';
import { ApiExt, ApiMain, API_RPC_CONTEXT } from '../common/api-rpc';

export class ApiMainImpl implements ApiMain {
    private readonly proxy: ApiExt;

    constructor(protected container: interfaces.Container, rpc: RPCProtocol) {
        this.proxy = rpc.getProxy(API_RPC_CONTEXT.API_EXT);
        this.proxy.$onDidChangeAuthenticationProviders(true, true);
    }

    $addDevice(device: string): void {
        console.log(device);
    }

    public async getData(): Promise<string | undefined> {
        return this.proxy.$getData();
    }
}
