import { MessageDelivery, SendOptions } from './messages';
import { Channels } from './channels';
export default class Chat {
    #private;
    /** create and manage cyxth chat channels */
    channels: Channels;
    private constructor();
    /**
     * listen for realtime chat events
     * @param event event to listen for
     * @param callback handler function
     */
    on(event: ChatEvent, callback: Function): void;
    /**
     * send a message in a channel
     * @param channelId channel id
     * @param message message to send
     * @returns the delivered message
     */
    send(channelId: string, message: SendMessage | string, options?: SendOptions): Promise<MessageDelivery>;
    /**
     * send a reaction to a message
     * @param channelId channel id
     * @param messageId message id
     * @param reaction reaction
     * @returns the derivery status of the message
     */
    react(channelId: string, messageId: string, reaction: string): Promise<MessageDelivery>;
    /**
     * edit a message
     * @param channelId channel id
     * @param messageId message id
     * @param content new message
     * @returns status response | rejects if not message author
     */
    editMessage(channelId: string, messageId: string, content: string): Promise<StatusResponse>;
    /**
     * delete a message
     * @param channelId channel id
     * @param messageId message id
     * @param soft either delete message completely or replace with deleted message
     * @returns true if deleted else false | rejects if not message author
     */
    deleteMessage(channelId: string, messageId: string, soft?: boolean): Promise<StatusResponse>;
    static pluginId(): string;
}
/** chat event messages and activity */
type ChatEvent = 'message' | 'activity';
interface StatusResponse {
    status: number;
}
interface BaseMessage {
    data: Object;
    text: string;
    files?: FileList;
    replyTo?: string;
}
type TextMessage = Omit<BaseMessage, 'data'>;
type DataMessage = Omit<BaseMessage, 'text'>;
type SendMessage = DataMessage | TextMessage;
export {};
