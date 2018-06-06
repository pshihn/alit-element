import 'reflect-metadata';
import { LitElement } from '@polymer/lit-element/lit-element.js';
export { html } from '@polymer/lit-element/lit-element.js';
export { TemplateResult } from 'lit-html/lit-html.js';
export class AlitElement extends LitElement {
    constructor() {
        super(...arguments);
        this._$ = {};
    }
    /**
     * Get element with specified if in the element's shadow root
     * @param id Id of element
     */
    $(id) {
        if (!this._$[id]) {
            const e = this.shadowRoot.querySelector(`#${id}`);
            if (e) {
                this._$[id] = e;
            }
            else {
                return null;
            }
        }
        return this._$[id];
    }
    /**
     * Find first element macthing the slector in the element's shadow root.
     * @param selector query selector string
     */
    $$(selector) {
        return this.shadowRoot.querySelector(selector);
    }
    /**
     * Find all elements matching the selector in the element's shadow root.
     * @param selector query selector string
     */
    $$All(selector) {
        return this.shadowRoot.querySelectorAll(selector);
    }
    /**
     * Fires a custom event with the specified name
     * @param name Name of the event
     * @param detail Optional event detail object
     * @param bubbles Optional - if the event bubbles. Default is TRUE.
     * @param composed Optional - if the event bubbles past the shadow root. Default is TRUE.
     */
    fireEvent(name, detail, bubbles = true, composed = true) {
        if (name) {
            const init = {
                bubbles: (typeof bubbles === 'boolean') ? bubbles : true,
                composed: (typeof composed === 'boolean') ? composed : true
            };
            if (detail) {
                init.detail = detail;
            }
            this.dispatchEvent(new CustomEvent(name, init));
        }
    }
    /**
     * Since LitElement does not extend HTMLElement in the definition,
     * this casts the current element as aan HTMLElelemnt
     */
    get node() {
        return this;
    }
}
/***********************************
 * Functions to support decorators
 ***********************************/
export function element(name) {
    return (c) => {
        if (name) {
            window.customElements.define(name, c);
        }
    };
}
export function property() {
    return (prototype, propertyName) => {
        const constructor = prototype.constructor;
        if (!constructor.hasOwnProperty('properties')) {
            Object.defineProperty(constructor, 'properties', { value: {} });
        }
        constructor.properties[propertyName] = { type: getType(prototype, propertyName) || String };
    };
}
function getType(prototype, propertyName) {
    if (Reflect.hasMetadata) {
        if (Reflect.hasMetadata('design:type', prototype, propertyName)) {
            return Reflect.getMetadata('design:type', prototype, propertyName);
        }
    }
    return null;
}
