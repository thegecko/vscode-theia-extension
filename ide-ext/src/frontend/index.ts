import { ContainerModule } from 'inversify';
import { bindProvider } from './rpc-provider';

export default new ContainerModule(bind => {
    bindProvider(bind);
});
