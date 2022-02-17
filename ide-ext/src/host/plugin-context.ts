import * as theia from '@theia/plugin';
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
            showMessage(message: string): void {
                return apiExt.showMessage(message);
            },
            getMessageHandler(handler: () => string): Promise<void> {
                return apiExt.addMessageHandler(handler);
            },
            get onRequestMessage(): theia.Event<string> {
                return apiExt.onRequestMessage;
            }
        }

        return <typeof api> {
            host
        };
    }
};
