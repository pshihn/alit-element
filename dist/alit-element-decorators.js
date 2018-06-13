import 'reflect-metadata';
/**
 * Decorator for defining a new custom element
 * @param name tag name of custom element
 */
export function element(name) {
    return (c) => {
        if (name) {
            window.customElements.define(name, c);
        }
    };
}
/**
 * Decorator to declate a property
 */
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
/**
 * Decorator to create a getter for the specified selector
 * @param selector selector to find the element
 */
export function query(selector) {
    return (prototype, propertyName) => {
        Object.defineProperty(prototype, propertyName, {
            get() {
                return this.$$(selector);
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
export function queryAll(selector) {
    return (prototype, propertyName) => {
        Object.defineProperty(prototype, propertyName, {
            get() {
                return this.$$All(selector);
            },
            enumerable: true,
            configurable: true
        });
    };
}
export function listen(eventName, selector) {
    return (prototype, methodName) => {
        const constructor = prototype.constructor;
        if (!constructor.hasOwnProperty('listeners')) {
            Object.defineProperty(constructor, 'listeners', { value: [] });
        }
        const listeners = constructor.listeners;
        listeners.push({
            eventName, selector, handler: prototype[methodName]
        });
    };
}