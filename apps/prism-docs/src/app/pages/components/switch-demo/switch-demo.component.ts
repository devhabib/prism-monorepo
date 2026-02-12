import { Component, signal, ChangeDetectionStrategy, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismSwitchComponent, 
  PrismCodeBlockComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  ApiTableComponent
} from '@prism-monorepo/prism-core';

@Component({
  selector: 'prism-switch-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismSwitchComponent, 
    PrismCodeBlockComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    ApiTableComponent
  ],
  templateUrl: './switch-demo.component.html',
  styleUrls: ['./switch-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchDemoComponent {
  // Basic states
  checked1 = signal(false);
  checked2 = signal(true);
  
  // Custom children
  checked3 = signal(true);
  
  // Loading
  loading = signal(true);

  apiDocs = [
    { name: 'checked', type: 'model<boolean>', default: 'false', description: 'Two-way binding for state.' },
    { name: 'checkedChildren', type: 'string | TemplateRef', default: 'null', description: 'Content when ON.' },
    { name: 'unCheckedChildren', type: 'string | TemplateRef', default: 'null', description: 'Content when OFF.' },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Show loading spinner.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
    { name: 'size', type: "'default' | 'small'", default: "'default'", description: 'Size of the switch.' }
  ];

  // Template examples
  basicTS = `import { Component, signal } from '@angular/core';
import { PrismSwitchComponent } from '@prism-monorepo/prism-core';

@Component({
  selector: 'app-switch-example',
  standalone: true,
  imports: [PrismSwitchComponent],
  template: '<prism-switch [(checked)]="checked" />'
})
export class SwitchExampleComponent {
  checked = signal(false);
}`;

  childrenHTML = `<prism-switch 
  [(checked)]="checked" 
  checkedChildren="ON" 
  unCheckedChildren="OFF" 
/>

<prism-switch 
  [(checked)]="checked" 
  [checkedChildren]="checkIcon" 
  [unCheckedChildren]="closeIcon" 
/>

<ng-template #checkIcon><i class="ri-check-line"></i></ng-template>
<ng-template #closeIcon><i class="ri-close-line"></i></ng-template>`;
}
