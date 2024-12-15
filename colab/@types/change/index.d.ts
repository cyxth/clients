/**
 * change context
 */
export interface Context {
    /**
     * get a text node
     *
     * @param key top level key
     * @returns Text
     */
    text(key: string): Text;
    /**
     * get a counter node
     *
     * @param key top level key
     * @returns Counter
     */
    counter(key: string): Counter;
    /**
     * get a tree node
     *
     * @param key top level key
     * @returns Tree
     */
    tree(key: string): Tree;
}
/**
 * adds collaborative text editing capabilities similar to those found in google docs.
 *
 * @example
 *
 * ```ts
 * //...
 * const context = colab.changeContext();
 * const mydoc = context.text("doc"); // text node at "doc" key
 *
 * // set handlers
 * mydoc.handlers = {
 *  insert(index,value,ctx){
 *    console.log(ctx.userId);
 *    console.log("inserted" + value + "at" + index );
 *  },
 *
 *  delete(fragments,ctx){
 *    fragments.forEach(fragment => {
 *      console.log("deleted" + length + "characters at" + index );
 *    });
 *  }
 * }
 *
 * // edit text
 * const edit = (index, text, delCount) => {
 *    mydoc.replace(index,text,delCount);
 * }
 *
 * // ...
 * ```
 */
export interface Text {
    /**
     * text change handlers
     *
     * to set text handlers
     *
     * @example
     *
     * ```ts
     * const text = ctx.text("doc");
     *
     * text.handler = {
     *  insert(index,value,ctx) {
     *    if (ctx.isLocal) return;
     *    console.log("inserted" + value + "at" + index );
     *  }
     * }
     * ```
     */
    handlers: {
        /**
         * handle insert operation
         *
         * @param index insert index
         * @param text value inserted
         * @param ctx context of change i.e local or remote check {@link Ictx}
         */
        insert?: (index: number, text: string, ctx: Ictx) => any;
        /**
         * handle delete operation
         *
         * @param fragments deleted fragments
         * @param ctx context of change i.e local or remote check {@link Ictx}
         */
        delete?: (fragments: TextFragment[], ctx: Ictx) => any;
        /**
         * handle replace operation
         *
         * this handler is not mandatory, delete and insert handlers are automatically called if not handled.
         * @param fragments deleted fragments
         * @param index index to start insert
         * @param text text to insert
         * @param ctx context of change i.e local or remote check {@link Ictx}
         */
        replace?: (fragments: TextFragment[], index: number, text: string, ctx: Ictx) => any;
    };
    /**
    * insert text
    *
    * @param index insert index
    * @param text text value to insert
    */
    insert(index: number, text: string): void;
    /**
    * delete text
    *
    * @param index  index to start deletion on
    * @param length  number of characters to delete
    */
    delete(index: number, length: number): void;
    /**
    * replace text
    *
    * this is equivalent to deleting a range of text then inserting text but done together. if text is a empty string
    * it is converted to a delete only, if delCount is 0 its converted to insert. if text is empty and delCount is 0
    * it is a no-op.
    *
    * @param index index to start replace
    * @param text text to insert
    * @param delCount number of characters to delete
    */
    replace(index: number, text: string, delCount: number): void;
    /**
    * get text value
    * @returns text value or undefined if text has not been modified yet
    */
    value(): string | undefined;
}
/**
 * a deleted text fragment
 */
export interface TextFragment {
    /**
     * delete start index
     */
    index: number;
    /**
     * number of deleted characters
     */
    length: number;
}
/**
 * a simple collaborative increment decrement counter
 *
 * @example
 * ```ts
 * //... a small counter app
 *
 * const context = colab.changeContext();
 * const clicks = context.counter("clicks");
 *
 * // set handler
 * clicks.handler = {
 *    update(value, ctx) => {
 *      consoe.log(ctx.userId);
 *      console.log("updated counter", value );
 *      valEl.innerText = value;
 *    }
 * }
 *
 * const incBtn = document.getElementById("inc");
 * const decBtn = document.getElementById("dec");
 * const valEl = document.getElementById("val");
 *
 * incbtn.onclick = () => clicks.increment();
 * decBtn.onclick = () => clicks.decrement();
 *
 * // ... your app logic
 *
 * ```
 *
 */
export interface Counter {
    /**
     * counter handlers
     *
     * counter has only one handler `update` that is called on increment and decrement
     *
     * to set handlers
     *
     * @example
     *
     * ```ts
     * clicks.handlers = {
     *  update(value, ctx) => {
     *    console.log(value,ctx)
     *  }
     * }
     * ```
     */
    handlers: {
        /**
         * update is the handler for both increment and decrement operation
         *
         * @param new value
         * @param ctx context of change i.e local or remote check {@link Ictx}
         *
         */
        update?: (value: number, ctx: Ictx) => any;
    };
    /**
     * increment counter
     */
    increment(): void;
    /**
     * decrement counter
     */
    decrement(): void;
    /**
     * get counter value
     *
     * @returns counter value or undefined if counter has not been modified
     */
    value(): number | undefined;
}
/**
 * tree holds deeply nested maps and lists enabling you to represent any
 * custom state. list have strictly ordered elements with numeric indicies and maps are key
 * value pairs. you can nest values in any way to fit your usecase.
 *
 * @example
 * ```ts
 * const context = colab.changeContext();
 * const tree = context.tree("tasks");
 *
 * const tasks = tree.setActions((tasks: Task[]) => {
 *  createTask(index: number, task: Task){
 *    tasks.insert(index, task);
 *  },
 *
 *  markDone(index: number, done: boolean){
 *    tasks[index].done = done;
 *  },
 *
 *  deleteTask(index:number){
 *    tasks[index].delete()
 *  }
 *
 * //...
 * });
 *
 * tree.setHandlers({
 *  createTask(index: number, task: Task, ctx: Ictx){
 *    //... add task to ui
 *  },
 *  markDone(index:number, done: booleab, ctx: Ictx){
 *    // ...
 *  },
 *
 * //...
 * });
 *
 * // use in predefined actions
 * tasks.createTask(0, {
 *    title: "update ",
 *    done: false,
 *    desdcription: "the new docs",
 *    tags:["docs", "cyxth"]
 *  });
 *
 * //or modify directly
 * tree.state.tasks[0].tags.push("colab");
 *
 * // ...
 *
 * ```
 *
 *
 */
