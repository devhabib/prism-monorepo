import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  PrismSpaceComponent, 
  PrismSpaceItemDirective,
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  ApiTableComponent,
  ApiDoc,
  PrismDemoCardComponent,
  PrismButtonComponent,
  PrismRadioComponent,
  PrismRadioGroupComponent,
  PrismDividerComponent,
  PrismSpaceSize
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-space-demo',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    PrismSpaceComponent, 
    PrismSpaceItemDirective,
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    ApiTableComponent,
    PrismDemoCardComponent,
    PrismButtonComponent,
    PrismRadioComponent,
    PrismRadioGroupComponent,
    PrismDividerComponent,
  ],
  templateUrl: './space-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceDemoComponent {
  readonly currentSize = signal<PrismSpaceSize>('small');

  readonly snippets = {
    horizontal: `<prism-space size="middle">
  <prism-button label="Item 1"/>
  <prism-button label="Item 2"/>
  <prism-button label="Item 3"/>
</prism-space>`,
    vertical: `<prism-space direction="vertical" size="large">
  <prism-button label="Item 1"/>
  <prism-button label="Item 2"/>
</prism-space>`,
    sizes: `<prism-radio-group [ngModel]="currentSize()" (ngModelChange)="currentSize.set($event)">
  <prism-radio value="small">Small</prism-radio>
  <prism-radio value="middle">Middle</prism-radio>
  <prism-radio value="large">Large</prism-radio>
</prism-radio-group>

<prism-space [size]="currentSize()">
  <prism-button label="Button"/>
  <prism-button label="Button"/>
  <prism-button label="Button"/>
</prism-space>`,
    align: `<prism-space align="center" class="bg-slate-50 p-4">
  Center Align:
  <prism-button label="Button"/>
  <div class="h-16 w-16 bg-primary-500 rounded flex items-center justify-center text-white">Block</div>
</prism-space>`,
    wrap: `<prism-space [wrap]="true" size="middle">
  @for (i of [1,2,3,4,5,6,7,8,9,10]; track i) {
    <prism-button label="Button {{i}}"/>
  }
</prism-space>`,
    split: `<ng-template #divider>
  <prism-divider type="vertical"></prism-divider>
</ng-template>

<prism-space [split]="divider">
  <ng-template prismSpaceItem>
    <prism-button label="Link 1"/>
  </ng-template>
  <ng-template prismSpaceItem>
    <prism-button label="Link 2"/>
  </ng-template>
  <ng-template prismSpaceItem>
    <prism-button label="Link 3"/>
  </ng-template>
</prism-space>`
  };

  readonly apiData: ApiDoc[] = [
    { name: 'direction', type: `'horizontal' | 'vertical'`, default: `'horizontal'`, description: 'The spacing direction.' },
    { name: 'size', type: `'small' | 'middle' | 'large' | number`, default: `'small'`, description: 'The gap size preset or custom number (px).' },
    { name: 'wrap', type: 'boolean', default: `false`, description: 'Whether to wrap items.' },
    { name: 'align', type: `'start' | 'end' | 'center' | 'baseline' | 'stretch'`, default: '-', description: 'Alignment of items (CSS align-items).' },
    { name: 'split', type: 'TemplateRef<void>', default: '-', description: 'Template for the divider between items.' },
  ];
}
