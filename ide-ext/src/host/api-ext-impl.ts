import * as api from '@extension/api';
import { Emitter, Event } from '@theia/core';
import { RPCProtocol } from '@theia/plugin-ext/lib/common/rpc-protocol';
import { ApiExt, ApiMain, PLUGIN_RPC_CONTEXT } from '../common/api-rpc';

export class ApiExtImpl implements ApiExt {

    private proxy: ApiMain;
    private readonly dataHandlers: Array<() => string> = [];

    private onDidChangeAuthenticationProvidersEmitter = new Emitter<api.AuthenticationProvidersChangeEvent>();
    readonly onDidChangeAuthenticationProviders: Event<api.AuthenticationProvidersChangeEvent> = this.onDidChangeAuthenticationProvidersEmitter.event;

    constructor(rpc: RPCProtocol) {
        this.proxy = rpc.getProxy(PLUGIN_RPC_CONTEXT.API_MAIN);
    }

    public addDevice(device: string): void {
        return this.proxy.$addDevice(device);
    }

    public async addDataHandler(handler: () => string): Promise<void> {
        this.dataHandlers.push(handler);
    }

    async $onDidChangeAuthenticationProviders(added: boolean, removed: boolean): Promise<void> {
        this.onDidChangeAuthenticationProvidersEmitter.fire({ added, removed });
    }

    public async $getData(): Promise<string | undefined> {
        for (const handler of this.dataHandlers) {
            const data = handler();
            if (data) {
                return data;
            }
        }

        return undefined;
    }
}
