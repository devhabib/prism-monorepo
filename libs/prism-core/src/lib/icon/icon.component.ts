import { Component, ElementRef, inject, input, effect, ChangeDetectionStrategy, HostBinding } from '@angular/core';
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
      height: 1em;
      line-height: 1;
      fill: currentColor;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrismIconComponent {
  private element = inject(ElementRef);
  private registry = inject(PrismIconRegistry);

  name = input.required<string>();
  size = input<string>();

  @HostBinding('style.fontSize') get fontSize() {
    return this.size();
  }

  constructor() {
    effect(() => {
      const iconName = this.name();
      const svgData = this.registry.getIcon(iconName);
      
      if (svgData) {
        this.element.nativeElement.innerHTML = `<svg viewBox="0 0 24 24" width="100%" height="100%">${svgData}</svg>`;
      } else {
        this.element.nativeElement.innerHTML = '';
      }
    });
  }
}
