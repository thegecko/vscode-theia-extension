declare module '@extension/api' {
    export namespace host {
        export function getDataHandler(handler: () => string): void;
    }
}
