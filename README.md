# lit-css-var decorator


### @decorator to bind [litElement](https://lit-element.polymer-project.org/) property to a css variable 💅
    
```javascript

import {LitElement, html, css, customElement} from 'lit-element';
import {cssVar} from 'lit-css-var';

@customElement('my-component')
class MyComponent extends LitElement {

  @cssVar() buttonColor = 'red';

  static styles = [css`
    button {
      background-color: var(--buttonColor);
    }
  `];

  render () {
    return html`
      <button @click="${() => this.buttonColor = this.buttonColor === 'red' ? 'blue' : 'red'}">
        button color: ${this.buttonColor}
      </button>
    `;
  }
}

```
  
### [Demo](https://codesandbox.io/s/lit-css-var-example-forked-9nf59?file=/src/scripts/example_1.js)
  
### Installation
   
`npm i lit-css-var`
  
##### As this feature currently support only @decorator nutation, it most be used with a transpiler supporting decorators.  
For babel use [`@babel/plugin-proposal-decorators`](https://babeljs.io/docs/en/babel-plugin-proposal-decorators) in your `.babelrc` config file.

### Usage
```javascript
// component.js
import {cssVar} from 'lit-css-var';
...
@cssVar() <cssVarName> = <initialValue>
...
  css`
    <cssProperty>: var(--<cssVarName>);
  `]; 
```

### Options
Decorate can get options object with following properties:
- `observeCss` boolean. default `false`. When true css-var decorator will become 2-way databining and update the element property when the css var was changed.
 It's recommend to avoid this option as it can cause performance issues.
