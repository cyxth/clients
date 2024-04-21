/**
 * cyxth authentication
 */
/**
 * authorize users to use your cyxth instance
 * @example
 * ```ts
 * import Auth from '@cyxth/auth'
 *
 * const APP_ID = 'YOUR_APP_ID';
 * const PRIVATE_KEY = env(PRIVATE_KEY);
 *
 * const auth = new AUTH(APP_ID,PRIVATE_KEY);
 * const user = {
 * 	    id: "alice"
 * }
 * const token = auth.createToken(user,{duration: '4h' })
 * // send token to frontend
 * console.log(token)
 * // and we get something like
 * // {token: "eyJhbGciOi.............-b0FjCQqTUEb_lHo2eUAUMdXgvRAA",}
 * ```
 */
declare class Auth {
    #private;
    /**
     * use this in your authorization server to allow your user to access
     *  your cyxth instance.
     * @param appId your cyxth app id
     * @param privateKey EdDsa private key
     */
    constructor(appId: string, privateKey: string);
    /**
     * create a user authorization token
     * this is the token data used to authorize users in the frontend by the
     *  `cyxth.connect` function
     * @param user user info
     * @param options token generation options
     * @returns `TokenData`
     */
    createToken(user: UserInfo, options?: TokenOptions): Promise<TokenData>;
}
/**
 * user info
 */
interface UserInfo {
    /**
     * user id, this is the only required field
     */
    id: string;
    /**
     * whether this user's data should  be saved,
     * all the other fields will be ignored if true
     */
    isTemporary?: boolean;
    /**
     * for newer users. to save to saved users use the REST api to add users beforehand for this
     * for faster logins. if the user is already saved only id is required
     */
    data?: any;
    /**
     * join given channels on authorized. these channels has the devloper as the sole admin
     */
    channels?: InitialChannel[];
    /**
     * user access level across the instance by default editor
     */
    access?: 'admin' | 'viewer' | 'editor' | 'no-access';
}
/**
 * token options
 */
interface TokenOptions {
    /**
     * token expiration duration.
     *  by default 12 hr, with a max of 3 days.
     *  Valid units are: "sec", "secs", "second", "seconds", "s", "minute", "minutes", "min", "mins", "m", "hour", "hours", "hr", "hrs", "h", "day", "days", "d", "week", "weeks", "w", "year", "years", "yr", "yrs", and "y". It is not possible to specify months. 365.25 days is used as an alias for a year.
     */
    duration?: string;
    /**
     * whether to create pkce challenges. by default this is false and the tokens are created in the client
     */
    pkce?: boolean;
}
/**
 * resulting token data
 */
interface TokenData {
    /**
     * the generated token
     */
    token: string;
    /**
     * code challenge if pkce was enabled
     */
    code_challenge?: string;
    /**
     * code verifier if pkce was enabled
     */
    code_verifier?: string;
}
/**
 *
 */
interface InitialChannel {
    /** channel id */
    id: string;
    /** user access level in channel */
    mode?: 'admin' | 'viewer' | 'editor' | 'no-access';
    /** user data in channel */
    data?: any;
}
export default Auth;
export { UserInfo, TokenOptions, TokenData };
