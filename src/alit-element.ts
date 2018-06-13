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

export type ObserveHandler = (changeRecords: ChangeRecord[]) => void;

export class AlitElement extends LitElement {
  static get __listeners(): EventListenerDeclaration[] { return []; }
  static get __observers(): { [name: string]: ObserveHandler[] } { return {}; }
  private _$: { [id: string]: HTMLElement } = {};

  /**
   * Get element with specified if in the element's shadow root
   * @param id Id of element
   */
  $(id: string): HTMLElement {
    if (!this._$[id]) {
      const e = this.shadowRoot.querySelector(`#${id}`);
      if (e) {
        this._$[id] = e;
      }
    }
    return this._$[id];
  }

  /**
   * Find first element macthing the slector in the element's shadow root.
   * @param selector query selector string
   */
  $$(selector: string): HTMLElement {
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

  connectedCallback() {
    super.connectedCallback();
    const listeners = (<typeof AlitElement>this.constructor).__listeners;
    for (const listener of listeners) {
      if (listener.eventName && listener.handler) {
        const target = (typeof listener.target === 'string') ? this.$$(listener.target) : listener.target;
        if (target && target.addEventListener) {
          target.addEventListener(listener.eventName, (e) => {
            listener.handler.call(this, e);
          });
        }
      }
    }
  }

  _propertiesChanged(currentProps: object, changedProps: object, oldProps: object): void {
    const observers = (<typeof AlitElement>this.constructor).__observers;
    const map = new Map<ObserveHandler, ChangeRecord[]>();
    for (const propName in changedProps) {
      const handlers = observers[propName];
      if (handlers && handlers.length) {
        const changeRecord: ChangeRecord = {
          path: propName,
          value: changedProps[propName],
          oldValue: oldProps[propName]
        };
        for (const handler of handlers) {
          if (!map.has(handler)) {
            map.set(handler, [changeRecord]);
          } else {
            map.get(handler)!.push(changeRecord);
          }
        }
      }
    }
    for (const handler of map.keys()) {
      try {
        handler.call(this, map.get(handler));
      } catch (err) {
        console.warn(err);
      }
    }
    super._propertiesChanged(currentProps, changedProps, oldProps);
  }
}