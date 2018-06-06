import { AlitElement, html, TemplateResult, element, property } from '../alit-element';

@element('alit-card')
export class AlitCard extends AlitElement {
  @property() name?: string;
  @property() job?: string;
  @property() age: number = 30;
  @property() image?: string;
  @property() description: string = 'This is the default description';


  _render(): TemplateResult {
    console.log((this.constructor as any).properties);
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
        box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.3);
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
    </div>
    `;
  }
}