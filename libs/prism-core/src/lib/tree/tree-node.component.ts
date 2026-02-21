import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismTreeNode } from './tree.types';
import { PrismIconComponent } from '../icon/icon.component';
import { PrismCheckboxComponent } from '../checkbox/checkbox.component';

@Component({
  selector: 'prism-tree-node',
  imports: [CommonModule, PrismIconComponent, PrismCheckboxComponent],
  template: `
    <div 
      class="prism-tree-node"
      [class.prism-tree-node-selected]="isSelected()"
      [class.prism-tree-node-disabled]="node().disabled"
      [style.paddingLeft.px]="level() * 24"
      tabindex="0"
    >
      <div class="prism-tree-node-content">
        <!-- Switcher/Toggle -->
        <span 
          class="prism-tree-node-switcher" 
          (click)="onToggle($any($event))"
          (keyup.enter)="onToggle($any($event))"
          tabindex="0"
        >
          @if (!node().isLeaf && node().children?.length) {
            <prism-icon 
              [name]="isExpanded() ? 'arrow-down-s-line' : 'arrow-right-s-line'"
              class="prism-tree-node-switcher-icon"
              [class.prism-tree-node-switcher-rotated]="isExpanded()"
            />
          }
        </span>

        <!-- Checkbox -->
        @if (checkable()) {
          <prism-checkbox
            [checked]="!!isChecked()"
            [disabled]="!!node().disabled"
            (checkedChange)="onCheck($event)"
            class="prism-tree-node-checkbox"
          />
        }

        <!-- Icon (Directory Mode or Custom) -->
        @if (node().icon || directoryMode()) {
          <span class="prism-tree-node-icon">
            <prism-icon [name]="getIconName()" />
          </span>
        }

        <!-- Title -->
        <span 
          class="prism-tree-node-title" 
          (click)="onSelect($any($event))"
          (keyup.enter)="onSelect($any($event))"
          tabindex="0"
        >
          {{ node().title }}
        </span>
      </div>
    </div>

    @if (isExpanded() && node().children?.length) {
      <div class="prism-tree-node-children">
        @for (child of node().children; track child.key) {
          <prism-tree-node
            [node]="child"
            [level]="level() + 1"
            [expandedKeys]="expandedKeys()"
            [selectedKeys]="selectedKeys()"
            [checkedKeys]="checkedKeys()"
            [checkable]="checkable()"
            [directoryMode]="directoryMode()"
            (nodeToggle)="nodeToggle.emit($event)"
            (nodeSelect)="nodeSelect.emit($event)"
            (nodeCheck)="nodeCheck.emit($event)"
          />
        }
      </div>
    }
  `,
  styleUrl: './tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismTreeNodeComponent {
  node = input.required<PrismTreeNode>();
  level = input<number>(0);
  expandedKeys = input<string[]>([]);
  selectedKeys = input<string[]>([]);
  checkedKeys = input<string[]>([]);
  checkable = input<boolean>(false);
  directoryMode = input<boolean>(false);

  nodeToggle = output<PrismTreeNode>();
  nodeSelect = output<PrismTreeNode>();
  nodeCheck = output<{ node: PrismTreeNode, checked: boolean }>();

  isExpanded = computed(() => this.expandedKeys().includes(this.node().key));
  isSelected = computed(() => this.selectedKeys().includes(this.node().key));
  isChecked = computed(() => this.checkedKeys().includes(this.node().key));

  getIconName(): string {
    const node = this.node();
    if (node.icon) return node.icon;
    if (this.directoryMode()) {
      if (node.isLeaf) return 'file-text-line';
      return this.isExpanded() ? 'folder-open-line' : 'folder-line';
    }
    return '';
  }

  onToggle(event: MouseEvent | KeyboardEvent): void {
    event.stopPropagation();
    if (this.node().disabled) return;
    this.nodeToggle.emit(this.node());
  }

  onSelect(event: MouseEvent | KeyboardEvent): void {
    event.stopPropagation();
    if (this.node().disabled) return;
    this.nodeSelect.emit(this.node());
  }

  onCheck(checked: boolean): void {
    if (this.node().disabled) return;
    this.nodeCheck.emit({ node: this.node(), checked });
  }
}
