/*
import * as api from '@extension/api';
import { emptyPlugin, ExtPluginApiBackendInitializationFn, PluginManager } from '@theia/plugin-ext';
import { RPCProtocol } from '@theia/plugin-ext/lib/common/rpc-protocol';

import { PluginAPIFactory, Plugin, emptyPlugin } from '../../../common/plugin-api-rpc';

let cheApiFactory: ApiFactory;
let isLoadOverride = false;
let plugins: PluginManager;

const pluginsApiImpl = new Map<string, typeof api>();
const plugins = new Array<Plugin>();
let defaultApi: typeof api;
let isLoadOverride = false;
let pluginApiFactory: PluginAPIFactory;

export const provideApi: ExtPluginApiBackendInitializationFn = (rpc: RPCProtocol, pluginManager: PluginManager) => {
    cheApiFactory = createAPIFactory(rpc);
    plugins = pluginManager;

    if (!isLoadOverride) {
        overrideInternalLoad();
        isLoadOverride = true;
    }

};

function overrideInternalLoad(): void {
    const module = require('module');
    const internalLoad = module._load;

    module._load = function (request: string, parent: any, _isMain: {}) {
        if (request !== '@bar/foo') {
            return internalLoad.apply(this, arguments);
        }

        const plugin = findPlugin(parent.filename);
        if (plugin) {
            let apiImpl = pluginsApiImpl.get(plugin.model.id);
            if (!apiImpl) {
                apiImpl = cheApiFactory(plugin);
                pluginsApiImpl.set(plugin.model.id, apiImpl);
            }
            return apiImpl;
        }

        if (!defaultApi) {
            console.warn(`Could not identify plugin for '@bar/foo' require call from ${parent.filename}`);
            defaultApi = cheApiFactory(emptyPlugin);
        }

        return defaultApi;
    };
}

function findPlugin(filePath: string): Plugin | undefined {
    return plugins.getAllPlugins().find(plugin => filePath.startsWith(plugin.pluginFolder));
}

export function createAPIFactory(rpc: RPCProtocol): ApiFactory {
    const fooBarImpl = new FooBarImpl(rpc);
    return function (plugin: Plugin): typeof fooApi {
        const FooBar: typeof fooApi.fooBar = {
            getFoo(): fooApi.Foo{
                return fooBarImpl.getFooImpl();
            }
        }
        return <typeof fooApi>{
            fooBar : FooBar
        };
    }
*/