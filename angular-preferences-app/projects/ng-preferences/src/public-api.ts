/* Public API Surface of ng-preferences */
// --- SERVICES ---
export * from './lib/services/density.service';
export * from './lib/services/modal.service';
export * from './lib/services/preferences.service';
export * from './lib/services/router.service';
export * from './lib/services/shape.service';
export * from './lib/services/snackbar.service';
export * from './lib/services/theme.service';
export * from './lib/services/tooltip.service';
export * from './lib/services/typography.service';

// --- DIRECTIVES ---
export * from './lib/directives/smart-tooltip.directive';

// --- MODELS ---
export * from './lib/models/density.model';
export * from './lib/models/filter.model';
export * from './lib/models/modal.model';
export * from './lib/models/preferences.model';
export * from './lib/models/shape.model';
export * from './lib/models/snackbar.model';
export * from './lib/models/theme.model';
export * from './lib/models/tooltip.model';
export * from './lib/models/typography.model';

// --- PROVIDERS ---
export * from './lib/providers/modal.provider';
export * from './lib/providers/snackbar.provider';

// --- STYLES ---
// These exports are for documentation purposes
// Import styles using: @import '~ng-preferences/styles';
// Import themes using: @import '~ng-preferences/themes';