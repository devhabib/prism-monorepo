import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-empty',
  imports: [CommonModule],
  template: `
    <div class="prism-empty">
      <div class="prism-empty__media">
        @if (image()) {
          <img [src]="image()" class="prism-empty__image" alt="Empty state illustration">
        } @else {
          <i class="prism-empty__icon {{ icon() }}"></i>
        }
      </div>
      <div class="prism-empty__content">
        <h3 class="prism-empty__title">{{ title() }}</h3>
        @if (description()) {
          <p class="prism-empty__description">{{ description() }}</p>
        }
      </div>
      <div class="prism-empty__actions">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./empty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrismEmptyComponent {
  icon = input<string>('ri-inbox-2-line');
  image = input<string>('');
  title = input<string>('No Data');
  description = input<string>('');
}
