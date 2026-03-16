import { TooltipPosition } from '@angular/material/tooltip';

export type TooltipType = 'explanation' | 'action' | 'warning';

export interface TooltipConfig {
  message: string;          
  type?: TooltipType;       
  position?: TooltipPosition;
  showDelay?: number;       
  enableTTS?: boolean;      
  isDisabled?: boolean;     
}

// Global default 
export interface TooltipGlobalDefaults {
  showDelay: number;
  hideDelay: number;
  touchendHideDelay: number;
  position: TooltipPosition;
}