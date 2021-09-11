/**
 * Convert element prop name to css variable notation
 * @param propName
 * @returns {string}
 */
export const propNameToCssVarName = (propName = '') => `--${propName}`;

/**
 * Return true if element is a funciton
 * @param elem
 * @returns {boolean}
 */
export const isFunction = elem => typeof elem === 'function';

/**
 * Return true if mutation object is style change mutation
 * @param attributeName
 * @returns {boolean}
 */
export const isStyleMutation = ({attributeName}) => attributeName === 'style';
