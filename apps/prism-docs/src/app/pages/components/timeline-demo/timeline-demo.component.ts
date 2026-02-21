import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismTimelineComponent, 
  PrismTimelineItemComponent,
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismIconComponent,
  ApiTableComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-timeline-demo',
  imports: [
    CommonModule, 
    PrismTimelineComponent, 
    PrismTimelineItemComponent,
    PrismCodeBlockComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismIconComponent,
    ApiTableComponent,
    PrismDemoPageHeaderComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './timeline-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineDemoComponent {
  readonly snippets = {
    basic: `<prism-timeline>
  <prism-timeline-item>Create a services site 2015-09-01</prism-timeline-item>
  <prism-timeline-item>Solve initial network problems 2015-09-01</prism-timeline-item>
  <prism-timeline-item>Technical testing 2015-09-01</prism-timeline-item>
  <prism-timeline-item>Network problems being solved 2015-09-01</prism-timeline-item>
</prism-timeline>`,
    alternate: `<prism-timeline mode="alternate">
  <prism-timeline-item>Create a services site 2015-09-01</prism-timeline-item>
  <prism-timeline-item>Solve initial network problems 2015-09-01</prism-timeline-item>
  <prism-timeline-item>Technical testing 2015-09-01</prism-timeline-item>
  <prism-timeline-item>Network problems being solved 2015-09-01</prism-timeline-item>
</prism-timeline>`,
    labelUsage: `<prism-timeline mode="alternate">
  <prism-timeline-item>
    <span label>2015-09-01</span>
    Create a services site
  </prism-timeline-item>
  <prism-timeline-item>
    <span label>2015-09-01</span>
    Solve initial network problems
  </prism-timeline-item>
  <prism-timeline-item>
    <span label>2015-09-01</span>
    Technical testing
  </prism-timeline-item>
  <prism-timeline-item>
    <span label>2015-09-01</span>
    Network problems being solved
  </prism-timeline-item>
</prism-timeline>`,
    custom: `<prism-timeline>
  <prism-timeline-item>
    <prism-icon dot name="checkbox-circle-line" class="text-green-500" />
    Technical testing 2024-02-21
  </prism-timeline-item>
</prism-timeline>`,
    pending: `<prism-timeline pending="Recording..." [reverse]="true">
  <prism-timeline-item>Create a services site 2015-09-01</prism-timeline-item>
  <prism-timeline-item>Solve initial network problems 2015-09-01</prism-timeline-item>
</prism-timeline>`
  };

  readonly apiData = {
    timelineInputs: [
      { name: 'mode', type: "'left' | 'alternate' | 'right'", default: "'left'", description: 'Set vertical position of timeline' },
      { name: 'pending', type: 'boolean | string', default: 'false', description: 'Set pending state or text' },
      { name: 'reverse', type: 'boolean', default: 'false', description: 'Whether to reverse the order of items' }
    ],
    itemInputs: [
      { name: 'color', type: 'string', default: "'primary'", description: 'Color of the dot' },
      { name: 'dot', type: 'slot', default: '-', description: 'Custom dot via <prism-icon dot>' },
      { name: 'label', type: 'slot', default: '-', description: 'Label displayed on the opposite side' }
    ]
  };
}
