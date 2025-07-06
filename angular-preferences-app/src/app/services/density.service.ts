import { Injectable, signal } from "@angular/core";
import { Density } from "../models/density.model";

@Injectable({
    providedIn: 'root',
})
export class DensityService {

    private readonly densities: Density[] = [
        { value: 0,  id: 'density-0', displayName: 'Default' },
        { value: -1, id: 'density-1', displayName: 'Compact (-1)' },
        { value: -2, id: 'density-2', displayName: 'Compact (-2)' },
        { value: -3, id: 'density-3', displayName: 'Compact (-3)' },
        { value: -4, id: 'density-4', displayName: 'Compact (-4)' },
        { value: -5, id: 'density-5', displayName: 'Max (-5)' },
    ];

    // --- STATE ---
    currentDensity = signal<Density>(this.densities[0]);

    // --- GETTERS ---
    getDensities(): Density[] {
        return this.densities;
    }

    // --- ACTIONS ---
    setDensity(value: number): void {
        const density = this.densities.find(d => d.value === value);
        if (density) {
            this.currentDensity.set(density);
        }
    }

}