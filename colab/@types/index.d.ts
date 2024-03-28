import ChangeContext from './change';
/**
 * cyxth collab provides you with an API to easily
 * add real time collaboration to your application in minutes.
 *
 * @example
 * ```ts
 * import Cyxth from '@cyxth/core';
 * import Colab from '@cyxth/colab';
 *
 * const APP_ID = "YOUR_APP_ID";
 * const cyxth = new Cyxth(APP_ID);
 * cyxth.register([Colab]);
 *
 * // authorize user check https://docs.cyxth.com/authorize for more info
 * await cyxth.connect(USER_TOKEN_SMH);
 *
 * const colab = await cyxth.colab("https://cdn.cyxth.com/colab@0.0.1.wasm");
 *
 * const stateId = "tasks-01";
 * const initialState = {
 *     tasks:[]
 * };
 *
 * await cyxth.start(stateId);
 *
 * colab.change('tasks').getList().push({
 *     date: new Date().toIsoString(),
 *     done: false,
 *     value: "write the docs",
 * });
 *
 *colab.on((change) => {...update tasks})
 * ```
 */
export default class Colab {
    #private;
    /** state id */
    stateId?: string;
    /** colab wasm url */
    wasmUrl?: string;
    private constructor();
    private __loadWasm;
    /**
     *  start a collaboration instance
     *
     *  this will fails if
     * - stateId is not unique or exists
     * - user is blocked
     * - collaboration is disabled
     * @param stateId a unique stateId | channel
     * @param initialState initial state prior to any changes
     * @param config collaboration configuration
     */
    start(stateId: string, initialState?: any, config?: ColabConfig): Promise<void>;
    /**
     * join a collaboration instance
     * will fail if user is blocked or state with id does not exist
     * @param stateId state id
     * @returns an upto date state value
     */
    join(stateId: string): Promise<any>;
    /**
     * load a collaboration instance
     *
     * user must have started or joined the collaboration instance earlier for this to work
     * will fail if user is blocked or state with id does not exist
     * @param stateId state id
     * @returns an upto date state value
     */
    load(stateId: string): Promise<any>;
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
     * change the local state
     * @param path key path
     * @returns change context
     */
    change(path: KeyPath): ChangeContext;
    private __innerChange;
    /**
     * moderate connected users, user has to be admin in current state to use this
     *
     * this involves giving users permissions to view or edit state, give users admin priviledges or block access
     *
     *  available permissions include "viewer" | "editor" | "admin" | "no-access"
     * @param users user ids to moderate
     * @param permission permission
     * @returns true if moderated else false
     */
    moderateUsers(users: string | string[], permission: CollabPermission): Promise<boolean>;
    /**
     * remove users with given id from colab instance,
     * @param users user id (s) to remove
     * @returns true if removed else false
     */
    removeUsers(users: string | string[]): Promise<boolean>;
    /**
     * add users to the colaboration  instance
     * @param users the users to add
     * @returns true if added else false
     */
    addUsers(users: CollabUser | CollabUser[]): Promise<boolean>;
    /**
     * get active|online users in the colab instance
     *
     * to update list irt use `user:join` and `user:leave`
     * @param allUsers return all users in colab instance, by default this is false and only returns online users
     * @example
     * ```ts
     * let users: CollabUser[] = await  colab.getUsers();
     *
     * colab.on("user:join",(user: CollabUser) => {
     *     //... update list
     * })
     *
     * colab.on("user:leave",(userId: string) => {
     *     //... update list
     * })
     * ```
     * @returns active users in the colab instance
     */
    getUsers(allUsers?: boolean): Promise<CollabUser[]>;
    /**
     * listen for events in the collab instance
     *
     * check `CollabEvent` for a full list of available events
     * @example
     * ```ts
     * colab.on("user:join",(user: CollabUser) => {
     *     //... update list
     * })
     * ```
     * @param event event
     * @param callback callback
     */
    on(event: ColabEvent, callback: (e: any) => void): void;
    /**
     * delete state from server
     * @param reason optional reason for deleting the state
     * @returns true or false depending on delete status
     */
    delete(reason?: string): Promise<any>;
    /**
     * update state configurtion
     * @param config config
     * @param addUserEvents set add or remove events, by default adds, set to false to remove events from config
     * @returns true or false depending on update status
     */
    configure(config: ColabConfig, addUserEvents?: boolean): Promise<any> | undefined;
    static pluginId(): string;
    /** check the health of colab instance */
    healthCheck(): void;
}
/**
 * colab user event, listen for any of these using `on`
 */
export type ColabUserEvent = 'user:join' | 'user:leave' | 'user:moderate' | 'user:add' | 'user:remove';
/**
 * colab state event, listen for any of these using `on`
 */
export type ColabStateEvent = 'state:delete' | 'state:configure';
/**
 * colab event, listen for any of these using `on`
 */
export type ColabEvent = ColabUserEvent | 'change' | 'presence' | ColabStateEvent;
/**
 * user permissions in colab instance
 */
export type CollabPermission = 'viewer' | 'editor' | 'admin' | 'no-access';
/**
 * colab configuration
 */
export interface ColabConfig {
    /** permission for new users */
    defaultPermission?: CollabPermission;
    /** events sent to users,
     *  by default only join and leave are sent to all users
     * the rest are only sent to admins
     */
    userEvents?: ColabUserEvent[];
}
/** colab user */
export type CollabUser = string | {
    id: string;
    permission: CollabPermission;
};
/** key path to use in changeContext methods */
export type KeyPath = string | string[];
