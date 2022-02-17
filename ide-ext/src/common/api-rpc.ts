import { createProxyIdentifier, RPCProtocol } from '@theia/plugin-ext/lib/common/rpc-protocol';

// API exposed for browser to call into plugin
export interface ApiExt {
    $onRequestMessage(actor: string): Promise<void>;
    $getMessage(): Promise<string | undefined>;
}

// API exposed for plugin to call into browser
export interface ApiMain {
    $showMessage(message: string): void;
}

export const API_RPC_CONTEXT = {
    API_EXT: createProxyIdentifier<ApiExt>('ApiExt')
};

export const PLUGIN_RPC_CONTEXT = {
    API_MAIN: createProxyIdentifier<ApiMain>('ApiMain'),
};

export const ApiMainFactory = Symbol('ApiMainFactory');
export interface ApiMainFactory {
    (proxy: RPCProtocol): ApiMain;
}
