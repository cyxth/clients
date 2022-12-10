/**
 * channel
 */
interface Channel {
    id: string;
    name: string;
    logo?: string;
    permissions?: number;
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
export { Channel, ChannelLeft, ChannelCretateOptions, ChannelDeleteOptions, ChannelJoinOptions, ChannelModerationOptions, ChannelUpdateOptions };
