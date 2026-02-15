import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismDividerComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  ApiTableComponent,
  ApiDoc
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-divider-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismDividerComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    ApiTableComponent
  ],
  templateUrl: './divider-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerDemoComponent {
  readonly snippets = {
    basic: `<prism-divider></prism-divider>`,
    text: `<prism-divider>Text</prism-divider>
<prism-divider orientation="left">Left Text</prism-divider>
<prism-divider orientation="right">Right Text</prism-divider>`,
    vertical: `<span>Link 1</span>
<prism-divider type="vertical"></prism-divider>
<span>Link 2</span>`
  };

  readonly apiData: ApiDoc[] = [
    { name: 'type', type: `'horizontal' | 'vertical'`, default: `'horizontal'`, description: 'The orientation of the divider.' },
    { name: 'orientation', type: `'left' | 'right' | 'center'`, default: `'center'`, description: 'The position of the text.' },
    { name: 'dashed', type: `boolean`, default: `false`, description: 'Whether the divider is dashed.' },
  ];
}
