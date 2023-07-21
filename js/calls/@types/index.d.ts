export default class Call {
    #private;
    channel: string;
    stream: MediaStream;
    state: CallState;
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
    micOn: () => Promise<void>;
    /** disable mic*/
    micOff: () => Promise<void>;
    /** turn camera on*/
    cameraOn: () => Promise<void>;
    /** turn camera off completely */
    cameraOff: () => Promise<void>;
    /** mute mic, note that the mic stays **on** but is not sending audio to other peers, use micOff to completely stop */
    mute: () => Promise<void>;
    /** unmute mic */
    unmute: () => Promise<void>;
    /** leave call */
    leave(): void;
    /**
     * end call (only call initiator or absolute channel admin can do this)
     */
    endCall(): void;
    moderate(): void;
    /**
     * call events
     */
    on(event: string, callback: Function): void;
}
interface CallOptions {
    video: boolean;
    audio: boolean;
}
interface CallState {
    mic: MicState;
    camera: boolean;
}
type MicState = boolean | "muted";
export {};
