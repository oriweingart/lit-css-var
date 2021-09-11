import {LitElement, html, css, customElement} from 'lit-element';
import {cssVar} from 'lit-css-var';
import {propNameToCssVarName} from "../../helper";

@customElement('example-3')
class Example3 extends LitElement {

  @cssVar({observeCss: true}) color = 'red';

  static styles = [css`
    button {
      color: var(--color);
    }
  `];

  changeColorByProperty() {
    this.color = this.color === 'red' ? 'blue' : 'red';
  }

  changeColorByCssVar() {
    const propName = propNameToCssVarName('color');
    const currentValue = this.style.getPropertyValue(propName);
    const newValue = currentValue === 'red' ? 'blue' : 'red';
    this.style.setProperty(propName, newValue);
  }

  render () {
    return html`
      <label>text color is ${this.color}</label>
      <button @click="${this.changeColorByProperty}" id="js-prop-btn">
        set color from property
      </button>
      <button @click="${this.changeColorByCssVar}" id="css-var-btn">
        set color from css var
      </button>
    `;
  }

}
