import { Emitter, Event } from '@theia/core';
import { RPCProtocol } from '@theia/plugin-ext/lib/common/rpc-protocol';
import { ApiExt, ApiMain, PLUGIN_RPC_CONTEXT } from '../common/api-rpc';

export class ApiExtImpl implements ApiExt {

    private proxy: ApiMain;
    private readonly messageHandlers: Array<() => string> = [];

    private onRequestMessageEmitter = new Emitter<string>();
    readonly onRequestMessage: Event<string> = this.onRequestMessageEmitter.event;

    constructor(rpc: RPCProtocol) {
        this.proxy = rpc.getProxy(PLUGIN_RPC_CONTEXT.API_MAIN);
    }

    public showMessage(message: string): void {
        return this.proxy.$showMessage(message);
    }

    public async addMessageHandler(handler: () => string): Promise<void> {
        this.messageHandlers.push(handler);
    }

    async $onRequestMessage(actor: string): Promise<void> {
        this.onRequestMessageEmitter.fire(actor);
    }

    public async $getMessage(): Promise<string | undefined> {
        for (const handler of this.messageHandlers) {
            const message = handler();
            if (message) {
                return message;
            }
        }

        return undefined;
    }
}
