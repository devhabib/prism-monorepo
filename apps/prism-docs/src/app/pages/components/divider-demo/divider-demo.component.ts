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
  PrismIconComponent,
  ApiDoc,
  PrismDemoCardComponent
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
    ApiTableComponent,
    PrismIconComponent,
    PrismDemoCardComponent
  ],
  templateUrl: './divider-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerDemoComponent {
  readonly snippets = {
    basic: `<prism-divider></prism-divider>`,
    text: `<prism-divider text="Text"></prism-divider>
<prism-divider orientation="left" text="Left Text"></prism-divider>
<prism-divider orientation="right" text="Right Text"></prism-divider>`,
    template: `<!-- Template Ref -->
<ng-template #iconContent>
    <prism-icon name="star-fill" class="text-warning-500"></prism-icon>
</ng-template>
<prism-divider [text]="iconContent"></prism-divider>

<!-- Complex Template -->
<ng-template #customContent>
    <div class="flex items-center gap-2 text-primary-600 font-medium">
        <prism-icon name="flashlight-fill"></prism-icon>
        <span>Power Up</span>
    </div>
</ng-template>
<prism-divider [text]="customContent" [dashed]="true"></prism-divider>`,
    vertical: `<span>Link 1</span>
<prism-divider type="vertical"></prism-divider>
<span>Link 2</span>`
  };

  readonly apiData: ApiDoc[] = [
    { name: 'type', type: `'horizontal' | 'vertical'`, default: `'horizontal'`, description: 'The orientation of the divider.' },
    { name: 'orientation', type: `'left' | 'right' | 'center'`, default: `'center'`, description: 'The position of the text.' },
    { name: 'dashed', type: `boolean`, default: `false`, description: 'Whether the divider is dashed.' },
    { name: 'text', type: `string | TemplateRef<unknown>`, default: `null`, description: 'Text or content to display within the divider line.' },
    { name: 'dashed', type: `boolean`, default: `false`, description: 'Whether the divider is dashed.' },
  ];
}
