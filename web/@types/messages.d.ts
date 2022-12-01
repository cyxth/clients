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
 * message output
 */
interface MessageOutput {
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
 * message deleted
 */
interface MessageDeleted {
    deleted: boolean;
    soft?: boolean;
}
/**
 * message edit
 */
interface MessageUpdate extends MessageDelete {
    content: string;
}
/**
 * message edit options
 */
interface MessageEditOptions {
}
/**
 * message was edited
 */
interface MessageEdited {
    edited: boolean;
}
export { Message, NewMessage, MessageContent, MessageDelete, MessageDeleteOptions, MessageDeleted, MessageEditOptions, MessageEdited, MessageOptions, SendMessage, MessageOutput, MessageUpdate };
