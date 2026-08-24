import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type AppTheme = 'system' | 'light' | 'dark';
export type AppPalette = 'indigo-teal' | 'evergreen-clay' | 'sage-gold';

export interface AppPaletteDefinition {
  readonly id: AppPalette;
  readonly label: string;
  readonly colors: readonly [string, string, string, string];
}

export const APP_PALETTES: readonly AppPaletteDefinition[] = [
  {
    id: 'indigo-teal',
    label: 'Indigo & Teal',
    colors: ['#4F46E5', '#14B8A6', '#F6F7FB', '#182033'],
  },
  {
    id: 'evergreen-clay',
    label: 'Evergreen & Clay',
    colors: ['#1D4533', '#F7EAE0', '#F9D2BA', '#5E3122'],
  },
  {
    id: 'sage-gold',
    label: 'Sage & Gold',
    colors: ['#8FA28A', '#C7D3C0', '#F7F4ED', '#C8A96B'],
  },
];

const STORAGE_KEY = 't10go-theme';
const PALETTE_STORAGE_KEY = 't10go-palette';

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
  readonly palette = signal<AppPalette>('indigo-teal');

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

  setPalette(palette: AppPalette): void {
    this.palette.set(palette);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(PALETTE_STORAGE_KEY, palette);
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

      const storedPalette = localStorage.getItem(PALETTE_STORAGE_KEY);

      if (APP_PALETTES.some((palette) => palette.id === storedPalette)) {
        this.palette.set(storedPalette as AppPalette);
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
    this.document.documentElement.dataset['palette'] = this.palette();

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
