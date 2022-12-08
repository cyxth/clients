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
    mode: number;
}
interface ChannelUpdateOptions {
}
/**
 * user left the channel
 */
interface ChannelLeft {
}
export { Channel, ChannelLeft, ChannelCretateOptions, ChannelDeleteOptions, ChannelJoinOptions, ChannelModerationOptions, ChannelUpdateOptions };
