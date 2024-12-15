/**
 * calls
 */
export default class Calls implements IChannel {
    #private;
    /** the current  call channel*/
    channel: string;
    /** local tracks published by active user */
    tracks: TracksByName;
    /** current call status*/
    status: 'connected' | 'connecting' | 'disconnected' | 'checking';
    private constructor();
    /**
     * listen for call  events
     * @param event event
     * @param handler event handler
     */
    on<K extends keyof CallEventMap>(event: K, handler: (ev: CallEventMap[K]) => any): void;
    /**
     * add local tracks to call
     *
     * emits `track:add` event
     * @param tracks local tracks
     */
    addTracks(tracks: TracksByName): Promise<void>;
    /**
     * remove user tracks by name
     * emits `track:del` event
     * @param name track name(s) to remove
     */
    removeTracks(name: string | string[]): Promise<void>;
    /**
     * Mute user tracks by name(s). this will send empty frames for video and audio
     *
     * Empty audio frames have every sample's value set to 0. Empty video frames have every pixel set to black.
     *
     * emits `track:mute` event
     * @param trackName track name to mute
     * @param newState true to mute and false to unmute, if newState is currentState it is ignored
     */
    muteTracks(trackName: string | string[], newState: boolean): Promise<void>;
    /**
     * mute another user's tracks
     *
     * the user's tracks are not forwarded to other users in the same call channel until they are unmuted again
     * only call admins can mute and unmute other users or else fails with [UnAuthorized]
     *
     * this method takes in the track kind rather thanthe trackName to avoid users from recreating new tracks.
     * muting a specific trackName is not supported.
     *
     * emits `track:mute` event for all muted tracks
     * @param userId the userId to mute
     * @param kind kind of track to mute can be either "video" or "audio"
     * @param newState true to mute and false to unmute, if newState is currentState it is ignored
     * @param reason optional mute reason
     */
    muteUser(userId: string, kind: 'audio' | 'video', newState: boolean, reason?: string): Promise<void>;
    create(channelId: string, tracks?: TracksByName, config?: CallConfig): Promise<Status>;
    join(channelId: string, tracks?: TracksByName): Promise<Status>;
    leave(): Promise<Status>;
    delete(reason?: string): Promise<Status>;
    addUsers(users: string[]): Promise<Status>;
    delUsers(users: string[]): Promise<Status>;
    modUsers(users: User[]): Promise<Status>;
    getUsers(): Promise<ActiveUser[]>;
    configure(config: CallConfig): Promise<Status>;
}
/**
 * call event
 */
export interface CallEvent {
    /** userId*/
    userId: string;
    /** track name*/
    trackName: string;
    /** a reference to the user's active tracks*/
    userRef: {
        [trackName: string]: {
            muted: boolean;
            track: MediaStreamTrack;
        };
    };
}
/**
 * a track was added
 */
export interface TrackAddEvent extends CallEvent {
    /** the added track*/
    track: MediaStreamTrack;
}
/**
 * track muted
 */
export interface TrackMuteEvent extends CallEvent {
    /** mute value */
    value: boolean;
    /** if muted remotely, the userId who muted the user */
    mutedBy?: string;
    /** optional reason for muting */
    muteReason?: string;
}
/** user tracks by trackName */
export interface TracksByName {
    [name: string]: MediaStreamTrack;
}
/** a single user published track  */
export interface Track {
    /** mediastream track */
    track: MediaStreamTrack;
    /**
     * track muted status
     *
     * NOTE this does not correspond to the track muted property but the enabled property in all cases
     * can also indicate the user's tracks are blocked from being forwarded to other users
     */
    muted: boolean;
}
/**
 * call configuration
 */
export interface CallConfig {
    /**
     * media kind allowed in call, can be either 'audio', 'video' or 'audioVideo',
     * changing this property at runtime will mute existing media of the existing kind and new users
     * will not be able to transmit the disallowed kinds
     *
     * @default 'audioVideo'
     */
    kind?: 'audio' | 'video' | 'audioVideo';
    /**
     * if users should request to join first, channel admins get `cnl:req` notification and
     * can either allow or deny the new user's join request
     *
     * @default false
     */
    joinRequest?: boolean;
    /**
     * maximum number of users allowed in call
     *
     */
    maxUsers?: number;
    /**
     * default user permissions
     * by default users can send and receive any media
     * @default 6
     */
    defaultPermission?: number;
}
/**call user*/
export interface User {
    /** user id */
    id: string;
    /** user permission in call */
    mode: number;
}
/**operation status*/
export interface Status {
    /**operation status*/
    status: boolean;
}
interface ActiveUser {
    /**user id*/
    [userId: string]: {
        /**user tracks by name*/
        tracks: {
            [trackName: string]: Track;
        };
        /**user permissions in channel*/
        mode: number;
    };
}
/**
 * call channel interface for call specific operations
 */
export interface IChannel {
    /**
     * create a new call channel
     *
     * fails if call exists at channel id or user has no permissions to create call.
     *
     * @param channelId channel id
     * @param tracks initial tracks
     * @param config call configuration
     */
    create(channelId: string, tracks?: TracksByName, config?: CallConfig): Promise<Status>;
    /**
     * join an existing call
     *
     * emits `user:join` event
     * @param channelId channel id
     * @param tracks initial tracks
     */
    join(channelId: string, tracks?: TracksByName): Promise<Status>;
    /** leave call channel
     *
     * emits `user:left` event
     */
    leave(): Promise<Status>;
    /**
     * delete call, disconnecting all active users, only the call owner (one who started it) can do this
     *
     * emits `cnl:delete` event
     * @param reason optionally tell others the reason
     */
    delete(reason?: string): Promise<Status>;
    /**
     * add users to call, sends a `newcall` notification to users if they are online
     *
     * emits `user:add` event
     * @param users an array of user ids to add to call
     */
    addUsers(users: string[]): Promise<Status>;
    /**
     * delete | remove users from call.
     * users removed this way will not be able to join unless added again
     *
     * emits `user:del` event
     * @param users an array of user ids to delete
     */
    delUsers(users: string[]): Promise<Status>;
    /**
     * moderate users in call,
     *
     * disabling send permissions will mute a user's tracks but they will still be able to receive media,
     * disabling recv permissions will pause sending media to user though they will still be connected, updating the permissions
     * will resume send and recv operations.
     *
     * emits `user:mod` event
     *
     * check [concepts](/docs/guides/concepts) for more about permissions
     * @param users an array of users to moderate
     */
    modUsers(users: User[]): Promise<Status>;
    /**
     * get active call users,
     * @returns active users mapped with their active tracks and muted statuses
     */
    getUsers(): Promise<ActiveUser[]>;
    /**
     * update channel configuration
     *
     * emtts `cnl:config` event
     * @param config call channel configuration
     */
    configure(config: CallConfig): Promise<Status>;
}
/**event map */
export interface CallEventMap {
    /** track added */
    'track:add': TrackAddEvent;
    /** track muted */
    'track:mute': TrackMuteEvent;
    /** track deleted */
    'track:del': CallEvent;
    /** config updated */
    'cnl:config': {
        senderId: string;
        config: CallConfig;
    };
    /** user created channel, event sent to initial users in channel to join call */
    'cnl:create': {
        senderId: string;
        config: CallConfig;
    };
    /** channel deleted */
    'cnl:delete': {
        senerId: string;
        reason?: string;
    };
    /** a user joined call, may not have published tracks yet */
    'user:join': {
        userId: string;
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
export {};
