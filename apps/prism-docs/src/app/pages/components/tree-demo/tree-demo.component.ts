import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismTreeComponent,
  PrismCodeBlockComponent,
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  ApiTableComponent,
  PrismTreeNode,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-tree-demo',
  imports: [
    PrismTreeComponent, 
    PrismCodeBlockComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    CommonModule,
    ApiTableComponent,
    PrismDemoPageHeaderComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './tree-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeDemoComponent {
  treeData: PrismTreeNode[] = [
    {
      key: '0-0',
      title: 'Parent 1',
      children: [
        {
          key: '0-0-0',
          title: 'Child 1-1',
          children: [
            { key: '0-0-0-0', title: 'Leaf 1-1-1', isLeaf: true },
            { key: '0-0-0-1', title: 'Leaf 1-1-2', isLeaf: true },
          ],
        },
        {
          key: '0-0-1',
          title: 'Child 1-2',
          isLeaf: true,
        },
      ],
    },
    {
      key: '0-1',
      title: 'Parent 2',
      children: [
        { key: '0-1-0', title: 'Child 2-1', isLeaf: true },
        { key: '0-1-1', title: 'Child 2-2', isLeaf: true },
      ],
    },
  ];

  directoryData: PrismTreeNode[] = [
    {
      key: 'root',
      title: 'src',
      children: [
        {
          key: 'app',
          title: 'app',
          children: [
            { key: 'app.component.ts', title: 'app.component.ts', isLeaf: true },
            { key: 'app.component.scss', title: 'app.component.scss', isLeaf: true },
          ],
        },
        { key: 'assets', title: 'assets', children: [] },
        { key: 'index.html', title: 'index.html', isLeaf: true },
      ],
    },
  ];

  expandedKeys = signal<string[]>(['0-0', '0-0-0']);
  selectedKeys = signal<string[]>(['0-0-0-0']);
  checkedKeys = signal<string[]>([]);
  searchValue = signal('');

  readonly snippets = {
    basic: `<prism-tree [data]="treeData" />`,
    directory: `<prism-tree 
  [data]="directoryData" 
  [directoryMode]="true" 
  [expandedKeys]="['root']"
/>`,
    checkable: `<prism-tree 
  [data]="treeData" 
  [checkable]="true" 
  [(checkedKeys)]="checkedKeys"
/>`,
    search: `<prism-tree [data]="treeData" [search]="searchValue()" />`
  };

  readonly apiData = {
    inputs: [
      { name: 'data', description: 'The tree data source', type: 'PrismTreeNode[]', default: '-' },
      { name: 'showLine', description: 'Whether to show connecting lines', type: 'boolean', default: 'false' },
      { name: 'directoryMode', description: 'Whether to use directory icons', type: 'boolean', default: 'false' },
      { name: 'checkable', description: 'Whether to show checkboxes', type: 'boolean', default: 'false' },
      { name: 'multiple', description: 'Whether to allow multiple selection', type: 'boolean', default: 'false' },
      { name: 'search', description: 'Filter the tree based on title', type: 'string', default: '""' }
    ],
    outputs: [
      { name: 'nodeToggle', description: 'Callback when nodes are expanded/collapsed', type: 'EventEmitter<PrismTreeNode>', default: '-' },
      { name: 'nodeSelect', description: 'Callback when nodes are selected', type: 'EventEmitter<PrismTreeNode>', default: '-' },
      { name: 'nodeCheck', description: 'Callback when checkboxes are toggled', type: 'EventEmitter<{node, checked}>', default: '-' }
    ]
  };
}
