import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismRowComponent, 
  PrismColComponent,
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  ApiTableComponent,
  ApiDoc
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-grid-demo',
  imports: [
    CommonModule, 
    PrismRowComponent, 
    PrismColComponent,
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    ApiTableComponent
  ],
  templateUrl: './grid-demo.component.html',
  styles: [`
    .grid-box {
      background: var(--primary-500);
      color: #fff;
      padding: 16px 0;
      text-align: center;
      border-radius: 4px;
      font-weight: 500;
      min-height: 48px;
    }
    .grid-box-light {
      background: var(--primary-400);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridDemoComponent {
  readonly snippets = {
    basic: `<prism-row>
  <prism-col [span]="24">100%</prism-col>
</prism-row>
<prism-row>
  <prism-col [span]="12">50%</prism-col>
  <prism-col [span]="12">50%</prism-col>
</prism-row>`,
    gutter: `<prism-row [gutter]="16">
  <prism-col [span]="6">col-6</prism-col>
  <prism-col [span]="6">col-6</prism-col>
  <prism-col [span]="6">col-6</prism-col>
  <prism-col [span]="6">col-6</prism-col>
</prism-row>`,
    offset: `<prism-row>
  <prism-col [span]="8">col-8</prism-col>
  <prism-col [span]="8" [offset]="8">col-8 offset-8</prism-col>
</prism-row>`,
    responsive: `<prism-row>
  <prism-col [xs]="24" [sm]="12" [md]="8" [lg]="6">Responsive Col</prism-col>
  <prism-col [xs]="24" [sm]="12" [md]="8" [lg]="6">Responsive Col</prism-col>
</prism-row>`,
    responsiveObject: `<prism-row>
  <prism-col [xs]="{ span: 24 }" [lg]="{ span: 6, offset: 2 }">
    Col with offset on large screens
  </prism-col>
  <prism-col [xs]="{ span: 24 }" [lg]="{ span: 6, offset: 2 }">
    Col with offset on large screens
  </prism-col>
</prism-row>`,
    align: `<prism-row justify="center" align="middle" style="height: 100px; background: #eee;">
  <prism-col [span]="4">Center Middle</prism-col>
</prism-row>
<prism-row justify="space-between">
  <prism-col [span]="4">Start</prism-col>
  <prism-col [span]="4">End</prism-col>
</prism-row>`
  };

  readonly rowApiData: ApiDoc[] = [
    { name: 'gutter', type: 'number | [number, number]', default: '0', description: 'Gutter between columns, you can set [horizontal, vertical] gutter.' },
    { name: 'justify', type: `'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'`, default: `'start'`, description: 'Horizontal arrangement of the layout.' },
    { name: 'align', type: `'top' | 'middle' | 'bottom'`, default: `'top'`, description: 'Vertical arrangement of the layout.' },
  ];

  readonly colApiData: ApiDoc[] = [
    { name: 'span', type: 'number', default: '-', description: 'The number of cells to occupy (0-24).' },
    { name: 'offset', type: 'number', default: '0', description: 'The number of cells to offset from the left.' },
    { name: 'order', type: 'number', default: '0', description: 'Raster order.' },
    { name: 'xs', type: 'number | { span, offset, order }', default: '-', description: '<576px responsive columns.' },
    { name: 'sm', type: 'number | { span, offset, order }', default: '-', description: '>=576px responsive columns.' },
    { name: 'md', type: 'number | { span, offset, order }', default: '-', description: '>=768px responsive columns.' },
    { name: 'lg', type: 'number | { span, offset, order }', default: '-', description: '>=992px responsive columns.' },
    { name: 'xl', type: 'number | { span, offset, order }', default: '-', description: '>=1200px responsive columns.' },
    { name: 'xxl', type: 'number | { span, offset, order }', default: '-', description: '>=1600px responsive columns.' },
  ];
}
