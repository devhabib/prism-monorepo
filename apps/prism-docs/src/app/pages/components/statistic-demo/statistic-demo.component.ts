import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismStatisticComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  PrismCardComponent,
  PrismRowComponent,
  PrismColComponent,
  ApiTableComponent,
  PrismButtonComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-statistic-demo',
  imports: [
    CommonModule, 
    PrismStatisticComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    PrismCardComponent,
    PrismRowComponent,
    PrismColComponent,
    ApiTableComponent,
    PrismButtonComponent
  ],
  templateUrl: './statistic-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticDemoComponent {
  readonly snippets = {
    basic: `
<prism-row [gutter]="16">
  <prism-col [span]="12">
    <prism-card>
      <prism-statistic title="Active Users" [value]="112893"></prism-statistic>
    </prism-card>
  </prism-col>
  <prism-col [span]="12">
    <prism-card>
      <prism-statistic title="Account Balance (CNY)" [value]="112893" [precision]="2"></prism-statistic>
    </prism-card>
  </prism-col>
</prism-row>
    `.trim(),
    countUp: `
<prism-row [gutter]="16">
  <prism-col [span]="12">
    <prism-card>
      <prism-statistic 
        title="Total Downloads" 
        [value]="value()" 
        [countUp]="true" 
        [countUpDuration]="2500"
      ></prism-statistic>
    </prism-card>
  </prism-col>
  <prism-col [span]="12">
    <prism-card>
      <prism-statistic 
        title="Revenue" 
        [value]="revenue()" 
        [precision]="2" 
        prefix="$" 
        [countUp]="true"
        [countUpDuration]="2000"
      ></prism-statistic>
    </prism-card>
  </prism-col>
</prism-row>
<div style="margin-top: 16px;">
  <prism-button (click)="updateValues()" variant="primary">Update Values</prism-button>
</div>
    `.trim(),
    prefixSuffix: `
<prism-row [gutter]="16">
  <prism-col [span]="12">
    <prism-card>
      <prism-statistic 
        title="Feedback" 
        [value]="1128" 
        prefix="👍"
      ></prism-statistic>
    </prism-card>
  </prism-col>
  <prism-col [span]="12">
    <prism-card>
      <prism-statistic 
        title="Unmerged" 
        [value]="93" 
        suffix="/ 100"
      ></prism-statistic>
    </prism-card>
  </prism-col>
</prism-row>
    `.trim()
  };

  readonly value = signal(125430);
  readonly revenue = signal(50234.50);

  updateValues(): void {
    this.value.set(this.value() + Math.floor(Math.random() * 10000));
    this.revenue.set(this.revenue() + Math.random() * 5000);
  }

  readonly apiData = [
    { name: 'title', type: 'string | TemplateRef<any>', default: '-', description: 'The title of the statistic' },
    { name: 'value', type: 'number | string', default: '0', description: 'The value to display' },
    { name: 'prefix', type: 'string | TemplateRef<any>', default: '-', description: 'The prefix node of value' },
    { name: 'suffix', type: 'string | TemplateRef<any>', default: '-', description: 'The suffix node of value' },
    { name: 'precision', type: 'number', default: '0', description: 'The precision of input value' },
    { name: 'countUp', type: 'boolean', default: 'false', description: 'Whether to animate count up to the value from 0 or last value' },
    { name: 'countUpDuration', type: 'number', default: '2000', description: 'Duration of the count up animation in ms' },
    { name: 'valueStyle', type: 'Record<string, string>', default: 'null', description: 'Inline style for the value node' },
  ];
}
