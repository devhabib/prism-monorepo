import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-timeline',
  imports: [CommonModule],
  template: `<div class="prism-timeline">Work in Progress: Timeline</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismTimelineComponent {
  readonly placeholder = input<string>();
}
