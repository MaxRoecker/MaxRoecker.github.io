export class HelloWorld extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '<h1>Hello, World!</h1>';
  }
}

window.customElements.define('hello-world', HelloWorld);
