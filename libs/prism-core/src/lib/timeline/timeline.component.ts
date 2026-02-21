import { Component, ChangeDetectionStrategy, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-timeline',
  imports: [CommonModule],
  template: `
    <ul 
      class="prism-timeline" 
      [class.prism-timeline-left]="mode() === 'left'"
      [class.prism-timeline-right]="mode() === 'right'"
      [class.prism-timeline-alternate]="mode() === 'alternate'"
      [class.prism-timeline-pending]="pending()"
      [class.prism-timeline-reverse]="reverse()"
    >
      <ng-content></ng-content>
      @if (pending()) {
        <li class="prism-timeline-item prism-timeline-item-pending">
          <div class="prism-timeline-item-tail"></div>
          <div class="prism-timeline-item-head">
            <ng-content select="[pendingDot]">
              <div class="prism-timeline-item-head-dot prism-timeline-item-head-pending"></div>
            </ng-content>
          </div>
          <div class="prism-timeline-item-content">
            {{ pendingText() }}
          </div>
        </li>
      }
    </ul>
  `,
  styleUrl: './timeline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PrismTimelineComponent {
  mode = input<'left' | 'alternate' | 'right'>('left');
  pending = input<boolean | string>(false);
  reverse = input<boolean>(false);

  pendingText(): string {
    return typeof this.pending() === 'string' ? (this.pending() as string) : '';
  }
}
