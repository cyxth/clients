/**
 * token data to pass from `createToken` in cyxth backend modules
 */
export interface TokenData {
    token: string;
    code_challenge: string;
    code_verifier: string;
}
