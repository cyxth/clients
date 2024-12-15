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
     * join given channels on authorized. these channels has the devloper as the only admin
     *
     * useful for general groups that each user must join.
     */
    channels?: InitialChannel[];
    /**
     * user permissions
     *
     * for more info about permissions check [permissions guide](/docs/guides/concepts#permissions)
     */
    mode?: number;
}
/**
 * token options
 */
interface TokenOptions {
    /**
     * token expiration duration.
     *
     *  by default 12 hr, with a max of 3 days.
     *
     *  Valid units are: "sec", "secs", "second", "seconds", "s", "minute", "minutes", "min", "mins", "m", "hour", "hours", "hr", "hrs", "h", "day", "days", "d", "week", "weeks", "w", "year", "years", "yr", "yrs", and "y". It is not possible to specify months. 365.25 days is used as an alias for a year.
     */
    duration?: string;
    /**
     * whether to create pkce challenges (proof key for code exchange). by default this is false so pkce is created in browser.
     *
     * note: its recommended to leave this as false, only works with mordern browsers that support subtle crypto.
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
    mode?: number;
    /** user data in channel */
    data?: any;
}
export default Auth;
export { UserInfo, TokenOptions, TokenData };
