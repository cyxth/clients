import { Message, MessageBody, MessageDelivery, SendOptions } from './messages';
import { TokenData } from './token';
import { Channel, NewChannel, User, Id, Pagination, StatusResponse } from './channels';
export default class Cyxth {
    #private;
    /**
     * your cyxth app url
     */
    appUrl: string;
    /**
     * check whether user is connected to cyxth servers
     */
    connected: boolean;
    options: CyxthOptions;
    /**
     * create a cyxth instance
     * @param appUrl cyxth app url
     * @param options cyxth options
     */
    constructor(appUrl: string, options?: CyxthOptions);
    /**
     * connect to cyxth realtime servers
     *
     * create token in the backend to authorize user
     * @param tokenData
     */
    connect(tokenData: TokenData): Promise<boolean>;
    disconnect(): boolean;
    /**
     * listen for realtime events
     * @param event event to listen for
     * @param callback handler function
     */
    on(event: CyxthEvent, callback: Function): void;
    /**
     * Create a new channel
     *
     * only works if users are allowed to create channel in cyxth console
     * @param channel channel to create
     * @returns the created channel
     */
    createChannel(channel: NewChannel): Promise<StatusResponse>;
    /**
     * Join a public channel
     * @param channelId the channel id to join
     */
    joinChannel(channelId: string): Promise<Id>;
    /**
     * leave a channel
     * @param channelId channel to leave
     * @returns true if user left else false
     */
    leaveChannel(channelId: string): Promise<Id>;
    /**
     * List all public channels channels
     * @returns a channel listing
     */
    listChannels(pagination?: Pagination): Promise<Channel[]>;
    /**
     * get only channels the user is in
     */
    getChannels(pagination?: Pagination): Promise<Channel[]>;
    /**
     *  Load channels messages and activity in a given duration useful if you cache channels
     * in the frontend, will skip channels with no activity in given time period
     * @param startDate date to start from
     * @param duration duration in hours
     */
    loadChannels(startDate: Date, duration: number): Promise<any>;
    /**
     * Get channel info
     * @param channelId channel id to get
     * @returns the channel info
     */
    getChannel(channelId: string): Promise<Channel>;
    /**
     * get users in a channel
     * @param channelId channel id
     * @returns returns an array of users in channel
     */
    usersInChannel(channelId: string): Promise<User[]>;
    /**
     * delete a channel
     *
     * fails if user is not creator or last admin
     * @param channelId id of channel to delete
     */
    deleteChannel(channelId: string): Promise<StatusResponse>;
    /**
     * Update channel info
     *
     * requires admin privilages
     * @param channel provide a channel with any field to be updated , an id is mandatory
     * @returns channel updated
     */
    updateChannel(channel: Channel): Promise<Channel>;
    /**
     * Invite users to channel
     *
     * requires admin privilages
     * @param channelId channel id
     * @param userIds an id or an array of user ids
     * @returns status response, will fail if any of the users provided exist in channel
     */
    inviteUser(channelId: string, userIds: string | string[]): Promise<StatusResponse>;
    /**
     * Remove users from channel
     *
     * requires admin privilages
     * @param channelId channel id
     * @param userIds an id or an array of user ids
     * @returns number of users removed in status
     */
    removeUser(channelId: string, userIds: string | string[]): Promise<StatusResponse>;
    moderateUsers(channelId: string, moderation: Moderation): Promise<string[]>;
    /**
     * Get messages in a channel
     *
     * useful when scrolling through old messages not in user's device
     *
     * this works only when cloud storage is enabled
     * @param channelId channel id
     * @param start start from, can be either a message id or a date
     * @param limit number of messages | defaults to 100
     * @returns an array of messages and activity in the channel in the given time period
     */
    getMessages(channelId: string, start: Date | string, limit?: number): Promise<Message[]>;
    /**
     * send a message in a channel
     * @param channelId channel id
     * @param message message to send
     * @returns the delivered message
     */
    sendMessage(channelId: string, message: MessageBody, options?: SendOptions): Promise<MessageDelivery>;
    /**
     * edit a message
     * @param channelId channel id
     * @param messageId message id
     * @param message new message
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
    /**
     * start a call in channel
     * @requires cyxth/calls module to be loaded
     * @param channelId channel
     * @returns the call
     */
    startCall(channelId: string, options: CallOptions): Promise<any>;
}
/**
 * cyxth options
 *
 */
interface CyxthOptions {
    /**
     * enable calls
     */
    calls?: any;
    offline?: boolean;
}
/**
 * cyxth events
 */
type CyxthEvent = 'message' | 'call' | 'disconnected' | 'connected' | 'error' | 'activity';
/**
 * options to initialize call
 */
interface CallOptions {
    video: boolean;
    audio: boolean;
    share?: boolean;
}
type ModerationString = 'block' | 'unblock' | 'make_admin' | 'revoke_admin';
interface Moderation {
    mode: ModerationString;
    users: string | string[];
}
export {};
