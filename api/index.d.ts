import { Event } from 'vscode';

declare module '@extension/api' {
    export namespace host {
        // Call into host
        export function showMessage(message: string): void;
        // Request for message in extension
        export function getMessageHandler(handler: () => string): void;
        // Event in Theia
        export const onRequestMessage: Event<string>;
    }
}
