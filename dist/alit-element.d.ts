import 'reflect-metadata';
import { LitElement } from '@polymer/lit-element/lit-element.js';
export { html } from '@polymer/lit-element/lit-element.js';
export { TemplateResult } from 'lit-html/lit-html.js';
export interface EventListenerDeclaration {
    eventName: string;
    target: string | EventTarget;
    handler: (event?: Event) => void;
}
export interface ChangeRecord {
    path: string;
    value: any;
    oldValue: any;
}
export declare type ObserveHandler = (changeRecords: ChangeRecord[]) => void;
export declare class AlitElement extends LitElement {
    static readonly __listeners: EventListenerDeclaration[];
    static readonly __observers: {
        [name: string]: ObserveHandler[];
    };
    private _$;
    /**
     * Get element with specified ID in the element's shadow root
     * @param id Id of element
     */
    $(id: string): HTMLElement;
    /**
     * Find first element macthing the slector in the element's shadow root.
     * @param selector query selector string
     */
    $$(selector: string): HTMLElement;
    /**
     * Find all elements matching the selector in the element's shadow root.
     * @param selector query selector string
     */
    $$All(selector: string): NodeList;
    /**
     * Fires a custom event with the specified name
     * @param name Name of the event
     * @param detail Optional event detail object
     * @param bubbles Optional - if the event bubbles. Default is TRUE.
     * @param composed Optional - if the event bubbles past the shadow root. Default is TRUE.
     */
    fireEvent(name: string, detail?: any, bubbles?: boolean, composed?: boolean): void;
    /**
     * Since LitElement does not extend HTMLElement in the definition,
     * this casts the current element as aan HTMLElelemnt
     */
    readonly node: HTMLElement;
    connectedCallback(): void;
    _propertiesChanged(currentProps: object, changedProps: object, oldProps: object): void;
}
