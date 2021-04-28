export class HelloWorld extends HTMLElement {
  connectedCallback() {
    const style = document.createElement('style');
    style.textContent = 'h1 { color: blue; }';
    document.head.appendChild(style);
    this.innerHTML = '<h1>Hello, World!</h1>';
  }
}

window.customElements.define('hello-world', HelloWorld);
