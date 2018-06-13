import { AlitElement, html, TemplateResult } from '../alit-element';
import { element, property, query, listen } from '../alit-element-decorators';

@element('alit-card')
export class AlitCard extends AlitElement {
  @property() name?: string;
  @property() job?: string;
  @property() age: number = 30;
  @property() image?: string;
  @property() description: string = 'This is the default description';

  @query('.card')
  card?: HTMLDivElement;

  @listen('click', '#button')
  toggleBorder() {
    this.borderShowing = !this.borderShowing;
    this.card!.style.border = this.borderShowing ? '2px solid' : 'none';
  }

  private borderShowing = false;

  _render(): TemplateResult {
    return html`
    <style>
      :host {
        display: block;
        margin: 10px;
        font-family: sans-serif;
      }
    
      .card {
        padding: 20px;
        display: inline-block;
      }
    
      .name {
        font-weight: bold;
      }
    
      .job {
        color: #808080;
      }
    
      img {
        display: block;
        margin: 5px;
        max-width: 90px;
        max-height: 90px;
      }
    </style>
    <div class="card">
      <img id="img" src="${this.image}" on-click="${() => this.fireEvent('image-click')}">
      <div class="name">${this.name} (${this.age})</div>
      <div class="job">${this.job}</div>
      <p>${this.description}</p>
      <p>
        <button id="button">Toggle border</button>
      </p>
    </div>
    `;
  }
}