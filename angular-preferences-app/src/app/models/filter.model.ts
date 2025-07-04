export type DaltonicFilterType = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

export interface DaltonicFilter {
    id: DaltonicFilterType;
    displayName: string;
}