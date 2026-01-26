import { DaltonicFilterType } from "./filter.model";

export interface UserPreferences {
    themeId: string;
    isDarkMode: boolean;
    isHighContrastMode: boolean;
    isReducedMotion: boolean;
    activeColorFilter: DaltonicFilterType;
    fontId: string;
    fontSizeId: string;
    densityValue: number;
    borderRadiusId: string;
}