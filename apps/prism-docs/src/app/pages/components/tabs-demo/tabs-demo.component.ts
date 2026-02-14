import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  PrismTabGroupComponent, 
  PrismTabComponent, 
  PrismIconComponent, 
  PrismSelectComponent,
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismCodeBlockComponent,
  ApiTableComponent,
  ApiDoc
} from '@devynelogic/prism-core';

@Component({
  selector: 'prism-tabs-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PrismTabGroupComponent,
    PrismTabComponent,
    PrismIconComponent,
    PrismSelectComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismCodeBlockComponent,
    ApiTableComponent
  ],
  templateUrl: './tabs-demo.component.html',
  styles: [`
    :host {
      display: block;
    }
    
    .text-secondary {
      color: var(--surface-500);
    }
    
    .text-success-500 {
      color: var(--semantic-success);
    }
    
    .text-danger-500 {
      color: var(--semantic-danger);
    }
    
    .text-primary-500 {
      color: var(--primary-500);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsDemoComponent {
  // Playground State
  playgroundVariant = signal<'line' | 'pill' | 'enclosed'>('line');
  playgroundOrientation = signal<'horizontal' | 'vertical'>('horizontal');

  variantOptions = [
    { label: 'Line', value: 'line' },
    { label: 'Pill', value: 'pill' },
    { label: 'Enclosed', value: 'enclosed' }
  ];

  orientationOptions = [
    { label: 'Horizontal', value: 'horizontal' },
    { label: 'Vertical', value: 'vertical' }
  ];

  playgroundCode = computed(() => {
    return `<prism-tab-group 
  variant="${this.playgroundVariant()}" 
  orientation="${this.playgroundOrientation()}">
  <prism-tab label="First Tab">Content 1</prism-tab>
  <prism-tab label="Second Tab">Content 2</prism-tab>
  <prism-tab label="Third Tab">Content 3</prism-tab>
</prism-tab-group>`;
  });

  basicSnippet = `<prism-tab-group>
  <prism-tab label="Account">...</prism-tab>
  <prism-tab label="Password">...</prism-tab>
  <prism-tab label="Notifications">...</prism-tab>
</prism-tab-group>`;

  pillSnippet = `<prism-tab-group variant="pill">
  <prism-tab label="Monthly">...</prism-tab>
  <prism-tab label="Yearly">...</prism-tab>
</prism-tab-group>`;

  iconSnippet = `<prism-tab-group>
  <prism-tab label="Favorites">
    <div class="flex items-center gap-3">
      <prism-icon name="heart-line"></prism-icon>
      ...
    </div>
  </prism-tab>
  ...
</prism-tab-group>`;

  verticalSnippet = `<div class="h-64 flex">
  <prism-tab-group orientation="vertical">
    <prism-tab label="General">...</prism-tab>
    <prism-tab label="Profile">...</prism-tab>
    ...
  </prism-tab-group>
</div>`;

  apiDocs: ApiDoc[] = [
    { name: 'variant', type: "'line' | 'pill' | 'enclosed'", default: "'line'", description: 'The visual style of the tabs.' },
    { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Layout direction of the tabs.' },
    { name: 'selectedIndex', type: 'number', default: '0', description: 'Index of the active tab (supports two-way binding).' },
  ];

  tabApiDocs: ApiDoc[] = [
    { name: 'label', type: 'string', default: 'undefined', description: 'Text label displayed in the tab button.' },
  ];
}
