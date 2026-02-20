import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'prism-theme-toggle',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button 
      class="button theme-toggle" 
      (click)="themeService.toggle()" 
      [attr.aria-label]="'Switch to ' + (themeService.currentTheme() === 'light' ? 'dark' : 'light') + ' mode'"
    >
      <i [class]="themeService.currentTheme() === 'light' ? 'ri-moon-line' : 'ri-sun-line'"></i>
    </button>
  `,
  styles: [`
    .theme-toggle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid var(--border);
      background: var(--surface-0);
      color: var(--text-main);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 1.25rem;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      
      &:hover {
        background: var(--surface-100);
        transform: translateY(-1px);
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
      }

      &:active {
        transform: translateY(0);
      }

      i {
        line-height: 1;
      }
    }
  `]
})
export class ThemeToggleComponent {
  readonly themeService = inject(ThemeService);
}
