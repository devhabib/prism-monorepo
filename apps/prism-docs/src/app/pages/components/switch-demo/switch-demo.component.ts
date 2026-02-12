import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismSwitchComponent, 
  PrismCodeBlockComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  ApiTableComponent,
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent
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
    ApiTableComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent
  ],
  templateUrl: './switch-demo.component.html',
  styleUrls: ['./switch-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchDemoComponent {
  // Basic states
  checked1 = signal(false);
  checked2 = signal(true);
  checked3 = signal(true);
  
  // Interactive Loading
  isLoading = signal(false);
  isAccountActive = signal(false);

  onAccountToggle(): void {
    this.isLoading.set(true);
    // Simulate API call
    setTimeout(() => {
      this.isAccountActive.update(v => !v);
      this.isLoading.set(false);
    }, 2000);
  }

  // API Docs
  apiDocs = [
    { name: 'checked', type: 'model<boolean>', default: 'false', description: 'Two-way binding for state.' },
    { name: 'checkedChildren', type: 'string | TemplateRef', default: 'null', description: 'Content when ON.' },
    { name: 'unCheckedChildren', type: 'string | TemplateRef', default: 'null', description: 'Content when OFF.' },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Show loading spinner.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
    { name: 'size', type: "'default' | 'small'", default: "'default'", description: 'Size of the switch.' }
  ];

  // Code Examples
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

  sizesHTML = `<prism-switch [(checked)]="checked" />
<prism-switch [(checked)]="checked" size="small" />`;

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

  interactiveTS = `export class MyComponent {
  isLoading = signal(false);
  isAccountActive = signal(false);

  onAccountToggle() {
    this.isLoading.set(true);
    // Simulate API call
    setTimeout(() => {
      this.isAccountActive.update(v => !v);
      this.isLoading.set(false);
    }, 2000);
  }
}`;

  statesHTML = `<prism-switch [loading]="true" [checked]="true" />
<prism-switch [disabled]="true" [checked]="false" />`;
}
