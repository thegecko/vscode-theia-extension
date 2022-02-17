import { createProxyIdentifier } from '@theia/plugin-ext/lib/common/rpc-protocol';

// Extension API exposed as RPC for frontend to call into plugin
export interface ApiExt {
    $onRequestMessage(actor: string): Promise<void>;
    $getMessage(): Promise<string | undefined>;
}

// Extension API exposed as RPC for plugin to call into frontend
export interface ApiMain {
    $showMessage(message: string): void;
}

// RPC context available to frontend
export const FRONTEND_RPC_CONTEXT = {
    API_EXT: createProxyIdentifier<ApiExt>('ApiExt')
};

// RPC context available to plugin
export const PLUGIN_RPC_CONTEXT = {
    API_MAIN: createProxyIdentifier<ApiMain>('ApiMain'),
};
