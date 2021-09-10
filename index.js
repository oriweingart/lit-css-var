import {isFunction, propNameToCssVarName} from "./helper";
import {createObserver, OBSERVER_OPTIONS} from "./observer";

/**
 * Define the Decorator
 * @param options
 * @returns {function(*): {kind: string, finisher(*): void, placement: string, descriptor: {}, key: symbol, initializer(): void}}
 */
export function cssVar(options = {}) {
    return element => {
        return {
            kind: 'field',
            // eslint-disable-next-line no-undef
            key: Symbol(),
            placement: 'own',
            descriptor: {},
            initializer() {
                if (isFunction(element.initializer)) {
                    this[element.key] = element.initializer.call(this);
                }
                // Using see option will turn on two-way binding from setting css var from code
                // and synced it to the element property.
                // it might cause performance issues.
                if (options.observeCss) {
                    const propName = element.key;
                    // Keep a ref to css vars on _cssVarsProperties array
                    this._cssVarsProperties = this._cssVarsProperties || [];
                    this._cssVarsProperties.push(propName);
                    // For better performance: don't define an observer
                    // on the element if one was already defined
                    if (!this._cssVarsObserver) {
                        this._cssVarsObserver = createObserver();
                        this._cssVarsObserver.observe(this, OBSERVER_OPTIONS);
                    }
                }
            },
            finisher(clazz) {
                clazz.createProperty(element.key, options);
                const key = `__${element.key}`;
                const propName = element.key;
                Object.defineProperty(clazz.prototype, propName, {
                    get() {
                        return this[key];
                    },
                    set(value) {
                        // Set the property
                        this[key] = value;
                        // Set the css var
                        this.style.setProperty(propNameToCssVarName(propName), value);
                        // Update element
                        this.requestUpdate();
                    },
                    configurable: true,
                    enumerable: true
                });
            },
        };
    };
}
