export default class Chat implements IChannel {
    #private;
    private constructor();
    /**
     * listen for chat events and messages
     * @param event event
     * @param handler handler function
     */
    on<K extends keyof ChatEventMap>(event: K, handler: (ev: ChatEventMap[K]) => any): void;
    /**
     * send a message in a channel
     * @param channelId channel id
     * @param message message to send
     * @returns the message id
     */
    send(channelId: string, message: SendMessage | string): Promise<{
        id: string;
    }>;
    /**
     * send a reaction to a message
     * @param channelId channel id
     * @param messageId message id
     * @param reaction reaction
     * @returns the derivery status of the message
     */
    react(channelId: string, messageId: string, reaction: string): Promise<{
        id: string;
    }>;
    /**
     * edit a message
     * @param channelId channel id
     * @param messageId message id
     * @param content new message
     * @returns status response | rejects if not message author
     */
    editMessage(channelId: string, messageId: string, content: string): Promise<Status>;
    /**
     * delete a message
     * @param channelId channel id
     * @param messageId message id
     * @param soft either delete message completely or replace with deleted message
     * @returns true if deleted else false | rejects if not message author
     */
    deleteMessage(channelId: string, messageId: string, soft?: boolean): Promise<Status>;
    /**
     * Get messages in a channel(s) | if no channel id is provided saved messages from  all user channels are returned by
     * default 50 per query and a max of 150 at once
     *
     * useful when scrolling through old messages not in user's device
     *
     * this works only when cloud storage is enabled
     * @param start start from, can be either a message id or a date to start get from
     * @param limit number of messages | defaults to 50
     * @param channels channel id , if undefined returns messages from all user's saved channels `undefined` by default
     * you can also specify a channel or an array of channels to get messages from.
     * @param [direction='forward']  direction to fecth message either forward or reverse
     * @returns messages in channels grouped by channel id
     */
    getMessages(start: Date | string, limit?: number, channels?: undefined | string | string[], direction?: 'reverse' | 'forward'): Promise<{
        [channelId: string]: Message[];
    }>;
    create(channelId: string, config?: ChatConfig): Promise<Status>;
    join(channelId: string): Promise<any>;
    leave(channelId: string): Promise<Status>;
    delete(channelId: string, reason?: string): Promise<Status>;
    addUsers(channelId: string, users: string[]): Promise<Status>;
    delUsers(channelId: string, users: string[]): Promise<Status>;
    modUsers(channelId: string, users: string[], mode: number): Promise<Status>;
    getUsers(channelId: string): Promise<User[]>;
    configure(channelId: string, config: ChatConfig): Promise<Status>;
    list(pagination?: Pagination, publicOnly?: boolean): Promise<any[]>;
    update(channelId: string, data: any): Promise<Status>;
    get(channelId: string): Promise<any>;
}
/**
 * message sent in a channel
 */
export interface SendMessage {
    /**
     * data to send, can be either a string or a js object that can be turned to JSON
     *
     *  if a string is provided a simple text message is created and if an object is provided
     *  a data message is created
     */
    data: string | Object;
    /**
     * files
     *
     * if file upload is enabled for your instance use this to link files messages, `FileList` will upload the files first, file info provides
     *  your custom external files
     */
    files?: FileList | FileInfo[];
    /**
     * message id to reply to
     */
    replyTo?: string;
}
/**
 * file info for external files linked to messages
 */
export interface FileInfo {
    /**
     * file id
     */
    id: string;
    /**
     * file name
     */
    name: string;
    /**
     * file url
     */
    url: string;
    /**
     * mimeType
     */
    mimeType: string;
    /**
     * preview url
     */
    previewUrl: string;
}
/** colab user */
export interface User {
    /** user id */
    id: string;
    /** user permission in colab state */
    mode: number;
}
/**operation status*/
export interface Status {
    /**operation status*/
    status: boolean;
}
/*** pagination*/
export interface Pagination {
    /** start after id */
    starting_after: string;
    /** number of results returned */
    limit: number;
}
/**
 * chat channel configuration
 */
