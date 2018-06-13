import { AlitElement, html, TemplateResult, ChangeRecord } from '../alit-element';
import { element, property, query, listen, observe } from '../alit-element-decorators';

@element('alit-card')
export class AlitCard extends AlitElement {
  @property() name?: string;
  @property() job?: string;
  @property() age: number = 30;
  @property() image?: string;
  @property() description: string = 'This is the default description';

  @query('.card')
  card?: HTMLDivElement;

  @listen('click', '#toggleButton')
  toggleBorder() {
    this.borderShowing = !this.borderShowing;
    this.card!.style.border = this.borderShowing ? '2px solid' : 'none';
  }

  @listen('click', '#randomizeButton')
  randomizeAge() {
    this.age = Math.round(Math.random() * 60 + 20);
    this.description = `This guy is aged ${this.age}`;
  }

  @observe('age', 'description')
  ageChanged(records: ChangeRecord[]) {
    for (const r of records) {
      console.log(`${r.path} changed from '${r.oldValue}' to '${r.value}'`);
    }
  }

  @listen('click', document)
  documentClick() {
    console.log('document clicked');
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
        <button id="toggleButton">Toggle border</button>
        <button id="randomizeButton">Randomize age</button>
      </p>
    </div>
    `;
  }
}