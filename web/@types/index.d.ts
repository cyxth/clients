import Call, { CallOptions } from './call';
import { MessageDelete, MessageDeleteOptions, MessageDeleted, MessageEditOptions, MessageEdited, MessageOptions, SendMessage, MessageUpdate } from './messages';
import { Channel, ChannelLeft, ChannelCretateOptions, ChannelDeleteOptions, ChannelJoinOptions, ChannelModerationOptions, ChannelUpdateOptions } from './channels';
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
     *
     * @param messageId message id to delete
     */
    deleteMessage(message: MessageDelete, options?: MessageDeleteOptions): Promise<MessageDeleted>;
    /**
     * edit a message | one must be message author
     * @param messageId message to edit
     * @param options edit options
     * @returns Promise message edited object or error |
     */
    editMessage(message: MessageUpdate, options?: MessageEditOptions): Promise<MessageEdited>;
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
    /**
     * get channel updates i.e when user was offline or disconnected
     * @param channels channels to get state for
     * @param date start date
     * @param duration duration(from the start date)
     * @returns all updates in a channel
     */
    getState(channels: string[], date: string, duration: number): Promise<unknown>;
    /**
     * get channels user is in
     * @returns an array of channels user is in
     */
    getChannels(): Promise<string[]>;
    /**
     * get all open channels
     * @returns an array of all open channels
     */
    listChannels(): Promise<Channel[]>;
    /**
     * create a new channel
     */
    createChannel(channel: ChannelCretateOptions): Promise<Channel>;
    /**
     *  if it's an open channel one can join without invite token
     *  else a user must have an invite token from the channel_admin| moderator | member
     * @param channelId channel to join
     */
    joinChannel(channelId: string, options?: ChannelJoinOptions): Promise<Channel>;
    /**
     * leave a given channel
     * will fail if user is not in channel
     * @param channelId channel to leave
     */
    leaveChannel(channelId: string): Promise<ChannelLeft>;
    /**
     * delete a channel
     *  fails if user has no permissions to delete
     * @param channelId channel to delete
     * @param options deletion options
     */
    deleteChannel(channelId: string, options?: ChannelDeleteOptions): Promise<ChannelLeft>;
    /**
     * do channel moderation i.e mute users, create invite_tokens, modify user permissions ... etc
     * @param channelId channel to moderate
     * @param options moderation options
     */
    moderateChannel(channelId: string, options: ChannelModerationOptions): Promise<any>;
    /**
     *  add users to a channel
     *  added users have permissions to send and receive messages in public + private channels
     *  and receive only permissions in broadcast channels
     *  to add more permissions use `moderateChannel` function
     * @param channelId channel id
     * @param users users array
     */
    addUsers(channelId: string, userIds: string[]): Promise<unknown>;
    /**
     * update a channel
     * @param channelId
     * @param options
     */
    updateChannel(channelId: string, options: ChannelUpdateOptions): Promise<Channel>;
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
type CyxthEvent = 'message' | 'call';
