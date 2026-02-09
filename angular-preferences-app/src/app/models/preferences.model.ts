import { DaltonicFilterType } from "./filter.model";

export type NotificationPlacement = 
  | 'top-left' | 'top-center' | 'top-right' 
  | 'bottom-left' | 'bottom-center' | 'bottom-right';


export interface NotificationPreferences {
  useLegacy: boolean;
  forceHighContrast: boolean;
  placement: NotificationPlacement;
}

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
    
  notifications: NotificationPreferences;
}