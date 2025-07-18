import { Injectable, signal } from '@angular/core';
import { FontConfig, FontSizeConfig } from '../models/typography.model';

@Injectable({
  providedIn: 'root'
})
export class TypographyService {

  // --- Font Configuration ---
  private readonly availableFonts: FontConfig[] = [
    { id: 'roboto-opensans', displayName: $localize`:@@fontRobotoOpenSans:Roboto / Open Sans`, plainFamily: 'Roboto', brandFamily: 'Open Sans', cssClass: 'font-roboto-opensans' },
    { id: 'montserrat-lato', displayName: $localize`:@@fontMontserratLato:Montserrat / Lato`, plainFamily: 'Lato', brandFamily: 'Montserrat', cssClass: 'font-montserrat-lato' },
    { id: 'source-serif-sans', displayName: $localize`:@@fontSourceSerifSans:Source Serif / Source Sans`, plainFamily: 'Source Serif Pro', brandFamily: 'Source Sans Pro', cssClass: 'font-source-serif-sans' },
    { id: 'inter', displayName: $localize`:@@fontInter:Inter`, plainFamily: 'Inter', brandFamily: 'Inter', cssClass: 'font-inter' },
    { id: 'poppins-nunito', displayName: $localize`:@@fontPoppinsNunito:Poppins / Nunito Sans`, plainFamily: 'Nunito Sans', brandFamily: 'Poppins', cssClass: 'font-poppins-nunito' },
    { id: 'roboto-slab-roboto', displayName: $localize`:@@fontRobotoSlabRoboto:Roboto Slab / Roboto`, plainFamily: 'Roboto', brandFamily: 'Roboto Slab', cssClass: 'font-roboto-slab-roboto' },
    { id: 'merriweather-lato', displayName: $localize`:@@fontMerriweatherLato:Merriweather / Lato`, plainFamily: 'Lato', brandFamily: 'Merriweather', cssClass: 'font-merriweather-lato' },
    { id: 'dev-theme', displayName: $localize`:@@fontDevTheme:Developer (Source Code Pro / Inter)`, plainFamily: 'Inter', brandFamily: 'Source Code Pro', cssClass: 'font-dev-theme' }
  ];
  public readonly defaultFont = this.availableFonts[0];

  // --- Font State Management ---
  private readonly _activeFont = signal<FontConfig>(this.defaultFont);
  public readonly activeFont = this._activeFont.asReadonly();

  // --- Font Size Configuration ---
  private readonly availableFontSizes: FontSizeConfig[] = [
    { id: 'x-small', displayName: $localize`:@@fontSizeTiny:Tiny`, pixelValue: 12 },
    { id: 'small', displayName: $localize`:@@fontSizeSmall:Small`, pixelValue: 14 },
    { id: 'medium', displayName: $localize`:@@fontSizeMedium:Medium`, pixelValue: 16 },
    { id: 'large', displayName: $localize`:@@fontSizeLarge:Large`, pixelValue: 18 },
    { id: 'x-large', displayName: $localize`:@@fontSizeGiant:Giant`, pixelValue: 20 },
  ];
  public readonly defaultFontSize = this.availableFontSizes[2];

  // --- Font Size State Management ---
  private readonly _activeFontSize = signal<FontSizeConfig>(this.defaultFontSize);
  public readonly activeFontSize = this._activeFontSize.asReadonly();

  // --- Font Size Methods ---
  public getFontSizes(): FontSizeConfig[] {
    return this.availableFontSizes;
  }

  public setFontSize(sizeId: string): void {
    const newSize = this.availableFontSizes.find(s => s.id === sizeId) ?? this.defaultFontSize;
    this._activeFontSize.set(newSize);
  }

  // --- Font Family Methods ---
  public getFonts(): FontConfig[] {
    return this.availableFonts;
  }

  public setFont(fontId: string): void {
    const newFont = this.availableFonts.find(f => f.id === fontId) ?? this.defaultFont;
    this._activeFont.set(newFont);
  }
}