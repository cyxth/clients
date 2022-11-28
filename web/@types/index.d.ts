import Call, { CallOptions } from "./call";
declare class Cxyth {
    #private;
    /**
     * your cyxth app url
     */
    appUrl: string;
    /**
     * check whether user is connected to cyxth servers
     */
    connected: boolean;
    /**
     * create a cyxth instance
     * @param appUrl cyxth app url
     */
    constructor(appUrl: string);
    /**
     * connect a user to cyxth servers using an auth token
     * @param auth_token authorization token
     */
    connect(auth_token: TokenData): Promise<boolean>;
    /**
     * listen for cyxth events
     * @param event event to lsiten on
     * @param callback callback to handle event
     */
    on(event: CyxthEvent, callback: Function): void;
    /**
     * send a message in a cyxth channel
     * @param channel channel to send message to
     * @param message the message
     * @param options message sending options
     * @returns message output
     */
    sendMessage(channel: string, message: SendMessage, options?: MessageOptions): Promise<any> | undefined;
    /**
     * start a new call
     * @param channel channel to start call
     * @returns a call object
     */
    startCall(channel: string, options: CallOptions): Promise<Call>;
    getAllUpdates(channels: string, date: string, duration: number): Promise<unknown>;
    updateString(string: string): string;
    getDialogs(): Promise<any>;
    parseContent(content: string): MessageContent;
}
export default Cxyth;
/**
 * token data to pass from `createToken`
 */
interface TokenData {
    token: string;
    code_challenge: string;
    code_verifier: string;
}
/**
 * cyxth events
 */
type CyxthEvent = "message" | "call";
/**
 * SendMessage
 */
interface SendMessage {
    text: string;
    media?: any;
}
/**
 * message sending options
 */
interface MessageOptions {
}
/**
 * parsed message content
 */
interface MessageContent {
    text?: string;
    media?: any;
    meta?: string;
}
