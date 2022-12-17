import EventEmitter from './events';
declare class Transport {
    #private;
    eventEmmiter: EventEmitter;
    constructor(wss: WebSocket);
    onOpen(): void;
    waitOpen(): Promise<boolean>;
    onClose(): void;
    onError(err: Event): void;
    onMessage(message: MessageEvent<any>): any;
    send(msg: string): void;
    cend(command: string, data: any, trail?: number | string): Promise<any>;
    sendm(channel: string, message: any): Promise<any>;
    replaceEmoji(string: string): string;
    sendPromise(event_id: string, event_timeout?: number): Promise<any>;
    /**
     *
     * @param event event to lsiten on
     * @param callback callback to handle event
     */
    on(event: string, callback: Function): void;
}
export default Transport;
