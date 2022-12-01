/**
 * channel
 */
interface Channel {
    id: string;
    name: string;
    logo?: string;
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
    user_id: string;
    token?: string;
}
interface ChannelDeleteOptions {
}
interface ChannelModerationOptions {
}
interface ChannelUpdateOptions {
}
/**
 * user left the channel
 */
interface ChannelLeft {
}
export { Channel, ChannelLeft, ChannelCretateOptions, ChannelDeleteOptions, ChannelJoinOptions, ChannelModerationOptions, ChannelUpdateOptions };
