import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismProgressComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-progress-demo',
  imports: [
    CommonModule, 
    PrismProgressComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './progress-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressDemoComponent {
  readonly snippets = {
    usage: `<prism-progress></prism-progress>`
  };
}
