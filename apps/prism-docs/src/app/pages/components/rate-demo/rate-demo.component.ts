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
  PrismTabComponent,
  ApiTableComponent,
  ApiDoc
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
    PrismTabComponent,
    ApiTableComponent
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

  readonly apiData: ApiDoc[] = [
    { name: 'count', type: 'input<number>', default: '5', description: 'Total number of star icons.' },
    { name: 'icon', type: 'input<string>', default: "'star-fill'", description: 'The custom remix-icon name for stars.' },
    { name: 'allowHalf', type: 'input<boolean>', default: 'false', description: 'Whether to allow half-star selection.' },
    { name: 'disabled', type: 'model<boolean>', default: 'false', description: 'Whether the component is disabled.' },
    { name: 'value', type: 'model<number>', default: '0', description: 'The current two-way bound rating value.' }
  ];
}
