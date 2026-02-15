import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismLayoutComponent, 
  PrismHeaderComponent,
  PrismSiderComponent,
  PrismContentComponent,
  PrismFooterComponent,
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  ApiTableComponent,
  ApiDoc
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-layout-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismLayoutComponent, 
    PrismHeaderComponent,
    PrismSiderComponent,
    PrismContentComponent,
    PrismFooterComponent,
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    ApiTableComponent
  ],
  templateUrl: './layout-demo.component.html',
  styles: [`
    :host {
      display: block;
    }
    
    .demo-layout {
      text-align: center;
      margin-bottom: 24px;
      
      .prism-header, .prism-footer {
        background: var(--primary-400);
        color: #fff;
      }
      
      .prism-sider {
        background: var(--primary-600);
        color: #fff;
        line-height: 120px;
      }
      
      .prism-content {
        background: var(--primary-500);
        color: #fff;
        min-height: 120px;
        line-height: 120px;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutDemoComponent {
  readonly snippets = {
    classic: `
<prism-layout class="demo-layout">
  <prism-header>Header</prism-header>
  <prism-layout>
    <prism-sider collapsible>Sider</prism-sider>
    <prism-content>Content</prism-content>
  </prism-layout>
  <prism-footer>Footer</prism-footer>
</prism-layout>`,
    hcf: `
<prism-layout class="demo-layout">
  <prism-header>Header</prism-header>
  <prism-content>Content</prism-content>
  <prism-footer>Footer</prism-footer>
</prism-layout>`
  };

  readonly layoutApi: ApiDoc[] = [
    { name: 'class', type: 'string', default: '-', description: 'Additional CSS class for the layout container.' }
  ];

  readonly headerApi: ApiDoc[] = [
    { name: 'class', type: 'string', default: '-', description: 'Additional CSS class for the header.' }
  ];

  readonly siderApi: ApiDoc[] = [
    { name: 'width', type: 'string | number', default: '200', description: 'Width of the sider.' },
    { name: 'collapsedWidth', type: 'string | number', default: '80', description: 'Width of the sider when collapsed.' },
    { name: 'collapsible', type: 'boolean', default: 'false', description: 'Whether the sider can be collapsed.' },
    { name: 'collapsed', type: 'boolean (model)', default: 'false', description: 'Whether the sider is currently collapsed (supports two-way binding).' }
  ];

  readonly contentApi: ApiDoc[] = [
    { name: 'class', type: 'string', default: '-', description: 'Additional CSS class for the content area.' }
  ];

  readonly footerApi: ApiDoc[] = [
    { name: 'class', type: 'string', default: '-', description: 'Additional CSS class for the footer.' }
  ];
}
