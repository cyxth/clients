/**
 * cyxth node sdk v0.0.0
 */
import { Secret } from 'jsonwebtoken-esm';
/** token options*/
interface TokenOptions {
    duration: string;
    pkce: boolean;
}
/**
 * token data to pass to `authorize` in cyxth frontend sdk
 */
interface TokenData {
    token: String;
    code_challenge: String;
    code_verifier: String;
}
/**
 * Cyxth
 */
declare class Cyxth {
    #private;
    /**
     * cyxth backend sdk to createTokens, revokeTokens and manage your
     * cyxth resources
     * @param appId cyxth app Id
     * @param appSecret  cyxth app Secret
     */
    constructor(appId: string, appSecret: Secret);
    /**
     * create an auth token to authenticate users with cyxth backend sdk
     *
     * @param user  the user to authenticate
     * @param options  token creation options
     * @returns token data
     */
    createToken(user: User, options?: TokenOptions): TokenData | string;
}
type ChannelUser = {
    id: string;
    mode: number;
};
type NewUser = {
    type: 'NewUser';
    id: string;
    name: string;
    access: number;
    metadata?: object;
    channels?: ChannelUser[];
};
type ExistingUser = {
    type: 'User';
    id: string;
    channels?: ChannelUser[];
    temporary?: boolean;
    access?: number;
};
/** auth user  */
type User = NewUser | ExistingUser;
export default Cyxth;
