import { Component, ElementRef, inject, input, effect, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismIconRegistry } from './icon-registry.service';

@Component({
  selector: 'prism-icon',
  standalone: true,
  imports: [CommonModule],
  template: ``,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1em;
      min-width: 1em;
      height: 1em;
      min-height: 1em;
      line-height: 1;
      fill: currentColor;
      vertical-align: middle;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.fontSize]': 'getIconSize()'
  }
})
export class PrismIconComponent {
  private element = inject(ElementRef);
  private registry = inject(PrismIconRegistry);

  name = input.required<string>();
  size = input<string | number>();

  protected readonly getIconSize = computed(() => {
    const s = this.size();
    if (!s) return undefined;
    if (typeof s === 'number' || /^\d+$/.test(String(s))) {
      return `${s}px`;
    }
    return s.toString();
  });

  constructor() {
    effect(() => {
      const iconName = this.name();
      const svgData = this.registry.getIcon(iconName);
      
      if (svgData) {
        // Wrap with standard SVG attributes for consistency
        this.element.nativeElement.innerHTML = `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor" style="display: block;">${svgData}</svg>`;
      } else {
        this.element.nativeElement.innerHTML = '';
      }
    });
  }
}
