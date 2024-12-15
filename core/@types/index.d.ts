export default class Cyxth {
    #private;
    /** cyxth app url from cyxth console https://app.cyxth.com */
    appUrl: string;
    /** user connection status*/
    connected: boolean;
    /**
     * create a new cyxth instance
     *
     * @param appUrl cyxth app url from cyxth console https://app.cyxth.com
     * @param plugins | cyxth modules i.e Colab, Chat and Calls. you need atleast one of the core modules
     *
     * @example
     *
     * ```ts
     * import Cyxth from '@cyxth/core';
     * import Colab from '@cyxth/colab';
     * import Calls from '@cyxth/calls';
     *
     * const APP_URL = "my-app.apps.cyxth.com";
     * const cyxth = new Cyxth(APP_URL, [Colab,Calls])
     * ```
     */
    constructor(appUrl: string, plugins?: any[]);
    /**
     * connect to cyxth realtime servers
     *
     * use your unique generated token
     * @param token user auth token
     * @returns {@link Cyxth | Cyxth}
     */
    connect(token: string | TokenData): Promise<Cyxth>;
    /**
     * disconeect from cyxth server
     * @returns true
     */
    disconnect(): boolean;
    /**
     * get a colab instance
     *
     * ``` ts
     *  import Cyxth from '@cyxht/core';
     *  import Colab from '@cyxth/colab';
     *
     *  const APP_URL = "my-app.apps.cyxth.com"; // app id
     *  const TOKEN = "e....."; // user auth token
     *
     *  const cyxth = await new Cyxth(APP_URL, [Colab]).connect(TOKEN);
     *  const colab = await cyxth.colab("https://cdn.cyxth.com/colab_0.0.1.wasm");
     * ```
     *
     * @param wasmUrl colab-wasm binary url
     * @returns Colab
     */
    colab(wasmUrl?: string): Promise<any>;
    /**
     * get a chat instance
     *
     * ``` ts
     *  import Cyxth from '@cyxht/core';
     *  import Chat from '@cyxth/chat';
     *
     *  const APP_URL = "my-app.apps.cyxth.com"; // app id
     *  const TOKEN = "e....."; // user auth token
     *
     *  const cyxth = await new Cyxth(APP_URL, [Chat]).connect(TOKEN);
     *  const chat = cyxth.chat();
     * ```
     *
     * @returns Chat
     */
    chat(): any;
    /**
     * calls - video and audio call functionality
     *
     * ```ts
     *  import Cyxth from '@cyxht/core';
     *  import Calls from '@cyxth/calls';
     *
     *  const APP_URL = "my-app.apps.cyxth.com"; // app id
     *  const TOKEN = "e....."; // user auth token
     *
     *  const cyxth = await new Cyxth(APP_URL, [Calls]).connect(TOKEN);
     *  const calls = cyxth.calls();
     * ```
     * @returns Calls
     */
    calls(): any;
    /**
     * listen for disconnect and error events
     * @param event
     * @param handler function
     */
    on<K extends keyof CyxthEventMap>(event: K, handler: (data: CyxthEventMap[K]) => any): void;
}
/**
 * token data to pass from `createToken` in cyxth backend modules
 */
export interface TokenData {
    token: string;
    code_challenge: string;
    code_verifier: string;
}
/**
 * cyxth event map
 */
export interface CyxthEventMap {
    "disconnect": {
        reason: string;
        code: number;
    };
    "error": {
        code: string;
        message: string;
    };
}
