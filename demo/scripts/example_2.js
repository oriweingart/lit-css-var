import {LitElement, html, css, customElement} from 'lit-element';
import {cssVar} from 'lit-css-var';

@customElement('example-2')
class Example2 extends LitElement {

  @cssVar() fontSize = '15px';

  static styles = [css`
    :host {
      font-size: var(--fontSize);
    }
  `];

  onChange({ target: { value }}) {
    this.fontSize = `${Number.parseInt(value) || 15}px`;
  }

  render () {
    return html`
      <label>font size is ${this.fontSize}</label>  
      <input .value="${this.fontSize}" @change="${this.onChange}" />
    `;
  }
}
