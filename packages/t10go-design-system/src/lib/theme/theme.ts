import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type AppTheme = 'system' | 'light' | 'dark';

const STORAGE_KEY = 't10go-theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly mediaQuery = isPlatformBrowser(this.platformId)
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;

  readonly theme = signal<AppTheme>('system');

  constructor() {
    this.initialize();
  }

  setTheme(theme: AppTheme): void {
    this.theme.set(theme);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEY, theme);
    }

    this.applyTheme();
  }

  private initialize(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedTheme = localStorage.getItem(STORAGE_KEY);

      if (
        storedTheme === 'system' ||
        storedTheme === 'light' ||
        storedTheme === 'dark'
      ) {
        this.theme.set(storedTheme);
      }

      this.mediaQuery?.addEventListener('change', () => {
        if (this.theme() === 'system') {
          this.applyTheme();
        }
      });
    }

    this.applyTheme();
  }

  private applyTheme(): void {
    const resolvedTheme = this.resolveTheme();

    this.document.documentElement.dataset['theme'] = resolvedTheme;

    this.document.documentElement.style.colorScheme = resolvedTheme;
  }

  private resolveTheme(): 'light' | 'dark' {
    const theme = this.theme();

    if (theme === 'light') {
      return 'light';
    }

    if (theme === 'dark') {
      return 'dark';
    }

    return this.mediaQuery?.matches ? 'dark' : 'light';
  }
}
