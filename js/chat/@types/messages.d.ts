/**
 * cyxth message
 */
interface Message {
    sender_id: string;
    channel_id: string;
    id: string;
    text?: string;
    media?: any;
    date: string;
    rdate: Date;
}
/**
 * message body
 */
interface MessageBody {
    media?: FileList;
    data?: any;
}
/**
 * message delivery
 */
interface MessageDelivery {
    status: string;
    id: string;
}
/**
 * parsed message content
 */
interface MessageContent {
    text?: string;
    media?: any;
    meta?: string;
}
interface NewMessage {
    text: string;
    message_id: string;
    channel: string;
    sender: string;
}
interface MessageDelete {
    channel_id: string;
    id: string;
}
interface MessageDeleteOptions {
    soft?: boolean;
}
/**
 * sending options
 */
interface SendOptions {
    /** wait for delivery report defaults to true */
    deliveryReport: boolean;
    progressHandler: Function;
}
/**
 * message edit
 */
interface MessageUpdate extends MessageDelete {
    content: string;
}
export { Message, NewMessage, MessageContent, MessageDelete, MessageDeleteOptions, MessageBody, MessageDelivery, MessageUpdate, SendOptions };
