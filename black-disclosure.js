// * Accordeon works using css

// BlackDisclosure Custom Element
class BlackDisclosure extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'closed' });
  }
}

customElements.define('black-disclosure', BlackDisclosure);
// BlackDisclosure Custom Element
