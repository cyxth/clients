import EventEmitter from './events';
import Transport from './transport';
declare class Call {
    #private;
    transport: Transport;
    channel: string;
    eventEmitter: EventEmitter;
    callOptions: CallOptions;
    constructor(transport: Transport, channel: string);
    /**
     * start a cyxth call
     */
    start(callOptions: CallOptions): void;
    /**
     * join a call  invited to
     */
    join(callOptions: CallOptions): void;
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
     * enable mic
     */
    micOn(): Promise<"error" | "success">;
    /**
     * disable mic
     */
    micOff(): void;
    /**
     * mute mic
     */
    mute(): void;
    /**
     * unmute mic
     */
    unmute(): void;
    muted(): MicState;
    cameraEnabled(): CameraState;
    state(): any;
}
/**
 * options to initialize call
 */
interface CallOptions {
    video: boolean;
    audio: boolean;
    share?: boolean;
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
    accept(callOptions: CallOptions): Promise<Call>;
    /**
     * reject a call
     */
    reject(): void;
}
/**
 * events dispatched by call
 * `connected` user has succesifuly joined or started a call
 * `mute` a user toggled mute on(`true`) or off(`false`)
 *  `error` an error occured during call
 * `state` call state changed
 *  `local-change` local stream has been updated
 * `remote-change` remote stream has been updated
 *  `join` a user joined the call
 * `leave` a user left the call
 */
type CallEvent = 'connected' | 'mute' | 'error' | 'state' | 'local-change' | 'remote-change' | 'join' | 'leave';
type MicState = 'muted' | 'on' | 'off';
type CameraState = 'on' | 'off';
export default Call;
export { CallOptions, CallRequest, CallData };
