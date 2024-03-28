/**
 * cyxth message
 */
interface Message {
    userId: string;
    channelId: string;
    messageId: string;
    content: MessageContent;
    timestamp: Date;
    type: 'activity' | 'message' | 'private';
    activity?: ChannelActivity;
}
/*** channel activity */
interface ChannelActivity {
    event: 'join' | 'leave' | 'create' | string;
    scope: 'channel' | string;
    sender: string;
    data?: any;
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
    onUpload: Function;
}
/**
 * message edit
 */
interface MessageUpdate extends MessageDelete {
    content: string;
}
export { Message, MessageContent, MessageDelete, MessageDeleteOptions, MessageBody, MessageDelivery, MessageUpdate, SendOptions };
