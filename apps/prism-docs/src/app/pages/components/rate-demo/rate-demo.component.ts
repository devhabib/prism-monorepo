import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  PrismRateComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-rate-demo',
  imports: [
    CommonModule, 
    FormsModule,
    PrismRateComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './rate-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RateDemoComponent {
  rateValue = signal(3.5);

  readonly snippets = {
    usage: `<prism-rate [(value)]="rateValue" />`,
    half: `<prism-rate [allowHalf]="true" [(value)]="rateValue" />`,
    custom: `<prism-rate [count]="10" icon="heart-fill" [(value)]="rateValue" />`,
    disabled: `<prism-rate [disabled]="true" [value]="4" />`
  };
}
