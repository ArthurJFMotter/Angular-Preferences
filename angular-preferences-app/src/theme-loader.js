(function() {
  try {
    const storageKey = 'user-app-preferences';
    const prefsRaw = localStorage.getItem(storageKey);
    const docEl = document.documentElement;
    
    const addClass = (cls) => docEl.classList.add(cls);

    if (prefsRaw) {
      const prefs = JSON.parse(prefsRaw);

      // --- 1. Resolve Theme Mode (Light / Auto / Dark) ---
      let isDark = false;
      if (prefs.themeMode === 'dark') {
        isDark = true;
      } else if (prefs.themeMode === 'auto') {
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      } else if (prefs.isDarkMode) { 
        isDark = true; 
      }

      if (isDark) {
        addClass('dark-mode');
      }

      // --- 2. Resolve Contrast Mode (Standard / Auto / High) ---
      let isHighContrast = false;
      if (prefs.contrastMode === 'high') {
         isHighContrast = true;
      } else if (prefs.contrastMode === 'auto') {
         isHighContrast = window.matchMedia('(prefers-contrast: more)').matches;
      } else if (prefs.isHighContrastMode) {
         isHighContrast = true;
      }

      if (isHighContrast) {
        addClass('high-contrast-mode');
      }

      // --- 3. Resolve Other Preferences ---
      if (prefs.isReducedMotion) {
        addClass('reduced-motion');
      }
      
      if (prefs.themeId) {
        addClass(prefs.themeId + '-theme');
      }
      
      if (typeof prefs.densityValue === 'number') {
        addClass('density-' + prefs.densityValue);
      }
      
      if (prefs.activeColorFilter && prefs.activeColorFilter !== 'none') {
        addClass('filter-' + prefs.activeColorFilter);
      }
    }
  } catch (e) {
    console.error('Theme Loader Error:', e);
  }
})();