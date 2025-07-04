import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypographyService {

  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  // --- Configuration ---
  public readonly defaultFontSize = 16; 
  public readonly minFontSize = 12;     
  public readonly maxFontSize = 24;     

  // --- State Management with Signals ---
  private readonly _fontSize = signal<number>(this.defaultFontSize);
  public readonly fontSize = this._fontSize.asReadonly();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.setBaseFontSize(this.defaultFontSize);
    }
  }

  public setBaseFontSize(sizeInPx: number): void {
    const newSize = Math.max(this.minFontSize, Math.min(sizeInPx, this.maxFontSize));

    this._fontSize.set(newSize);

    if (isPlatformBrowser(this.platformId)) {
      this.document.documentElement.style.setProperty('--app-typography', `${newSize}px`);
    }
  }
}