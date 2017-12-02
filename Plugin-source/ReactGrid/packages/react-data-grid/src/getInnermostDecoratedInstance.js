/**
 * Returns innermost React component instance decorated with React DnD
 *
 * @param {Object} instance decorated instance
 * @return {Object} innermost instance that is not a decorator itself
 */

function getInnermostDecoratedInstance(instance) {
  return instance && instance.getDecoratedComponentInstance ?
    getInnermostDecoratedInstance(instance.getDecoratedComponentInstance()) : instance;
}

module.exports = getInnermostDecoratedInstance;
