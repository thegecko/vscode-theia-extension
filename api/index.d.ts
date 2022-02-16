// import { Event } from '@theia/plugin';
// export { Event };

declare module '@extension/api' {
    export interface AuthenticationProvidersChangeEvent {
        /**
         * The ids of the [authenticationProvider](#AuthenticationProvider)s that have been added.
         */
        readonly added: boolean;

        /**
         * The ids of the [authenticationProvider](#AuthenticationProvider)s that have been removed.
         */
        readonly removed: boolean;
    }

    export namespace host {
        // Call into theia
        export function addDevice(device: string): void;
        // request for date in plugin
        export function getDataHandler(handler: () => string): void;
        // Event in Theia
        // export const onDidChangeAuthenticationProviders: Event<AuthenticationProvidersChangeEvent>;
    }
}
