export default class Calls {
    #private;
    options: CallOptions;
    stream: MediaStream;
    state: CallState;
    channel: string;
    private constructor();
    /**
     * start call
     * creates a new call,
     * failes if a call exists in channel or user has no permissions to start call in channel
     */
    start(options: CallOptions): Promise<void>;
    /** join a call */
    join(options: CallOptions): void;
    /** enable mic */
    micOn(): void;
    /** disable mic*/
    micOff(): void;
    /** turn camera on*/
    cameraOn(): void;
    /** turn camera off completely */
    cameraOff(): void;
    /** mute mic, note that the mic stays **on** but is not sending audio to other peers, use micOff to completely stop */
    mute(): void;
    /** unmute mic */
    unmute(): void;
    /**
     * end call (only call initiator or channel admin can do this)
     */
    endCall(): void;
    /** leave call */
    leave(): void;
    moderate(): void;
    /**
     * call events
     */
    on(event: string, callback: Function): void;
    static pluginId(): string;
}
interface CallOptions {
    video: boolean;
    audio: boolean;
}
interface CallState {
    mic: MicState;
    camera: boolean;
}
type MicState = boolean | 'muted';
export {};
