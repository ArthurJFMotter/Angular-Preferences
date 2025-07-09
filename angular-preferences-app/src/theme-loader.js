// Load and aplly on the fly classes
(function() {
  try {
    const storageKey = 'user-app-preferences';
    const prefsRaw = localStorage.getItem(storageKey);
    if (prefsRaw) {
      const prefs = JSON.parse(prefsRaw);
      const docEl = document.documentElement;
      
      if (prefs.isDarkMode) {
        docEl.classList.add('dark-mode');
      }
      if (prefs.isHighContrastMode) {
        docEl.classList.add('high-contrast-mode');
      }
      if (prefs.isReducedMotion) {
        docEl.classList.add('reduced-motion');
      }
      if (prefs.themeId) {
        docEl.classList.add(`${prefs.themeId}-theme`);
      }
      if (typeof prefs.densityValue === 'number') {
        docEl.classList.add(`density-${prefs.densityValue}`);
      }
      if (prefs.activeColorFilter && prefs.activeColorFilter !== 'none') {
        docEl.classList.add(`filter-${prefs.activeColorFilter}`);
      }
    }
  } catch (e) {
    console.error('Error applying initial theme from theme-loader.js', e);
  }
})();