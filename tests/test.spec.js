const assert = require('assert');
const nightmare = require("./nightmare.actions");

const URL = 'http://localhost:8080/build';

const COLORS = {
   RED: 'rgb(255, 0, 0)',
   BLUE: 'rgb(0, 0, 255)',
};

// Specs
describe('tests examples', async () => {
   describe('example-1', async () => {
      it('should change button color and text on click', async function () {
         this.timeout(1000 * 10);
         await nightmare.goto(URL).wait('example-1');
         const colorBeforeClick = await nightmare.example1GetColor();
         const textBeforeClick = await nightmare.example1GetText();
         assert.equal(colorBeforeClick, COLORS.RED);
         assert.equal(textBeforeClick, 'text color is red');
         await nightmare.example1ClickButton();
         const colorAfterClick = await nightmare.example1GetColor();
         const textAfterClick = await nightmare.example1GetText();
         assert.equal(colorAfterClick, COLORS.BLUE);
         assert.equal(textAfterClick, 'text color is blue');
         await nightmare.example1ClickButton();
         const colorAfterSecondClick = await nightmare.example1GetColor();
         const textAfterSecondClick = await nightmare.example1GetText();
         assert.equal(colorAfterSecondClick, COLORS.RED);
         assert.equal(textAfterSecondClick, 'text color is red');
      });
   });

   describe('example-2', async () => {
      it('should change label text and font size on type', async function () {
         this.timeout(1000 * 10);
         await nightmare.goto(URL).wait('example-2');
         const textSizeBeforeChange = await nightmare.example2GetTextSize();
         const textBeforeChange = await nightmare.example2GetText();
         assert.equal(textSizeBeforeChange, '15px');
         assert.equal(textBeforeChange, 'font size is 15px');
         await nightmare.evaluate(() => {
            const input = document.querySelector('example-2').shadowRoot.querySelector('input');
            input.value = '20px';
            input.dispatchEvent(new Event('change', { bubbles: true })); // hack as set value as it doesnt trigger event
         });
         const textSizeAfterChange = await nightmare.example2GetTextSize();
         const textAfterChange = await nightmare.example2GetText();
         assert.equal(textSizeAfterChange, '20px');
         assert.equal(textAfterChange, 'font size is 20px');
      });
   });

   after(async () => {
      await nightmare.end();
   });
});
