export class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        h1 { color: red; }
      </style>
      <h1>Hello, World!</h1>
    `;
  }
}

window.customElements.define('hello-world', HelloWorld);
