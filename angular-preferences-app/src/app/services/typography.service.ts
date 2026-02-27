import { Injectable, signal, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FontConfig, FontSizeConfig } from '../models/typography.model';

@Injectable({
  providedIn: 'root',
})
export class TypographyService {
  private document = inject(DOCUMENT);

  // --- Font Configuration ---
  private readonly availableFonts: FontConfig[] = [
    {
      id: 'roboto-opensans',
      displayName: 'Roboto / Open Sans',
      plainFamily: "'Roboto', sans-serif",
      brandFamily: "'Open Sans', sans-serif",
      cssClass: 'font-roboto-opensans',
    },
    {
      id: 'montserrat-lato',
      displayName: 'Montserrat / Lato',
      plainFamily: "'Lato', sans-serif",
      brandFamily: "'Montserrat', sans-serif",
      cssClass: 'font-montserrat-lato',
    },
    {
      id: 'source-serif-sans',
      displayName: 'Source Serif / Source Sans',
      plainFamily: "'Source Sans Pro', sans-serif",
      brandFamily: "'Source Serif Pro', serif",
      cssClass: 'font-source-serif-sans',
    },
    {
      id: 'inter',
      displayName: 'Inter',
      plainFamily: "'Inter', sans-serif",
      brandFamily: "'Inter', sans-serif",
      cssClass: 'font-inter',
    },
    {
      id: 'poppins-nunito',
      displayName: 'Poppins / Nunito Sans',
      plainFamily: "'Nunito Sans', sans-serif",
      brandFamily: "'Poppins', sans-serif",
      cssClass: 'font-poppins-nunito',
    },
    {
      id: 'roboto-slab-roboto',
      displayName: 'Roboto Slab / Roboto',
      plainFamily: "'Roboto', sans-serif",
      brandFamily: "'Roboto Slab', serif",
      cssClass: 'font-roboto-slab-roboto',
    },
    {
      id: 'merriweather-lato',
      displayName: 'Merriweather / Lato',
      plainFamily: "'Lato', sans-serif",
      brandFamily: "'Merriweather', serif",
      cssClass: 'font-merriweather-lato',
    },
    {
      id: 'dev-theme',
      displayName: 'Developer',
      plainFamily: "'Inter', sans-serif",
      brandFamily: "'Source Code Pro', monospace",
      cssClass: 'font-dev-theme',
    },
  ];
  public readonly defaultFont = this.availableFonts[0];

  // --- Font State ---
  private readonly _activeFont = signal<FontConfig>(this.defaultFont);
  public readonly activeFont = this._activeFont.asReadonly();

  // --- Font Size State ---
  private readonly availableFontSizes: FontSizeConfig[] = [
    { id: 'x-small', displayName: 'Tiny', pixelValue: 12 },
    { id: 'small', displayName: 'Small', pixelValue: 14 },
    { id: 'medium', displayName: 'Medium', pixelValue: 16 },
    { id: 'large', displayName: 'Large', pixelValue: 18 },
    { id: 'x-large', displayName: 'Giant', pixelValue: 20 },
  ];
  public readonly defaultFontSize = this.availableFontSizes[2];

  private readonly _activeFontSize = signal<FontSizeConfig>(
    this.defaultFontSize,
  );
  public readonly activeFontSize = this._activeFontSize.asReadonly();

  constructor() {
    effect(() => {
      const font = this._activeFont();

      this.document.body.style.setProperty(
        '--app-font-plain',
        font.plainFamily,
      );
      this.document.body.style.setProperty(
        '--app-font-brand',
        font.brandFamily,
      );
    });

    effect(() => {
      const size = this._activeFontSize();
      this.document.documentElement.style.setProperty(
        '--app-typography',
        `${size.pixelValue}px`,
      );
    });
  }

  // --- Methods ---
  public getFonts() {
    return this.availableFonts;
  }

  public setFont(fontId: string) {
    const newFont =
      this.availableFonts.find((f) => f.id === fontId) ?? this.defaultFont;
    this._activeFont.set(newFont);
  }

  public getFontSizes() {
    return this.availableFontSizes;
  }

  public setFontSize(sizeId: string) {
    const newSize =
      this.availableFontSizes.find((s) => s.id === sizeId) ??
      this.defaultFontSize;
    this._activeFontSize.set(newSize);
  }
}
