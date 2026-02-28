import { Injectable, signal } from '@angular/core';
import { TooltipConfig, TooltipGlobalDefaults, TooltipType } from '../models/tooltip.model';

@Injectable({
  providedIn: 'root'
})
export class TooltipService {

  // Global Defaults
  private readonly defaults = signal<TooltipGlobalDefaults>({
    showDelay: 600,      
    hideDelay: 100,
    touchendHideDelay: 1500,
    position: 'above'
  });

  // User input merging
  public getConfig(input: string | TooltipConfig): TooltipConfig {
    const global = this.defaults();
    
    if (typeof input === 'string') {
      return {
        message: input,
        showDelay: global.showDelay,
        position: global.position,
        enableTTS: false
      };
    }

    return {
      ...input,
      showDelay: input.showDelay ?? (input.type === 'warning' ? 0 : global.showDelay),
      position: input.position ?? global.position,
      enableTTS: input.enableTTS ?? false
    };
  }

  // TTS (Browser Speech API)
  public speak(text: string): void {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0; 
    utterance.pitch = 1.0;
    utterance.volume = 0.3;
    
    window.speechSynthesis.speak(utterance);
  }
}