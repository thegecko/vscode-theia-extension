import * as path from 'path';
import { injectable, ContainerModule } from 'inversify';
import { ExtPluginApi, ExtPluginApiProvider } from '@theia/plugin-ext';

@injectable()
class ExtensionApiProvider implements ExtPluginApiProvider {
    provideApi(): ExtPluginApi {
        return {
            backendInitPath: path.join(__dirname, '..', 'plugin')
        };
    }
}

export default new ContainerModule(bind => {
    bind(ExtensionApiProvider).toSelf().inSingletonScope();
    bind(Symbol.for(ExtPluginApiProvider)).toService(ExtensionApiProvider);
});
