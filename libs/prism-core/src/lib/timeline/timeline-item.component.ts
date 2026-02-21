import { Component, ChangeDetectionStrategy, input, ViewEncapsulation, contentChild, computed, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-timeline-item',
  imports: [CommonModule],
  host: {
    'class': 'prism-timeline-item',
    '[class.prism-timeline-item-last]': 'last()',
    '[attr.data-custom-dot]': 'hasCustomDot()',
  },
  template: `
    <div class="prism-timeline-item-label">
      <ng-content select="[label]"></ng-content>
    </div>
    <div class="prism-timeline-item-tail"></div>
    <div class="prism-timeline-item-head" [class.prism-timeline-item-head-custom]="hasCustomDot()">
      <ng-content select="[dot]"></ng-content>
      @if (!hasCustomDot()) {
        <div class="prism-timeline-item-head-dot"></div>
      }
    </div>
    <div class="prism-timeline-item-content">
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './timeline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PrismTimelineItemComponent {
  last = input<boolean>(false);
  color = input<string>('primary');
  icon = input<string>();
  
  // Use a more robust check for projected content
  dotContent = contentChild<ElementRef>('[dot]', { descendants: true });

  hasCustomDot = computed(() => !!this.icon() || !!this.dotContent());
}
