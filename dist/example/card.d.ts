import { AlitElement, TemplateResult, ChangeRecord } from '../alit-element';
export declare class AlitCard extends AlitElement {
    name?: string;
    job?: string;
    age: number;
    image?: string;
    description: string;
    card?: HTMLDivElement;
    toggleBorder(): void;
    randomizeAge(): void;
    ageChanged(records: ChangeRecord[]): void;
    documentClick(): void;
    private borderShowing;
    _render(): TemplateResult;
}
