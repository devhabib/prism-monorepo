import { Component, ChangeDetectionStrategy, input, model, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismTreeNode } from './tree.types';
import { PrismTreeNodeComponent } from './tree-node.component';

@Component({
  selector: 'prism-tree',
  imports: [CommonModule, PrismTreeNodeComponent],
  template: `
    <div class="prism-tree" [class.prism-tree-show-line]="showLine()">
      @for (node of filteredData(); track node.key) {
        <prism-tree-node
          [node]="node"
          [expandedKeys]="expandedKeys()"
          [selectedKeys]="selectedKeys()"
          [checkedKeys]="checkedKeys()"
          [checkable]="checkable()"
          [directoryMode]="directoryMode()"
          (nodeToggle)="handleToggle($any($event))"
          (nodeSelect)="handleSelect($any($event))"
          (nodeCheck)="handleCheck($any($event))"
        />
      } @empty {
        <div class="prism-tree-empty">
          <ng-content select="[empty]"></ng-content>
        </div>
      }
    </div>
  `,
  styleUrl: './tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismTreeComponent {
  data = input.required<PrismTreeNode[]>();
  showLine = input<boolean>(false);
  directoryMode = input<boolean>(false);
  checkable = input<boolean>(false);
  multiple = input<boolean>(false);
  search = input<string>('');

  expandedKeys = model<string[]>([]);
  selectedKeys = model<string[]>([]);
  checkedKeys = model<string[]>([]);

  filteredData = computed(() => {
    const searchTerm = this.search().toLowerCase();
    if (!searchTerm) return this.data();
    
    return this.filterNodes(this.data(), searchTerm);
  });

  private filterNodes(nodes: PrismTreeNode[], term: string): PrismTreeNode[] {
    return nodes.reduce((acc: PrismTreeNode[], node) => {
      const match = node.title.toLowerCase().includes(term);
      const filteredChildren = node.children ? this.filterNodes(node.children, term) : [];
      
      if (match || filteredChildren.length > 0) {
        acc.push({
          ...node,
          children: filteredChildren.length > 0 ? filteredChildren : node.children
        });
      }
      return acc;
    }, []);
  }

  handleToggle(node: PrismTreeNode): void {
    const keys = [...this.expandedKeys()];
    const index = keys.indexOf(node.key);
    if (index > -1) {
      keys.splice(index, 1);
    } else {
      keys.push(node.key);
    }
    this.expandedKeys.set(keys);
  }

  handleSelect(node: PrismTreeNode): void {
    if (this.multiple()) {
      const keys = [...this.selectedKeys()];
      const index = keys.indexOf(node.key);
      if (index > -1) {
        keys.splice(index, 1);
      } else {
        keys.push(node.key);
      }
      this.selectedKeys.set(keys);
    } else {
      this.selectedKeys.set([node.key]);
    }
  }

  handleCheck(event: { node: PrismTreeNode, checked: boolean }): void {
    const { node, checked } = event;
    let keys = [...this.checkedKeys()];
    
    if (checked) {
      if (!keys.includes(node.key)) {
        keys.push(node.key);
      }
      // If parent is checked, check all children? 
      // Simplified for now: just toggle the node itself.
      // Full implementation would handle indeterminate states and recursive checking.
    } else {
      keys = keys.filter(k => k !== node.key);
    }
    
    this.checkedKeys.set(keys);
  }
}
