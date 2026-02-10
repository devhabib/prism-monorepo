import { Component, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-tab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="prism-tab-content" [class.active]="_isActive()">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .prism-tab-content {
      display: none;

      &.active {
        display: block;
        animation: fadeIn 0.2s ease-in;
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismTabComponent {
  label = input.required<string>();
  // Internal writable signal that parent can access and update
  _isActive = signal<boolean>(false);
}
