export default class EventEmitter {
    callbacks: {
        [key: string]: any;
    };
    constructor();
    on(name: string, callback: Function): void;
    dispatch(event: string, data: any): void;
    drop(name: string): void;
}
