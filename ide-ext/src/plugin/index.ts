import 'reflect-metadata';
import * as theia from '@theia/plugin';
import * as api from '@extension/api';
import { emptyPlugin, Plugin, PluginManager, ExtPluginApiBackendInitializationFn } from '@theia/plugin-ext';
import { RPCProtocol } from '@theia/plugin-ext/lib/common/rpc-protocol';
import { ApiExtImpl } from './api-ext-impl';
import { FRONTEND_RPC_CONTEXT } from '../common/api-rpc';

const PLUGIN_NAME = '@extension/api';
type ApiFactory = (plugin: Plugin) => typeof api;

const implementations = new Map<string, typeof api>();
let defaultRpc: typeof api;

let plugins: PluginManager;
let apiFactory: ApiFactory;
let isLoadOverride = false;

export const provideApi: ExtPluginApiBackendInitializationFn = (rpc: RPCProtocol, pluginManager: PluginManager) => {
    apiFactory = createApiFactory(rpc);
    plugins = pluginManager;

    if (!isLoadOverride) {
        overrideInternalLoad();
        isLoadOverride = true;
    }
};

const createApiFactory = (rpc: RPCProtocol): ApiFactory => {
    const apiExt = rpc.set(FRONTEND_RPC_CONTEXT.API_EXT, new ApiExtImpl(rpc));

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

const overrideInternalLoad = (): void => {
    const module = require('module');
    const internalLoad = module._load;

    module._load = function (request: string, parent: any, _isMain: {}): typeof api {
        if (request !== PLUGIN_NAME) {
            return internalLoad.apply(this, arguments);
        }

        const plugin = plugins.getAllPlugins().find(plugin => parent.filename.startsWith(plugin.pluginFolder));

        if (plugin) {
            let implementation = implementations.get(plugin.model.id);
            if (!implementation) {
                implementation = apiFactory(plugin);
                implementations.set(plugin.model.id, implementation);
            }
            return implementation;
        }

        if (!defaultRpc) {
            console.warn(`Could not identify plugin for ${PLUGIN_NAME} require call from ${parent.filename}`);
            defaultRpc = apiFactory(emptyPlugin);
        }

        return defaultRpc;
    };
};
