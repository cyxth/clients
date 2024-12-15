import { type Context } from './change/index';
/**
 * Easily turn your app multiplayer with cyxth colab.
 *
 * @example
 * ```ts
 * import Cyxth from '@cyxth/core';
 * import Colab from '@cyxth/colab';
 *
 * const APP_URL = "my-app.cyxth.com"; // appid
 * const TOKEN = "ey....."; // authorized user token
 *
 * const cyxth = await new Cyxth(APP_ID, [Colab]).connect(TOKEN);
 * const colab = await cyxth.colab("https://cdn.cyxth.com/colab@0.0.1.wasm");
 *
 * const stateId ="tasks-uxi"; // state id
 * await colab.createOrJoin(stateId); // create or join state
 *
 * const tree = colab.changeContext().tree();
 * tree.setDefaultHandler((change,userId) => {
 *  // ...handle change
 * })
 *
 * const state: {tasks: Task[]} = tree.state;
 *
 * const createTask = (task: Task) => {
 *  state.tasks.push(task);
 * }
 *
 * const markDone = (index: number, done: boolean) => {
 *  state.tasks[index].done = done;
 * }
 *
 * // ....
 *
 * ```
 */
export default class Colab implements IChannel {
    #private;
    /** state id */
    stateId?: string;
    /** colab wasm url */
    wasmUrl?: string;
    /** offline status */
    offline: boolean;
    private constructor();
    changeContext(): Context;
    private __loadWasm;
    /**
     * create a state or join if it exists
     */
    createOrJoin(stateId: string, config?: ColabConfig): Promise<Status>;
    /**
     * load a collaboration instance
     *
     * user must have started or joined the collaboration instance earlier for this to work
     * will fail if user is blocked or state with id does not exist
     * @param stateId state id
     */
    load(stateId: string): Promise<Status>;
    /**
     * send presence data to all connected users i.e text selections and cursor positions
     * to enhance the collaboration experience by conveying user intent
     *
     * other users can listen using `on` presence event
     * @example
     * ```ts
     * colab.on('presence', (data) => {
     * 		// ... convey user intent
     * })
     * ```
     * @param data and presense data
     */
    presence(data: any): void;
    /**
     * listen for colab  events
     * @param event event
     * @param handler event handler function
     * @example
     * ```ts
     * colab.on("user:join",(user) => {
     *     //... update list
     * })
     */
    on<K extends keyof ColabEventMap>(event: K, handler: (ev: ColabEventMap[K]) => any): void;
    /**
     * toggle offline status.
     *
     * cyxth will automatically set offline status when a user goes offline or when the connection is too slow
     * listen for `user:offline` event in cyxth core or colab
     */
    toggleOffline(): Promise<void>;
    static pluginId(): string;
    create(stateId: string, config?: ColabConfig): Promise<Status>;
    join(stateId: string): Promise<Status>;
    leave(): Promise<Status>;
    delete(reason?: string): Promise<any>;
    addUsers(users: string[]): Promise<Status>;
    delUsers(users: string[]): Promise<Status>;
    modUsers(users: User[]): Promise<Status>;
    getUsers(): Promise<User[]>;
    configure(config: ColabConfig): Promise<Status>;
}
/**
 * colab configuration
 */
export interface ColabConfig {
    /** permission for new users */
    defaultPermission?: number;
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
/**
 * colab channel interface for colab specific operations
 */
export interface IChannel {
    /**
     * create a new colab state
     *
     * fails if state exists at stateId or user has no permissions to create state.
     * @param stateId state id
     * @param config state configuration
     */
    create(stateId: string, config?: ColabConfig): Promise<Status>;
    /**
     * join an existing  colab state
     *
     * emits `user:join` event
     * @param stateId state id
     */
    join(stateId: string): Promise<Status>;
    /**
     * leave a colab state,
     *
     * emits `user:left` event
     */
    leave(): Promise<Status>;
    /**
     * delete a colab state disconnecting all active users, only the owner (one who started it) can do this
     * @param reason optionally tell others the reason
     */
    delete(reason?: string): Promise<Status>;
    /**
     * add users to colab state, users will get `newcolab` notification to join if they are online
     *
     * emits `user:add` event
     * @param users an array of user ids
     */
    addUsers(users: string[]): Promise<Status>;
    /**
     * remove user from state
     *
     * users removed won't be able to join again unless added
     *
     * emits `user:del` event
     * @param users an array of user ids
     */
    delUsers(users: string[]): Promise<Status>;
    /**
     * moderate users in state  deciding who has edit, view, no-access permissions
     *
     *  emits `user:mod` event
     *
     * check [concepts](/docs/guides/concepts#permissions) for more about permissions
     * @param users an array of users
     */
    modUsers(users: User[]): Promise<Status>;
    /**
     * get active colab state users
     * @returns active users connected to state
     */
    getUsers(): Promise<User[]>;
    /**
     *  update colab configuration
     * @param config new configuration
     * emits `cnl:config` event
     */
    configure(config: ColabConfig): Promise<Status>;
}
export interface ColabEventMap {
    /**
     * user presence events
     */
    presence: ColabPresenceEvent;
    /** config updated */
    'cnl:config': {
        senderId: string;
        config: ColabConfig;
    };
    /** user created channel, event sent to initial users in channel to join call */
    'cnl:create': {
        senderId: string;
        config: ColabConfig;
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
export interface ColabPresenceEvent {
    /**
     * user who sent presence data
     */
    userId: string;
    /**
     * state presence data
     */
    data: ArrayBuffer | any;
    /**
     * type of data
     */
    type: 'object' | 'binary';
}
