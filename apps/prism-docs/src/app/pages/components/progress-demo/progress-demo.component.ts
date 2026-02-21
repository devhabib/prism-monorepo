import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { 
  PrismProgressComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  PrismButtonComponent,
  ApiTableComponent
} from '@devynelogic/prism-core';
import { CommonModule } from '@angular/common';

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
    PrismTabComponent,
    PrismButtonComponent,
    ApiTableComponent
  ],
  templateUrl: './progress-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressDemoComponent {
  readonly percent = signal(30);

  readonly snippets = {
    line: `<prism-progress [percent]="30"></prism-progress>
<prism-progress [percent]="50" status="active"></prism-progress>
<prism-progress [percent]="70" status="exception"></prism-progress>
<prism-progress [percent]="100"></prism-progress>`,
    circle: `<prism-progress type="circle" [percent]="30" [width]="80"></prism-progress>
<prism-progress type="circle" [percent]="70" status="exception" [width]="80"></prism-progress>
<prism-progress type="circle" [percent]="100" [width]="80"></prism-progress>`,
    dynamic: `<prism-progress [percent]="percent()"></prism-progress>
<prism-progress type="circle" [percent]="percent()"></prism-progress>
<div class="flex gap-2 mt-4">
  <prism-button (click)="decrease()">-</prism-button>
  <prism-button (click)="increase()">+</prism-button>
</div>`
  };

  increase(): void {
    this.percent.update(p => Math.min(p + 10, 100));
  }

  decrease(): void {
    this.percent.update(p => Math.max(p - 10, 0));
  }

  readonly apiData = [
    { name: 'percent', description: 'Current percentage (0-100), two-way bindable', type: 'number', default: '0' },
    { name: 'type', description: 'Type of progress', type: "'line' | 'circle'", default: "'line'" },
    { name: 'status', description: 'Status of progress', type: "'normal' | 'active' | 'success' | 'exception'", default: "'normal'" },
    { name: 'strokeWidth', description: 'Width of the progress stroke', type: 'number', default: '6' },
    { name: 'showInfo', description: 'Whether to show percentage text or icons', type: 'boolean', default: 'true' },
    { name: 'width', description: 'Width of the circle canvas in px (only for type="circle")', type: 'number', default: '120' }
  ];
}
