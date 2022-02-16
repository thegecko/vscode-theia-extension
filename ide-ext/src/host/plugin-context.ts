import * as api from '@extension/api';
import { Plugin } from '@theia/plugin-ext';
import { RPCProtocol } from '@theia/plugin-ext/lib/common/rpc-protocol';
import { API_RPC_CONTEXT } from '../common/api-rpc';
import { ApiExtImpl } from './api-ext-impl';

export type ApiFactory = (plugin: Plugin) => typeof api;

export const createApiFactory = (rpc: RPCProtocol): ApiFactory => {

    const apiExt = rpc.set(API_RPC_CONTEXT.API_EXT, new ApiExtImpl(rpc));

    return (): typeof api  => {
        const host: typeof api.host = {
            addDevice(device: string): void {
                return apiExt.addDevice(device);
            },
            getDataHandler(handler: () => string): Promise<void> {
                return apiExt.addDataHandler(handler);
            },
            /*
            get onDidChangeAuthenticationProviders(): api.Event<api.AuthenticationProvidersChangeEvent> {
                return apiExt.onDidChangeAuthenticationProviders;
            },
            */
        }

        return <typeof api> {
            host
        };
    }
};
