/**
 * cyxth push notifications support
 */
export declare class Notify {
    #private;
    constructor();
    private setTransport;
    /**
     * helper function to check if browser supports push notifications
     * @returns true if browser supports push notifications
     */
    isSupported(): boolean;
    /**
     * helper function to ask for permission to send push notifications
     * @returns true if permission was granted
     */
    askPermission(): Promise<boolean>;
    /**
     * subscribe to push notifications
     * @param serviceWorker service worker registration to use
     * by default it uses the first **active** service worker found
     * user can also pass the service worker url or name i.e 'https://example.com/sw.js' or 'sw.js'
     * or just pass the service worker registration object
     */
    subscribe(serviceWorker?: string | ServiceWorkerRegistration | undefined): Promise<boolean>;
    /**
     * unsubscribe from push notifications
     * @returns true if succesiful else false
     */
    unsubscribe(): Promise<boolean>;
}
