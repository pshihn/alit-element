import 'reflect-metadata';
import { AlitElement, EventListenerDeclaration } from './alit-element';

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

export function listen(eventName: string, selector: string) {
  return (prototype: any, methodName: string) => {
    const constructor = prototype.constructor;
    if (!constructor.hasOwnProperty('listeners')) {
      Object.defineProperty(constructor, 'listeners', { value: [] });
    }
    const listeners: EventListenerDeclaration[] = constructor.listeners;
    listeners.push({
      eventName, selector, handler: prototype[methodName]
    });
  };
}