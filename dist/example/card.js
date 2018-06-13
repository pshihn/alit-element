var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AlitElement, html } from '../alit-element';
import { element, property, query, listen, observe } from '../alit-element-decorators';
let AlitCard = class AlitCard extends AlitElement {
    constructor() {
        super(...arguments);
        this.age = 30;
        this.description = 'This is the default description';
        this.borderShowing = false;
    }
    toggleBorder() {
        this.borderShowing = !this.borderShowing;
        this.card.style.border = this.borderShowing ? '2px solid' : 'none';
    }
    randomizeAge() {
        this.age = Math.round(Math.random() * 60 + 20);
        this.description = `This guy is aged ${this.age}`;
    }
    ageChanged(records) {
        for (const r of records) {
            console.log(`${r.path} changed from '${r.oldValue}' to '${r.value}'`);
        }
    }
    documentClick() {
        console.log('document clicked');
    }
    _render() {
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
__decorate([
    query('.card'),
    __metadata("design:type", HTMLDivElement)
], AlitCard.prototype, "card", void 0);
__decorate([
    listen('click', '#toggleButton'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AlitCard.prototype, "toggleBorder", null);
__decorate([
    listen('click', '#randomizeButton'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AlitCard.prototype, "randomizeAge", null);
__decorate([
    observe('age', 'description'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], AlitCard.prototype, "ageChanged", null);
__decorate([
    listen('click', document),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AlitCard.prototype, "documentClick", null);
AlitCard = __decorate([
    element('alit-card')
], AlitCard);
export { AlitCard };