export interface Tree {
    /**
     * default action handler
     *
     * useful if you don't have predefined actions and handlers. state changes done directly with {@link Tree.state}
     * trigger these default handlers if they don't match handlers.
     *
     * there are three main tree actions `insert`, `delete` and `update`. insert and update set value at a certain
     * keypath whereas delete deletes value at key path. the main difference between insert and update is insert serves
     * to differentiante list inserts and updates otherwise all inserts to objects are updates. if all named handlers
     * fail one of these handlers will be triggered.
     */
    defaultHandlers: {
        /**
         * inserted element at path.
         *
         * note this is only triggered for list nodes and the last path element is always the list insert index.
         */
        insert?: (path: (string | number)[], value: any, ctx: Ictx) => any;
        /**
         * updated element at path
         */
        update?: (path: (string | number)[], value: any, ctx: Ictx) => any;
        /**
         * deleted element at path
         */
        delete?: (path: (string | number)[], ctx: Ictx) => any;
    };
    /**
     * set actions that modify state
     *
     * Text and Counter have predefined actions insert, delete & replace and update respectively.
     * to achieve the same functionality for tree we create our own actions and handlers. actions
     * are created by providing named functions that modify state. these functions are transformed to
     * handlers with an added context.
     *
     * Note: For handlers to work you must set actions first. check handlers for more
     *
     * @example
     * ```ts
     * //...
     *
     * const tree = context.tree("tasks");
     *
     * const myTasks = tree.setActions((tasks: Task[]) => {
     *    createTask(index: number, task: Task){
     *      tasks.insert(index, task);
     *    },
     *
     *    markDone(index: number, done: boolean){
     *      tasks[index].done = done;
     *    },
     *
     *    updateTask(index: number, data: Partial<Task>){
     *      tasks[index].update(data);
     *    }
     * });
     *
     * // now to use in your application
     *
     * myTasks.createTask(0, {
     *  title: "hello world",
     *  done: false,
     *  description: "am just saying hi!"
     * });
     *
     * //...
     * ```
     *
     * @param actions state modification functions.
     * @returns the same actions you provide, use the actions to modify state in app
     *
     */
    setActions(actions: (state: any) => void): any;
    /**
     * set action handlers
     *
     * @example
     * ```ts
     * tree.setHandlers({
     *    createTask(index: number, task: Task, ctx: Ictx){
     *      console.log(ctx.userId);
     *      console.log("created task at index ${index} :",task);
     *    }
     *
     *  // ...
     * })
     * ```
     *
     * when the actions set are performed either locally or remotely they are handled by the same
     * handlers. this generally the actions you pass with {@link Tree.setActions | setActions} with an added
     * context parameter.
     *
     * if you use `push()` and `pop()` in actions there is a `pushIndex` and `popIndex` respectively in the context
     * don't push or pop in handler as the indicies might have changed which may lead to inconsistency with ui.
     *
     */
    setHandlers(handlers: any): any;
    /**
     * get state for direct modification
     *
     * note: though the state may look like regular javascript objects they are not
     * only a subset of operations are supported. for example for lists there is only push and pop
     * from javascript which work completly different from regular js arrays. colab adds insert method for
     * lists instead of shift and unshit and an update method to lists and objects
     *
     * here is a list of supported methods
     * - **push** - lists only
     * - **pop** - lists only
     * - **insert** - lists only
     * - **update** - lists and objects
     * - **delete** - lists and objects
     *
     *
     * @example
     * ```
     * const tree = context.tree("tasks");
     *
     * const tasks: Task[] = tree.state;
     * tasks.push({title: "hello world"});
     * tasks[0].title = "hi cyxth!";
     * ```
     *
     */
    get state(): any;
    /**
     * get tree value
     *
     * @returns the current state and concurrent values if they exist
     */
    value(path: any): {
        state: any;
        concurrent?: any;
    };
}
/**
 * handler context
 */
export interface Ictx {
    /**
     * userid that triggered change
     */
    userId?: string;
    /**
     * true if local
     */
    isLocal?: boolean;
    /**
     * if in setActions there is a push operation. the handler will function will have
     * a pushIndex basically turning a push to insert | shift
     */
    pushIndex?: number;
    /**
     * if in setActions there is a pop operation. the corresponding handler will have
     * a popIndex basically turning a pop to delete | shift
     */
    popIndex?: number;
    /**
     * only in updates,
     * concurrent values for the same path if any. these can be added to ui to show there was
     * a conflict. note the returned update value is uniform across all users this field only serves
     * to show alternative values and can be ignored.
     */
    concurrent?: any;
}
