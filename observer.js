import {propNameToCssVarName} from "./helper";

export const OBSERVER_OPTIONS = {
    attributeFilter: ["style"],
    attributes: true,
    subtree: false,
    childList: false
};

/**
 * Observer style changes to keep css var and property synced
 * @returns {MutationObserver}
 */
export const createObserver = () => new MutationObserver(mutations => {
    mutations.forEach(({attributeName, target}) => {
        if (attributeName === 'style') {
            target._cssVarsProperties.forEach((cssVarNameInList) => {
                // In case of style change -> update the js property (for 2-way binding)
                const cssValue = target.style.getPropertyValue(propNameToCssVarName(cssVarNameInList));
                const propValue = target[cssVarNameInList];
                if (cssValue !== propValue) {
                    target[cssVarNameInList] = cssValue; // TODO: remove left whitespaces?
                }
            });
        }
    });
});
