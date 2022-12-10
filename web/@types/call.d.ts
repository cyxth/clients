import EventEmitter from './events';
import Transport from './transport';
declare class Call {
    #private;
    transport: Transport;
    channel: string;
    eventEmitter: EventEmitter;
    constructor(transport: Transport, channel: string);
    /**
     * start a cyxth call
     */
    start(): void;
    /**
     * join a call  invited to
     */
    join(): void;
    /**
     * call events
     * @param event event to listen for
     * @param callback  event handler
     */
    on(event: CallEvent, callback: Function): void;
    /**
     * end or leave a given call
     */
    endCall(): void;
    /**
     * share screen | tab | window
     */
    startShare(): Promise<unknown>;
    /**
     * stop sharing screen | tab | window
     */
    stopShare(): Promise<unknown>;
    /**
     * enable camera
     * @returns success or error string
     */
    cameraOn(): Promise<"error" | "success">;
    /**
     * disable camera
     */
    cameraOff(): void;
    /**
     * mute mic
     */
    mute(): void;
    /**
     * unmute mic
     */
    unmute(): void;
}
/**
 * options to initialize call
 */
interface CallOptions {
}
/**
 * call data
 */
interface CallData {
    channel: string;
    host: string;
}
/**
 * call request
 */
declare class CallRequest {
    #private;
    constructor(transport: Transport, channel: string);
    /**
     * accept a call
     * @returns a call promise
     */
    accept(): Promise<Call>;
    /**
     * reject a call
     */
    reject(): void;
}
type CallEvent = 'localStream' | 'remoteStream' | 'error';
export default Call;
export { CallOptions, CallRequest, CallData };
