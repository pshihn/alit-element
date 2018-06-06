import { AlitElement, TemplateResult } from '../alit-element';
export declare class AlitCard extends AlitElement {
    name?: string;
    job?: string;
    age: number;
    image?: string;
    description: string;
    _render(): TemplateResult;
}
