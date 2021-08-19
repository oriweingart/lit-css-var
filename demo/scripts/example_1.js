import {LitElement, html, css, customElement} from 'lit-element';
import {cssVar} from 'lit-css-var';

@customElement('example-1')
class Example1 extends LitElement {

  @cssVar() color = 'red';

  static styles = [css`
    button {
      color: var(--color);
    }
  `];

  render () {
    return html`
      <button @click="${() => this.color = this.color === 'red' ? 'blue' : 'red'}">
        text color is ${this.color}
      </button>
    `;
  }

}
