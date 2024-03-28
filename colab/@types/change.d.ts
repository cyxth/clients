import { KeyPath } from '.';
/**
 * colab change context
 */
export default class ChangeContext {
    #private;
    /**
     * add key to change path
     * @param path key path
     * @returns change context
     */
    key(path: KeyPath): ChangeContext;
    /**
     * update or create a value
     * @param value
     * @returns
     */
    update(value: any): Promise<any>;
    /**
     * delete value at key or index
     * @returns
     */
    delete(): Promise<any>;
    /**
     * get list at a given path
     * @param path
     * @returns
     */
    getList(path?: KeyPath): List;
    /**
     * collaborative text editing
     * @returns text
     */
    getText(): Text;
    /**
     * collaborative counter
     * @returns counter
     */
    getCounter(): Counter;
    private __errors;
    private build;
}
/**
 * list operations i.e insert, delete, push and pop
 */
export interface List {
    /**
     * insert element in a list
     * @param index position to do the insert
     * @param value value to insert
     */
    insert(index: number, value: any): Promise<any>;
    /**
     * delete an element from a list
     * this is similar to
     *
     * @example
     *  colab.change("tags").getList().index(0).delete()
     * @param index index to delete
     */
    delete(index: number): Promise<any>;
    /**
     * push a value to the end of the list
     * @param value value to push
     */
    push(value: any): Promise<any>;
    /**
     * remove an element at the end of the list
     */
    pop(): Promise<any>;
    /**
     * select an index in the list to update or delete the value
     * @example
     *  colab.change('tags').getList().index(0).update({hobbies: true})
     * @param index
     */
    index(index: number): ChangeContext;
}
/**
 * collaborative text editing
 * @example
 * try {
 *	let doc: Text = colab.change('doc').getText();
 *	await text.insert(0, 'hello world');
 *} catch (e) {
 *	console.error(e);
 * }
 *
 */
export interface Text {
    /**
     * insert text value at index
     * @param index index in text ,0 based
     * @param value string to insert
     */
    insert(index: number, value: string): Promise<any>;
    /**
     * delete at index
     * @param index index to start deletion
     * @param length number of characters to delete
     */
    delete(index: number, length: number): Promise<any>;
    /**
     * get the value of the underlying text
     */
    value(): Promise<string>;
}
/**
 * a collaborative counter
 * @example
 *  let counter: Counter = colab.change("clicks").getCounter()
 *  counter.increment()
 */
export interface Counter {
    /**
     * increment counter
     */
    increment(): Promise<any>;
    /**
     * decrement counter
     */
    decrement(): Promise<any>;
    /**
     * get value of counter
     */
    value(): Promise<number>;
}
