import { Message } from './messages';
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
interface Id {
    id: string;
}
/**
 * create a new channel
 */
interface NewChannel extends Channel {
    members?: string[];
}
/**
 * load channel with some recent messages
 */
interface ExtendedChannel extends Channel {
    messages: Message[];
    activity: Message[];
}
interface User {
    id: string;
    name: string;
    mode: number;
    metadata: {
        avatar?: string;
    };
}
/**
 * channel creation options
 */
interface ChannelCretateOptions extends Channel {
    type: 'open' | 'private' | 'restricted';
    members?: string[];
    bio?: string;
    banner?: string;
}
interface ChannelJoinOptions {
    token?: string;
}
interface ChannelDeleteOptions {
}
interface ChannelModerationOptions {
    userIds: string[];
    mode: PermissionMode;
}
declare enum PermissionMode {
    block = 0,
    send_recv = 600,
    send_only = 200,
    recv_only = 400,
    admin = 700
}
interface ChannelUpdateOptions {
}
/**
 * user left the channel
 */
interface ChannelLeft {
}
/**
 * pagination
 */
interface Pagination {
    starting_after: string;
    limit: string;
}
/**
 * status response
 *  a status of > 1 is success usually number or entities affected by query
 *   0 means failure or no change applied
 */
interface StatusResponse {
    status: number;
}
export { Channel, ChannelLeft, ChannelCretateOptions, ChannelDeleteOptions, ChannelJoinOptions, ChannelModerationOptions, ChannelUpdateOptions, NewChannel, ExtendedChannel, User, Id, Pagination, StatusResponse };
