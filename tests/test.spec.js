const assert = require('assert');
const nightmare = require("./nightmare.actions");

const URL = 'http://127.0.0.1:8080/';

const COLORS = {
   RED: 'rgb(255, 0, 0)',
   BLUE: 'rgb(0, 0, 255)',
};

const TEST_TIMEOUT = 1000 * 10;

// Specs
describe('tests examples', async () => {
   describe('example-1', async () => {
      it('should change button color and text on click', async function () {
         this.timeout(TEST_TIMEOUT);
         await nightmare.goto(URL).setTest('example-1');
         const colorBeforeClick = await nightmare.getColor();
         const textBeforeClick = await nightmare.getText();
         assert.equal(colorBeforeClick, COLORS.RED);
         assert.equal(textBeforeClick, 'text color is red');
         await nightmare.clickButton();
         const colorAfterClick = await nightmare.getColor();
         const textAfterClick = await nightmare.getText();
         assert.equal(colorAfterClick, COLORS.BLUE);
         assert.equal(textAfterClick, 'text color is blue');
         await nightmare.clickButton();
         const colorAfterSecondClick = await nightmare.getColor();
         const textAfterSecondClick = await nightmare.getText();
         assert.equal(colorAfterSecondClick, COLORS.RED);
         assert.equal(textAfterSecondClick, 'text color is red');
      });
   });

   describe('example-2', async () => {
      it('should change label text and font size on type', async function () {
         this.timeout(TEST_TIMEOUT);
         await nightmare.goto(URL).setTest('example-2');
         const textSizeBeforeChange = await nightmare.getTextSize();
         const textBeforeChange = await nightmare.getLabel();
         assert.equal(textSizeBeforeChange, '15px');
         assert.equal(textBeforeChange, 'font size is 15px');
         await nightmare.evaluate(() => {
            const input = document.querySelector('example-2').shadowRoot.querySelector('input');
            input.value = '20px';
            input.dispatchEvent(new Event('change', { bubbles: true })); // hack as set value as it doesnt trigger event
         });
         const textSizeAfterChange = await nightmare.getTextSize();
         const textAfterChange = await nightmare.getLabel();
         assert.equal(textSizeAfterChange, '20px');
         assert.equal(textAfterChange, 'font size is 20px');
      });
   });

   describe('example-3', async () => {
      it('should change button color and text on click from css var and js prop', async function () {
         this.timeout(TEST_TIMEOUT);
         await nightmare.goto(URL).setTest('example-3');
         const colorsBeforeClick = await nightmare.getColors();
         assert.equal(colorsBeforeClick.jsPropBtnColor, COLORS.RED);
         assert.equal(colorsBeforeClick.cssVarBtnColor, COLORS.RED);
         const textBeforeClick = await nightmare.getLabel();
         assert.equal(textBeforeClick, 'text color is red');
         await nightmare.clickButtonById('js-prop-btn');
         let colorsAfterClick = await nightmare.getColors();
         assert.equal(colorsAfterClick.jsPropBtnColor, COLORS.BLUE);
         assert.equal(colorsAfterClick.cssVarBtnColor, COLORS.BLUE);
         await nightmare.clickButtonById('js-prop-btn');
         colorsAfterClick = await nightmare.getColors();
         assert.equal(colorsAfterClick.jsPropBtnColor, COLORS.RED);
         assert.equal(colorsAfterClick.cssVarBtnColor, COLORS.RED);
         await nightmare.clickButtonById('css-var-btn');
         colorsAfterClick = await nightmare.getColors();
         assert.equal(colorsAfterClick.jsPropBtnColor, COLORS.BLUE);
         assert.equal(colorsAfterClick.cssVarBtnColor, COLORS.BLUE);
         await nightmare.clickButtonById('css-var-btn');
         colorsAfterClick = await nightmare.getColors();
         assert.equal(colorsAfterClick.jsPropBtnColor, COLORS.RED);
         assert.equal(colorsAfterClick.cssVarBtnColor, COLORS.RED);
      });
   });

   after(async () => {
      await nightmare.end();
   });
});
