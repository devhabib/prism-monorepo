import { Component, ChangeDetectionStrategy, input, contentChildren, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismBreadcrumbItemComponent } from './breadcrumb-item.component';

@Component({
  selector: 'prism-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="prism-breadcrumb" aria-label="Breadcrumb">
      <ng-content></ng-content>
    </nav>
  `,
  styles: [`
    .prism-breadcrumb {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismBreadcrumbComponent {
  separator = input<string>('/');
  
  items = contentChildren(PrismBreadcrumbItemComponent);

  constructor() {
    effect(() => {
      const itemList = this.items();
      const sep = this.separator();
      
      itemList.forEach((item, index) => {
        item.isLast.set(index === itemList.length - 1);
        item.separator.set(sep);
      });
    });
  }
}
