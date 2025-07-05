import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { FontConfig, FontSizeConfig } from '../models/typography.model';

@Injectable({
  providedIn: 'root'
})
export class TypographyService {

  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  // --- Font Configuration ---
  private readonly availableFonts: FontConfig[] = [
    { id: 'roboto-opensans', displayName: 'Roboto / Open Sans', plainFamily: 'Roboto', brandFamily: 'Open Sans', cssClass: 'font-roboto-opensans' },
    { id: 'montserrat-lato', displayName: 'Montserrat / Lato', plainFamily: 'Montserrat', brandFamily: 'Lato', cssClass: 'font-montserrat-lato' },
    { id: 'source-serif-sans', displayName: 'Source Serif / Source Sans', plainFamily: 'Source Serif Pro', brandFamily: 'Source Sans Pro', cssClass: 'font-source-serif-sans' }
  ];
  public readonly defaultFont = this.availableFonts[0]; // Roboto / Open Sans

  // --- Font State Management ---
  private readonly _activeFont = signal<FontConfig>(this.defaultFont);
  public readonly activeFont = this._activeFont.asReadonly();

  // --- Font Size Configuration ---
  private readonly availableFontSizes: FontSizeConfig[] = [
    { id: 'x-small', displayName: 'Minúscula', pixelValue: 12 },
    { id: 'small',   displayName: 'Pequena',   pixelValue: 14 },
    { id: 'medium',  displayName: 'Média',  pixelValue: 16 },
    { id: 'large',   displayName: 'Grande',   pixelValue: 18 },
    { id: 'x-large', displayName: 'Gigante', pixelValue: 20 },
  ];
  public readonly defaultFontSize = this.availableFontSizes[2]; // Medium (16px)

  // --- Font Size State Management with Signals ---
  private readonly _activeFontSize = signal<FontSizeConfig>(this.defaultFontSize);
  public readonly activeFontSize = this._activeFontSize.asReadonly();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Set initial font size
      this.setFontSize(this.defaultFontSize.id);
      // Set initial font family
      this.setFont(this.defaultFont.id);
    }
  }

  // --- Font Size Methods ---
  public getFontSizes(): FontSizeConfig[] {
    return this.availableFontSizes;
  }

  public setFontSize(sizeId: string): void {
    const newSize = this.availableFontSizes.find(s => s.id === sizeId);
    if (!newSize) {
      console.warn(`Font size with id "${sizeId}" not found. Reverting to default.`);
      this.setFontSize(this.defaultFontSize.id);
      return;
    }

    this._activeFontSize.set(newSize);

    if (isPlatformBrowser(this.platformId)) {
      this.document.documentElement.style.setProperty('--app-typography', `${newSize.pixelValue}px`);
    }
  }

  // --- Font Family Methods ---
  public getFonts(): FontConfig[] {
    return this.availableFonts;
  }

  public setFont(fontId: string): void {
    const newFont = this.availableFonts.find(f => f.id === fontId);
    if (!newFont) {
      console.warn(`Font with id "${fontId}" not found. Reverting to default.`);
      this.setFont(this.defaultFont.id);
      return;
    }

    if (isPlatformBrowser(this.platformId)) {
      // Remove all potential font classes to ensure a clean slate
      this.availableFonts.forEach(font => {
        this.document.documentElement.classList.remove(font.cssClass);
      });
      // Add the new class to the <html> element
      this.document.documentElement.classList.add(newFont.cssClass);
    }

    this._activeFont.set(newFont);
  }
}