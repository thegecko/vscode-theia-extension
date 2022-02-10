import { ContainerModule } from '@theia/core/shared/inversify';
import { bindCommand } from './contribution';

export default new ContainerModule(bind => {
    bindCommand(bind);
});
