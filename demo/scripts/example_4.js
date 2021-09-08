import {LitElement, html, css, customElement} from 'lit-element';
import {cssVar} from 'lit-css-var';

const DIRECTIONS = [
  {label:'Row', value: 'row'},
  {label:'Row Reverse', value: 'row-reverse'},
  {label:'Column', value: 'column'},
  {label:'Column Reverse', value: 'column-reverse'},
];

@customElement('example-4')
class Example4 extends LitElement {

  @cssVar() direction = 'column';

  static styles = [css`
    .list {
      max-width: 135px;
      display: flex;
      flex-direction: var(--direction);
    }
    .list > div {
      margin-right: 4px;
    }
  `];

  onChange({target: { value }}) {
    this.direction = value;
  }

  render () {
    return html`
      <p>Select Direction</p>
      ${DIRECTIONS.map(({label, value}) => html`
        <input 
        type="radio" 
        name="direction" 
        value="${value}" 
        ?checked="${this.direction === value}" 
        @change="${this.onChange}">
        <label>${label}</label>
      `)}
      <div class="list">
        <div>item 1</div>
        <div>item 2</div>
        <div>item 3</div>
      </div>
    `;
  }
}
