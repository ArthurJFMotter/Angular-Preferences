import { Injectable, signal } from "@angular/core";
import { Shape } from "../models/shape.model";

@Injectable({
    providedIn: 'root',
})
export class ShapeService {

    private readonly shapes: Shape[] = [
        { id: 'sharp', displayName: 'Square (0px)', pixelValue: 0 },
        { id: 'xs',    displayName: 'Minimal (4px)', pixelValue: 4 },
        { id: 'sm',    displayName: 'Subtle (8px)', pixelValue: 8 },
        { id: 'md',    displayName: 'Modern (12px)', pixelValue: 12 }, // Standard
        { id: 'lg',    displayName: 'Soft (16px)', pixelValue: 16 },
        { id: 'xl',    displayName: 'Round (24px)', pixelValue: 24 },
        { id: 'full',  displayName: 'Pill (999px)', pixelValue: 999 },
    ];

    public readonly defaultShape = this.shapes.find(s => s.id === 'md')!;

    // --- STATE ---
    private readonly _activeShape = signal<Shape>(this.defaultShape);
    public readonly activeShape = this._activeShape.asReadonly();

    // --- GETTERS ---
    getShapes(): Shape[] {
        return this.shapes;
    }

    // --- ACTIONS ---
    setShape(id: string): void {
        const shape = this.shapes.find(s => s.id === id) ?? this.defaultShape;
        this._activeShape.set(shape);
    }
}