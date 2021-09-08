const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false });
// Nightmare reusable actions
Nightmare.action('example1GetColor', function(done) {
    this.evaluate_now(() => window.getComputedStyle(document.querySelector('example-1').shadowRoot.querySelector('button')).color, done);
});
Nightmare.action('example1GetText', function(done) {
    this.evaluate_now(() => document.querySelector('example-1').shadowRoot.querySelector('button').innerText, done);
});
Nightmare.action('example1ClickButton', function(done) {
    this.evaluate_now(() => document.querySelector('example-1').shadowRoot.querySelector('button').click(), done);
});
Nightmare.action('example2GetTextSize', function(done) {
    this.evaluate_now(() => window.getComputedStyle(document.querySelector('example-2').shadowRoot.querySelector('label'))['font-size'], done);
});
Nightmare.action('example2GetText', function(done) {
    this.evaluate_now(() => document.querySelector('example-2').shadowRoot.querySelector('label').innerText, done);
});

module.exports = nightmare;
