import { ContainerModule } from 'inversify';
import { bindCommand } from './command-contribution';
import { bindProvider } from './rpc-provider';

export default new ContainerModule(bind => {
    bindProvider(bind);
    bindCommand(bind);
});
