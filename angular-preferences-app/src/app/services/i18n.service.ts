import { inject, Injectable, LOCALE_ID } from '@angular/core';
import { SupportedLocale } from '../models/i18n.model';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  /** The locale ID of the currently running application. */
  readonly currentLocale: string = inject(LOCALE_ID);

  /** List of all locales the application supports. */
  readonly supportedLocales: SupportedLocale[] = [
    // Use $localize so these names are also translated
    { id: 'en-US', displayName: $localize`:@@localeEnglish:English` },
    { id: 'es', displayName: $localize`:@@localeSpanish:Español` },
    { id: 'pt', displayName: $localize`:@@localePortuguese:Português (Brasil)` },
  ];

  constructor() {
    // This is a good place to validate if the currentLocale is in the supported list
    if (!this.supportedLocales.some(l => l.id === this.currentLocale)) {
      console.warn(`The current locale '${this.currentLocale}' is not in the list of supported locales.`);
    }
  }
}