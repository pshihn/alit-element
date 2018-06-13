import 'reflect-metadata';
import { AlitElement, EventListenerDeclaration, ObserveHandler } from './alit-element';

export interface AlitPrototype extends AlitElement { }

/**
 * Decorator for defining a new custom element
 * @param name tag name of custom element
 */
export function element(name: string) {
  return (c: any) => {
    if (name) {
      window.customElements.define(name, c);
    }
  };
}

/**
 * Decorator to declate a property
 */
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

/**
 * Decorator to create a getter for the specified selector
 * @param selector selector to find the element
 */
export function query(selector: string) {
  return (prototype: AlitPrototype, propertyName: string) => {
    Object.defineProperty(prototype, propertyName, {
      get() {
        return (this as AlitPrototype).$$(selector);
      },
      enumerable: true,
      configurable: true
    });
  };
}

/**
 * Decorator to create a getter that returns a nodelist of all
 * elements matching the selector
 * @param selector selector query
 */
export function queryAll(selector: string) {
  return (prototype: AlitPrototype, propertyName: string) => {
    Object.defineProperty(prototype, propertyName, {
      get() {
        return (this as AlitPrototype).$$All(selector);
      },
      enumerable: true,
      configurable: true
    });
  };
}

/**
 * Decorator to add event handlers
 * @param eventName name of event, e.g. 'click'
 * @param selector EventTarget or a selector to the node to listen to e.g. '#myButton'
 */
export function listen(eventName: string, target: string | EventTarget) {
  return (prototype: any, methodName: string) => {
    const constructor = prototype.constructor;
    if (!constructor.hasOwnProperty('__listeners')) {
      Object.defineProperty(constructor, '__listeners', { value: [] });
    }
    const listeners: EventListenerDeclaration[] = constructor.__listeners;
    listeners.push({
      eventName, target, handler: prototype[methodName]
    });
  };
}

/**
 * Decortator to define an observer that gets called back 
 * whenever any of the specified property is updated
 * @param properties list of properties to observe
 */
export function observe(...properties: string[]) {
  return (prototype: any, methodName: string) => {
    const constructor = prototype.constructor;
    if (!constructor.hasOwnProperty('__observers')) {
      Object.defineProperty(constructor, '__observers', { value: {} });
    }
    const observers: { [name: string]: ObserveHandler[] } = constructor.__observers;
    for (const prop of properties) {
      if (!observers[prop]) {
        observers[prop] = [];
      }
      observers[prop].push(prototype[methodName]);
    }
  };
}