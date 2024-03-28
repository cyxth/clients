export default class Cyxth {
    #private;
    /** cyxth app url from cyxth console https://app.cyxth.com */
    appUrl: string;
    /** check whether user is connected to cyxth servers*/
    connected: boolean;
    /**
     * create a new cyxth instance
     * @param appUrl cyxth app url from cyxth console https://app.cyxth.com
     */
    constructor(appUrl: string);
    /**
     * generates a pkce challenge in browser
     * @returns a promise with the generated pkce {codeVerifier, codeChallenge}
     */
    generatePkce(): Promise<{
        codeVerifier: string;
        codeChallenge: string;
    }>;
    /**
     * connect to cyxth realtime servers
     *
     * use your unique generated token
     * @param token user auth token
     */
    connect(token: string | TokenData): Promise<boolean>;
    /**
     * disconeect from cyxth server
     * @returns true
     */
    disconnect(): boolean;
    /**
     * register modules| plugins to use in cyxth instance
     * core plugins include `Colab`, 'Chats', 'Calls'
     * @param mods an array of cyxth modules|plugins
     */
    register(mods: any[]): void;
    /**
     * get a colab instance i.e
     *
     * ``` ts
     *  import Cyxth from '@cyxht/core';
     *  import Colab from '@cyxth/colab';
     *
     *  const cyx = new Cyxth(YOUR_APP_URL);
     *  cyx.register([Colab])
     *
     *  // ensure user is connected
     *  await cyx.connect('USER_TOKEN')
     *
     *  // then use colab
     *  let colab: Colab = await cyx.collab("https://cdn.cyxth.com/colab_0.0.1.wasm");
     * ```
     * @param wasmUrl wasm binary url
     * @returns Colab
     */
    colab(wasmUrl?: string): Promise<any>;
    /**
     * get a chat instance i.e
     *
     * ``` ts
     *  import Cyxth from '@cyxht/core';
     *  import Chat from '@cyxth/chat';
     *
     *  const cyx = new Cyxth(YOUR_APP_URL);
     *  cyx.register([Chat])
     *
     *  // ensure user is connected
     *  await cyx.connect('USER_TOKEN')
     *
     *  // then use chat
     *  let chat: Chat = cyx.chat();
     *
     *  chat.on("message", (message: Message) => {
     * 	 // ... handle message
     * })
     * ```
     * @returns Chat
     */
    chat(): any;
    /**
     * calls - video, audio, group conferences functionality
     *
     * ``` ts
     *  import Cyxth from '@cyxht/core';
     *  import Calls from '@cyxth/calls';
     *
     *  const cyx = new Cyxth(YOUR_APP_URL);
     *  cyx.register([Calls])
     *
     *  // ensure user is connected
     *  await cyx.connect('USER_TOKEN')
     *
     *  // then use chat
     *  let call: Calls = cyx.calls("channel_id");
     *
     *  await call.start({audio: true, video: true});
     *  call.on("connected", (data) => {
     *    // ...
     * })
     *  call.on("join",(data) => {
     *   // ...
     * })
     *
     * // call.end()
     * // call.leave()
     * // ...
     * ```
     * @returns Chat
     */
    calls(channel: string): any;
    on(event: CyxthEvent, cb: Function): void;
}
/**
 * token data to pass from `createToken` in cyxth backend modules
 */
export interface TokenData {
    token: string;
    code_challenge: string;
    code_verifier: string;
}
/** cyxth events */
type CyxthEvent = 'new-call' | 'disconnect' | 'error';
export {};
