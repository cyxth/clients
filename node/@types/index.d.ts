/**
 * cyxth node sdk v0.0.0
 */
import { Secret } from "jsonwebtoken-esm";
/**
 * user object
 */
interface User {
    id: String;
    name: String;
    avatar?: String;
}
/**
 * token options
 */
interface TokenOptions {
    duration: String;
    algorithm: "HS256";
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
    constructor(appId: String, appSecret: Secret);
    /**
     * create an auth token to authenticate users with cyxth backend sdk
     *
     * @param user  the user to authenticate
     * @param options  token creation options
     * @returns token data
     */
    createToken(user: User, options?: TokenOptions): TokenData;
}
export default Cyxth;
