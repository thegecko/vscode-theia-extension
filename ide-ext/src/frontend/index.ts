import { ContainerModule } from 'inversify';
import { bindContribution } from './contribution';
import { bindProvider } from './rpc-provider';

export default new ContainerModule(bind => {
    bindProvider(bind);
    bindContribution(bind);
});
