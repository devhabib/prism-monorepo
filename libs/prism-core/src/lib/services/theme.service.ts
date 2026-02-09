import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'prism-theme';
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly isBrowser: boolean;
  
  readonly currentTheme = signal<'light' | 'dark'>('light');

  constructor() {
    this.isBrowser = isPlatformBrowser(this._platformId);
    this.initializeTheme();
    
    // Opt-in: Reactively apply theme whenever it changes
    effect(() => {
      this.applyTheme(this.currentTheme());
    });
  }

  private initializeTheme() {
    if (!this.isBrowser) return;

    const savedTheme = localStorage.getItem(this.THEME_KEY) as 'light' | 'dark' | null;
    if (savedTheme) {
      this.currentTheme.set(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.currentTheme.set(prefersDark ? 'dark' : 'light');
    }
  }

  toggle() {
    const nextTheme = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.currentTheme.set(nextTheme);
    
    if (this.isBrowser) {
      localStorage.setItem(this.THEME_KEY, nextTheme);
    }
  }

  private applyTheme(theme: 'light' | 'dark') {
    if (this.isBrowser) {
      const html = document.documentElement;
      if (theme === 'dark') {
        html.setAttribute('data-theme', 'dark');
      } else {
        html.removeAttribute('data-theme');
      }
    }
  }
}