export interface ChatConfig {
    /**
     * default permission for channel members
     */
    defaultPermision?: number;
}
export interface IChannel {
    /**
     * create a new channel
     *
     * emits cnl:add event
     * @param channelId channel id
     * @param config channel configuration
     */
    create(channelId: string, config?: ChatConfig): Promise<Status>;
    /**
     * join an existing  channel
     *
     * emits `user:join` event
     * @param channelId channel id
     */
    join(channelId: string): Promise<Status>;
    /**
     * leave a channel
     *
     * emits `user:left` event
     * @param channelId channel id
     */
    leave(channelId: string): Promise<Status>;
    /**
     * delete a channel
     *
     * emits `cnl:del` event
     * @param channelId channel id
     * @param reason optionally tell others the reason
     */
    delete(channelId: string, reason?: string): Promise<Status>;
    /**
     * add users to channel
     *
     * emits `user:add` event
     * @param channelId channel id
     * @param users an array of user ids
     */
    addUsers(channelId: string, users: string[]): Promise<Status>;
    /**
     * remove user from channel
     *
     * users removed won't be able to join again unless added
     *
     * emits `user:del` event
     * @param channelId channel id
     * @param users an array of user ids
     */
    delUsers(channelId: string, users: string[]): Promise<Status>;
    /**
     * moderate users in channel
     *
     *  emits `user:mod` event
     *
     * check [concepts](/docs/guides/concepts) for more about permissions
     * @param channelId channel id
     * @param users an array of users
     */
    modUsers(channelId: string, users: string[], mode: number): Promise<Status>;
    /**
     * get channel users
     * @param channelId channel id
     * @returns users in channel
     */
    getUsers(channelId: string): Promise<User[]>;
    /**
     *  update channel configuration
     *
     * emits `cnl:config` event
     * @param channelId channel id
     * @param config new configuration
     */
    configure(channelId: string, config: ChatConfig): Promise<Status>;
    /**
     * list channels
     * @param pagination pagination
     * @param publicOnly list public channels, when channel discovery is enabled. by default this is false and will alway return
     * the user's joined channels
     */
    list(pagination?: Pagination, publicOnly?: boolean): Promise<any[]>;
    /**
     * update channel data
     * @param channelId channel id
     * @param data data
     */
    update(channelId: string, data?: any): Promise<Status>;
    /**
     * get channel info
     * @param channelId  channel id
     */
    get(channelId: string): Promise<any>;
}
/**
 * chat events
 */
export interface ChatEventMap {
    /** new message*/
    message: Message;
    /** config updated */
    'cnl:config': {
        senderId: string;
        config: ChatConfig;
    };
    /** user created channel, event sent to initial users in channel to join call */
    'cnl:create': {
        senderId: string;
        config: ChatConfig;
    };
    /** channel deleted */
    'cnl:delete': {
        senderId: string;
        reason?: string;
    };
    /** a user joined call, may not have published tracks yet */
    'user:join': {
        user: User;
    };
    /** a user left call */
    'user:left': {
        userId: string;
    };
    /** users were added to call */
    'user:add': {
        users: User[];
    };
    /** call user delete */
    'user:del': {
        users: string[];
        senderId: string;
    };
    /** user moderated */
    'user:mod': {
        users: User[];
        senderId: string;
    };
}
/**
 * message
 */
export interface Message {
    /** sender */
    userId: string;
    /** channel id */
    channelId: string;
    /** message id */
    messageId: string;
    /** message content */
    content: MessageContent;
    /** time sent */
    timestamp: Date;
    /** message type 'activity' | 'message' */
    type: 'activity' | 'message';
    /** activity message if message type is activity */
    activity?: Activity;
}
/**
 *  channel activity recorded in message history for when for example a user joined, left, called etc
 *  similar to all events in `ChannelEventMap`
 *  */
export interface Activity {
    /** event type  */
    event: 'join' | 'leave' | 'create' | string;
    /** scope of event can be 'call' | 'colab' | 'user' | 'channel' or custom depending of event and config */
    scope: 'channel' | string;
    /** user who triggered event. i.e user who deleted the given users or started a call */
    sender: string;
    /** activity data same as `ChannelEventMap` */
    data?: any;
}
/** message content */
export interface MessageContent {
    /** for simple text messages sent with string in `send()` */
    text?: string;
    /** files linked to message */
    media?: FileInfo[];
    /** custom data messages sent with Object in `send()` */
    data?: any;
}
