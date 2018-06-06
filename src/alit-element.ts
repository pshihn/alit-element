import 'reflect-metadata';
import { LitElement } from '@polymer/lit-element/lit-element.js';
export { html } from '@polymer/lit-element/lit-element.js';
export { TemplateResult } from 'lit-html/lit-html.js';

export class AlitElement extends LitElement {
  private _$: { [id: string]: HTMLElement } = {};

  /**
   * Get element with specified if in the element's shadow root
   * @param id Id of element
   */
  $(id: string): HTMLElement | null {
    if (!this._$[id]) {
      const e = this.shadowRoot.querySelector(`#${id}`);
      if (e) {
        this._$[id] = e;
      } else {
        return null;
      }
    }
    return this._$[id];
  }

  /**
   * Find first element macthing the slector in the element's shadow root.
   * @param selector query selector string
   */
  $$(selector: string): HTMLElement | null {
    return this.shadowRoot.querySelector(selector);
  }

  /**
   * Find all elements matching the selector in the element's shadow root.
   * @param selector query selector string
   */
  $$All(selector: string) {
    return this.shadowRoot.querySelectorAll(selector);
  }

  /**
   * Fires a custom event with the specified name
   * @param name Name of the event
   * @param detail Optional event detail object
   * @param bubbles Optional - if the event bubbles. Default is TRUE.
   * @param composed Optional - if the event bubbles past the shadow root. Default is TRUE. 
   */
  fireEvent(name: string, detail?: any, bubbles: boolean = true, composed: boolean = true) {
    if (name) {
      const init: any = {
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
  get node(): HTMLElement {
    return (this as any) as HTMLElement;
  }
}

/***********************************
 * Functions to support decorators
 ***********************************/

export function element(name: string) {
  return (c: any) => {
    if (name) {
      window.customElements.define(name, c);
    }
  };
}

export function property() {
  return (prototype: any, propertyName: string) => {
    const constructor = prototype.constructor;
    if (!constructor.hasOwnProperty('properties')) {
      Object.defineProperty(constructor, 'properties', { value: {} });
    }
    constructor.properties[propertyName] = { type: getType(prototype, propertyName) || String };
  };
}

function getType(prototype: any, propertyName: string): any {
  if (Reflect.hasMetadata) {
    if (Reflect.hasMetadata('design:type', prototype, propertyName)) {
      return Reflect.getMetadata('design:type', prototype, propertyName);
    }
  }
  return null;
}