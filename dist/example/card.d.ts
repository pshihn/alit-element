import { AlitElement, TemplateResult } from '../alit-element';
export declare class AlitCard extends AlitElement {
    name?: string;
    job?: string;
    age: number;
    image?: string;
    description: string;
    card?: HTMLDivElement;
    toggleBorder(): void;
    private borderShowing;
    _render(): TemplateResult;
}
