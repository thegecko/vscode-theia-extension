import { ContainerModule } from '@theia/core/shared/inversify';
import { bindCommand } from './command-contribution';
import { bindProvider } from './api-provider';

export default new ContainerModule(bind => {
    bindCommand(bind);
    bindProvider(bind);
});
