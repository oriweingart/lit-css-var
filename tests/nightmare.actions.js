const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
// Nightmare reusable actions
Nightmare.action('setTest', function(testName, done) {
    this.evaluate_now((testName) => (window._currentTest = testName), done, testName);
    this.wait(testName);
});
Nightmare.action('getColor', function(done) {
    this.evaluate_now(() => window.getComputedStyle(document.querySelector(`${window._currentTest}`).shadowRoot.querySelector('button')).color, done);
});
Nightmare.action('getText', function(done) {
    this.evaluate_now(() => document.querySelector(`${window._currentTest}`).shadowRoot.querySelector('button').innerText, done);
});
Nightmare.action('getLabel', function(done) {
    this.evaluate_now(() => document.querySelector(`${window._currentTest}`).shadowRoot.querySelector('label').innerText, done);
});
Nightmare.action('clickButton', function(done) {
    this.evaluate_now(() => document.querySelector(`${window._currentTest}`).shadowRoot.querySelector('button').click(), done);
});
Nightmare.action('getTextSize', function(done) {
    this.evaluate_now(() => window.getComputedStyle(document.querySelector(`${window._currentTest}`).shadowRoot.querySelector('label'))['font-size'], done);
});
Nightmare.action('clickButtonById', function(id, done) {
    this.evaluate_now((id) => document.querySelector(`${window._currentTest}`).shadowRoot.getElementById(id).click(), done, id);
});
Nightmare.action('getColors', function(done) {
    this.evaluate_now(() => {
        const jsPropBtnColor = window.getComputedStyle(document.querySelector(`${window._currentTest}`).shadowRoot.getElementById('js-prop-btn')).color;
        const cssVarBtnColor = window.getComputedStyle(document.querySelector(`${window._currentTest}`).shadowRoot.getElementById('css-var-btn')).color;
        return {
            jsPropBtnColor,
            cssVarBtnColor
        };
    }, done);
});

module.exports = nightmare;
