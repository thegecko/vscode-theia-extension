import * as api from '@extension/api';
import { RPCProtocol } from '@theia/plugin-ext/lib/common/rpc-protocol';
import { emptyPlugin, PluginManager, ExtPluginApiBackendInitializationFn } from '@theia/plugin-ext';
import { ApiFactory, createApiFactory } from './plugin-context';

const PLUGIN_NAME = '@extension/api';

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
