import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismTimelineComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-timeline-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismTimelineComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './timeline-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineDemoComponent {
  readonly snippets = {
    usage: `<prism-timeline></prism-timeline>`
  };
}
