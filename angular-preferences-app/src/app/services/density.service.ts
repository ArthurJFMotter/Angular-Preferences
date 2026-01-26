import { Injectable, signal } from "@angular/core";
import { Density } from "../models/density.model";

@Injectable({
    providedIn: 'root',
})
export class DensityService {

    private readonly densities: Density[] = [
        { value: 0,  id: 'density-0', displayName: 'Comfortable (Default)' },
        { value: -2, id: 'density-2', displayName: 'Compact' }, 
        { value: -4, id: 'density-4', displayName: 'High Density' },
    ];

    currentDensity = signal<Density>(this.densities[0]);

    getDensities(): Density[] {
        return this.densities;
    }

    setDensity(value: number): void {
        const density = this.densities.find(d => d.value === value) ?? this.densities[0];
        this.currentDensity.set(density);
    }
}