import { DaltonicFilterType } from "./filter.model";

export type ThemeMode = 'light' | 'dark' | 'auto';
export type ContrastMode = 'normal' | 'high' | 'auto';

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
  
  themeMode: ThemeMode;       
  contrastMode: ContrastMode; 

  showHelper?: boolean;
  showTooltips: boolean;
  
  isReducedMotion: boolean;
  activeColorFilter: DaltonicFilterType;
  
  fontId: string;
  fontSizeId: string;
  densityValue: number;
  borderRadiusId: string;
    
  notifications: NotificationPreferences;
}