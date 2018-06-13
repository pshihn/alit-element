# AlitElement
A simple base class that extends [lit-element](https://github.com/Polymer/lit-element) with some utility functions.

It also defines decorators, similar to [polymer-decorators](https://github.com/Polymer/polymer-decorators#observetargets-string), which makes development of web components in typescript super easy. 

## Sample Code

Here's some sample code that showcases decorators. ([full code](https://github.com/pshihn/alit-element/blob/master/src/example/card.ts))

```javascript
@element('alit-card')
export class AlitCard extends AlitElement {
  @property() name?: string;
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
  
  @observe('age', 'description')
  ageChanged(records: ChangeRecord[]) {
    for (const r of records) {
      console.log(`${r.path} changed from '${r.oldValue}' to '${r.value}'`);
    }
  }
  
  _render(): TemplateResult {
    return html`
    ...
    ...
    <div class="card">
      ...
    </div>
    ...
    `;
  }
```

## Methods

#### $(id: string): HTMLElement
Get element with specified ID in the element's shadow root.
```javascript
const button = this.$('toggleButton');
```

#### $$(selector: string): HTMLElement
Find first element macthing the slector in the element's shadow root.
```javascript
const card = this.$$('.card');
```

#### $$All(selector: string): NodeList 
Find all elements matching the selector in the element's shadow root.
```javascript
const allCards = this.$$All('.card');
```

#### fireEvent(name: string, detail?: any, bubbles: boolean = true, composed: boolean = true)
Utility method to fire custom events
```javascript
this.fireEvent('selected');
this.fireEvent('selected', {selection: this.currentSelection});
```

## Decorators

#### @element(tagname?: string)
Defines a custom element with the associated class
```javascript
@element('hello-world')
export class HelloWorld extends AlitElement {
  _render() {
    return html`
    <div>Hello World</div>
    `;
  }
}
```

#### @property()
Declared a property to be used by LitElement.
The type is infered using reflected metadata.
```javascript
@element('hello-world')
export class HelloWorld extends AlitElement {
  @property() name?: string;
  @property() job?: string;
  @property() age: number = 30;
}
```

#### @query(selector: string)
Replace this property with a getter that returns the element matching the specified selector.
```javascript
@query('.card')
card?: HTMLDivElement;
```

#### @queryAll(selector: string) 
Replace this property with a getter that returns the NodeList of all elements matching the specified selector.
```javascript
@queryAll('my-widget')
widgets: NodeListOf<MyWidgetElement>;
```

#### @listen(eventName: string, target: string | EventTarget)
Add an event listener for `eventName` on `target`. 
`target` can be an object reference, or the selector string to find the element in the shadow root.
```javascript
@listen('click', '#toggleButton')
toggleBorder() {
  this.borderShowing = !this.borderShowing;
}
```
```javascript
@listen('click', document)
documentClick() {
  console.log('document clicked');
}
```

#### observe(...properties: string[])
Add observers to the specified set of properties. This does not support children of properties or wildcards.
```javascript
@observe('age', 'description')
ageChanged(records: ChangeRecord[]) {
  // do stuff when age or description changes
}
```

A `ChangeRecord` is defined as follows: 
```javascript
interface ChangeRecord {
  path: string; // property name 
  value: any;
  oldValue: any;
}
```
