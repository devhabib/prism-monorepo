import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismListComponent, 
  PrismListItemComponent, 
  PrismListItemMetaComponent,
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  ApiTableComponent,
  PrismCardComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-list-demo',
  imports: [
    CommonModule, 
    PrismListComponent, 
    PrismListItemComponent,
    PrismListItemMetaComponent,
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    ApiTableComponent,
    PrismCardComponent
  ],
  templateUrl: './list-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListDemoComponent {
  readonly snippets = {
    basic: `
<prism-list header="Header" footer="Footer" [bordered]="true">
  <prism-list-item>Racing car sprays burning fuel into crowd.</prism-list-item>
  <prism-list-item>Japanese princess to wed commoner.</prism-list-item>
  <prism-list-item>Australian walks 100km after outback crash.</prism-list-item>
</prism-list>
    `.trim(),
    avatarMeta: `
<prism-list [dataSource]="data()" [itemTemplate]="itemTpl" [bordered]="true">
</prism-list>

<ng-template #itemTpl let-item>
  <prism-list-item [extra]="actionTemplate">
    <prism-list-item-meta 
      [title]="titleTemplate" 
      [description]="item.description" 
      [avatar]="avatarTemplate">
    </prism-list-item-meta>
  </prism-list-item>

  <ng-template #titleTemplate>
    <a href="https://ng.ant.design">{{ item.title }}</a>
  </ng-template>

  <ng-template #avatarTemplate>
    <img [src]="item.avatar" alt="avatar" style="width: 40px; height: 40px; border-radius: 50%;" />
  </ng-template>

  <ng-template #actionTemplate>
     <a style="color: var(--prism-primary-color); cursor: pointer;">edit</a>
  </ng-template>
</ng-template>
    `.trim(),
    grid: `
<prism-list [grid]="{ gutter: 16, column: 3 }" [dataSource]="data()" [itemTemplate]="gridItemTpl">
</prism-list>

<ng-template #gridItemTpl let-item>
  <prism-list-item>
    <prism-card [title]="item.title">
      {{ item.description }}
    </prism-card>
  </prism-list-item>
</ng-template>
    `.trim()
  };

  readonly data = signal([
    {
      title: 'Prism UI Concept',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
    },
    {
      title: 'Prism Architecture',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
    },
    {
      title: 'Prism Performance',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
    }
  ]);

  readonly apiDataList = [
    { name: 'dataSource', type: 'any[]', default: 'undefined', description: 'Array of data objects to render' },
    { name: 'itemTemplate', type: 'TemplateRef<any>', default: '-', description: 'Template to render each item' },
    { name: 'bordered', type: 'boolean', default: 'false', description: 'Toggles rendering of the border around the list' },
    { name: 'split', type: 'boolean', default: 'true', description: 'Toggles rendering of the split under the list item' },
    { name: 'header', type: 'string | TemplateRef<unknown>', default: '-', description: 'List header content' },
    { name: 'footer', type: 'string | TemplateRef<unknown>', default: '-', description: 'List footer content' },
    { name: 'loadMore', type: 'string | TemplateRef<unknown>', default: '-', description: 'Load more content' },
    { name: 'grid', type: '{ gutter: number, column: number }', default: 'null', description: 'Grid layout configs' },
  ];

  readonly apiDataListItemMeta = [
    { name: 'avatar', type: 'string | TemplateRef<any>', default: '-', description: 'Avatar node of list item' },
    { name: 'title', type: 'string | TemplateRef<any>', default: '-', description: 'Title of list item' },
    { name: 'description', type: 'string | TemplateRef<any>', default: '-', description: 'Description of list item' },
  ];
}
