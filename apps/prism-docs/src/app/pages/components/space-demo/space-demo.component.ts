import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismSpaceComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  PrismButtonComponent,
  ApiTableComponent,
  ApiDoc
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-space-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismSpaceComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    PrismButtonComponent,
    ApiTableComponent
  ],
  templateUrl: './space-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceDemoComponent {
  readonly snippets = {
    horizontal: `<prism-space gap="16px">
  <prism-button>Item 1</prism-button>
  <prism-button>Item 2</prism-button>
</prism-space>`,
    vertical: `<prism-space direction="vertical" gap="24px">
  <prism-button>Item 1</prism-button>
  <prism-button>Item 2</prism-button>
</prism-space>`
  };

  readonly apiData: ApiDoc[] = [
    { name: 'direction', type: `'horizontal' | 'vertical'`, default: `'horizontal'`, description: 'The spacing direction.' },
    { name: 'gap', type: 'string | number', default: `'8px'`, description: 'The gap size.' },
    { name: 'align', type: `'start' | 'end' | 'center' | 'baseline'`, default: '-', description: 'Alignment of items.' },
  ];
}
