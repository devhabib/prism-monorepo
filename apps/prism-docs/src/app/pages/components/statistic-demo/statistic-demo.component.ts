import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismStatisticComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-statistic-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismStatisticComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './statistic-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticDemoComponent {
  readonly snippets = {
    usage: `<prism-statistic></prism-statistic>`
  };
}
