import { ContainerModule } from '@theia/core/shared/inversify';
import { bindProvider } from './api-provider';

export default new ContainerModule(bind => {
    bindProvider(bind);
});
