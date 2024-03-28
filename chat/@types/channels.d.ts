import { Message } from './messages';
/**
 * # channels
 *  create and manage cyxth channels
 *
 */
export declare class Channels {
    #private;
    private constructor();
    /**
     * Create a new channel
     *
     * only works if users are allowed to create channel in cyxth console
     * @param channel channel to create
     * @returns Status
     */
    create(channel: NewChannel): Status;
    /**
     * Get channel info
     * @param channelId channel id to get
     * @returns the channel info
     */
    get(channelId: string): Promise<Channel | undefined>;
    /**
     * delete a channel
     *
     * fails if user is not creator or last admin
     * @param channelId id of channel to delete
     */
    delete(channelId: string): Status;
    /**
     * Update channel info
     *
     * requires admin privilages
     * @param channel provide a channel with any field to be updated , an id is mandatory
     * @returns channel updated
     */
    update(channel: Channel): Status;
    /**
     * Join a channel with id
     * @param channelId the channel id to join
     */
    join(channelId: string): Promise<{
        id: string;
    }>;
    /**
     * leave a channel
     * @param channelId channel to leave
     */
    leave(channelId: string): Promise<{
        id: string;
    }>;
    /**
     * get channel members
     * @param channelId channel id
     * @returns returns an array of members in channel
     */
    getMembers(channelId: string): Promise<ChannelUser[]>;
    /**
     * Invite | add member(s) to channel
     *
     * requires admin privilages
     * @param channelId channel id
     * @param userIds an id or an array of user ids
     * @returns status response, will fail if any of the users provided does exist
     */
    addMembers(channelId: string, userIds: string | string[]): Status;
    /**
     * Remove user(s) from channel
     *
     * requires admin privilages
     * @param channelId channel id
     * @param userIds an id or an array of user ids
     * @returns number of users removed in status
     */
    removeMembers(channelId: string, userIds: string | string[]): Status;
    /**
     * moderate channel
     * @param channelId channel to moderate
     * @param moderation moderation to apply
     * @returns status response
     */
    moderate(channelId: string, moderation: Moderation): Status;
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
        [key: string]: Message[];
    }>;
    /**
     * get channel list, this can be configured to only get channels user is member or just public channels
     * @param pagination the results returned by default first 100
     * @param listPublicOnly option to ony list public channels, buy default false thus returns only is member channels
     */
    list(pagination?: Pagination, listPublicOnly?: boolean): Promise<{
        channels: Channel[];
    }>;
}
/** channel moderation type */
type ModerationType = 'block' | 'unblock' | 'make_admin' | 'revoke_admin';
/** channel moderation */
interface Moderation {
    mode: ModerationType;
    users: string | string[];
}
/**
 * channel
 */
interface Channel {
    id: string;
    name: string;
    metadata: {
        logo?: string;
        about?: string;
    };
}
/**
 * create a new channel
 */
interface NewChannel extends Channel {
    users?: string[];
}
/*** pagination*/
interface Pagination {
    starting_after: string;
    limit: number;
}
/*** a channel user*/
interface ChannelUser {
    /** user id */
    id: string;
    /** user name in channel */
    name: string;
    /** user access level */
    mode: number;
}
/** common status response from most channel operations */
type Status = Promise<{
    status: number;
}>;
export {};
