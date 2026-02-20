import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PrismBadgeComponent,
  PrismCodeBlockComponent,
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  PrismAvatarComponent,
  PrismButtonComponent,
  PrismIconComponent,
  ApiTableComponent,
  ApiDoc,
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-badge-demo',
  imports: [
    CommonModule,
    PrismBadgeComponent,
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    PrismAvatarComponent,
    PrismButtonComponent,
    PrismIconComponent,
    ApiTableComponent,
  ],
  templateUrl: './badge-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeDemoComponent {
  readonly dynamicCount = signal(5);

  increment(): void {
    this.dynamicCount.update(c => c + 1);
  }

  decrement(): void {
    this.dynamicCount.update(c => Math.max(0, c - 1));
  }

  readonly snippets = {
    basic: `<prism-badge [count]="5">
  <prism-avatar label="U" size="lg" />
</prism-badge>
<prism-badge [count]="25" status="success">
  <prism-avatar label="U" size="lg" />
</prism-badge>`,
    standalone: `<prism-badge [count]="99" [isStandalone]="true" />
<prism-badge count="New" [isStandalone]="true" status="success" />
<prism-badge count="Hot" [isStandalone]="true" status="warning" />`,
    dot: `<prism-badge [dot]="true" status="error">
  <prism-icon name="notification-line" style="font-size:1.5rem" />
</prism-badge>
<prism-badge [dot]="true" status="success">
  <prism-icon name="mail-line" style="font-size:1.5rem" />
</prism-badge>
<prism-badge [dot]="true" status="processing">
  <prism-icon name="message-line" style="font-size:1.5rem" />
</prism-badge>`,
    dynamic: `dynamicCount = signal(5);

<prism-badge [count]="dynamicCount()">
  <prism-avatar label="U" size="lg" />
</prism-badge>
<prism-button (click)="dynamicCount.update(c => c - 1)">-</prism-button>
<prism-button (click)="dynamicCount.update(c => c + 1)">+</prism-button>`,
    overflow: `<prism-badge [count]="100" [overflowCount]="99">
  <prism-avatar label="U" size="lg" />
</prism-badge>
<prism-badge [count]="1000" [overflowCount]="999">
  <prism-avatar label="U" size="lg" />
</prism-badge>`,
  };

  readonly apiData: ApiDoc[] = [
    { name: 'count', type: 'number | string', default: '0', description: 'Number or text to display in the badge.' },
    { name: 'dot', type: 'boolean', default: 'false', description: 'Whether to show a small dot instead of a count.' },
    { name: 'showZero', type: 'boolean', default: 'false', description: 'Whether to display the badge when count is zero.' },
    { name: 'overflowCount', type: 'number', default: '99', description: 'Max count; displays as "99+" when exceeded.' },
    { name: 'status', type: "'success' | 'error' | 'warning' | 'default' | 'processing'", default: "'error'", description: 'Color status of the badge.' },
    { name: 'offset', type: '[number, number]', default: '[0, 0]', description: 'Fine-tune badge position [x, y] in px.' },
    { name: 'isStandalone', type: 'boolean', default: 'false', description: 'Renders badge inline without absolute positioning.' },
  ];
}
