import { DaltonicFilterType } from "./filter.model";

export interface UserPreferences {
    themeId: string;
    isDarkMode: boolean;
    isHighContrastMode: boolean;
    activeColorFilter: DaltonicFilterType;
    fontId: string;
    fontSizeId: string;
    densityValue: number;
}