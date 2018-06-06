var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AlitElement, html, element, property } from '../alit-element';
let AlitCard = class AlitCard extends AlitElement {
    constructor() {
        super(...arguments);
        this.age = 30;
        this.description = 'This is the default description';
    }
    _render() {
        console.log(this.constructor.properties);
        return html `
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
};
__decorate([
    property(),
    __metadata("design:type", String)
], AlitCard.prototype, "name", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], AlitCard.prototype, "job", void 0);
__decorate([
    property(),
    __metadata("design:type", Number)
], AlitCard.prototype, "age", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], AlitCard.prototype, "image", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], AlitCard.prototype, "description", void 0);
AlitCard = __decorate([
    element('alit-card')
], AlitCard);
export { AlitCard };
// export function as<T extends GuildElement>(node: HTMLElement): T {
//   return (node as any) as T;
// }
