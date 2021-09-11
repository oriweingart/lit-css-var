import {isStyleMutation, propNameToCssVarName} from "./helper";

/**
 * Observer option to watch style changes on current node
 * @type {{subtree: boolean, attributes: boolean, childList: boolean, attributeFilter: [string]}}
 */
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
    mutations
        .filter(isStyleMutation)
        .forEach(({target}) => {
            target._cssVarsProperties.forEach((cssVarNameInList) => {
                // Update the element property (for 2-way binding)
                const cssValue = target.style.getPropertyValue(propNameToCssVarName(cssVarNameInList));
                const propValue = target[cssVarNameInList];
                if (cssValue !== propValue) {
                    target[cssVarNameInList] = cssValue; // TODO: remove left whitespaces?
                }
            });
        });
});
