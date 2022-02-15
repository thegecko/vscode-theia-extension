import * as path from 'path';
import { injectable, interfaces } from '@theia/core/shared/inversify';
import { ExtPluginApi, ExtPluginApiProvider } from '@theia/plugin-ext';

@injectable()
export class apiProvider implements ExtPluginApiProvider {
    provideApi(): ExtPluginApi {
        return {
            backendInitPath: path.join(__dirname, 'implementation.js')
        };
    }
}

export const bindProvider = (bind: interfaces.Bind) => {
    bind(apiProvider).toSelf().inSingletonScope();
    bind(Symbol.for(ExtPluginApiProvider)).toService(apiProvider);
};
