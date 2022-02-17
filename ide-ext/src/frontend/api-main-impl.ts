import { interfaces } from 'inversify';
import { RPCProtocol } from '@theia/plugin-ext/lib/common/rpc-protocol';
import { MessageService } from '@theia/core';
import { ApiExt, ApiMain, API_RPC_CONTEXT } from '../common/api-rpc';

export class ApiMainImpl implements ApiMain {
    private readonly proxy: ApiExt;
    private messageService: MessageService;

    constructor(protected container: interfaces.Container, rpc: RPCProtocol) {
        this.proxy = rpc.getProxy(API_RPC_CONTEXT.API_EXT);
        this.messageService = container.get(MessageService);
    }

    $showMessage(message: string): void {
        this.messageService.info(message);
    }

    public async getMessage(): Promise<void> {
        const message = await this.proxy.$getMessage();
        if (message) {
            this.$showMessage(message);
        }
    }

    public fireMessageEvent(actor: string): void {
        this.proxy.$onRequestMessage(actor);
    }
}
