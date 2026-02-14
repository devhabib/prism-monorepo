import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismStepsComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-steps-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismStepsComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './steps-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepsDemoComponent {
  readonly snippets = {
    usage: `<prism-steps></prism-steps>`
  };
}
