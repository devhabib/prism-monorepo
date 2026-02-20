import { 
  Component, 
  ChangeDetectionStrategy, 
  input, 
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-list-item-meta',
  imports: [CommonModule],
  template: `
    @if (avatar()) {
      <div class="prism-list-item-meta-avatar">
         @if (isString(avatar())) {
            <img [src]="avatar()" alt="avatar" />
         } @else {
            <ng-container *ngTemplateOutlet="$any(avatar())"></ng-container>
         }
      </div>
    }
    <div class="prism-list-item-meta-content">
       @if (title()) {
         <h4 class="prism-list-item-meta-title">
            @if (isString(title())) {
              {{ title() }}
            } @else {
              <ng-container *ngTemplateOutlet="$any(title())"></ng-container>
            }
         </h4>
       }
       @if (description()) {
         <div class="prism-list-item-meta-description">
            @if (isString(description())) {
              {{ description() }}
            } @else {
              <ng-container *ngTemplateOutlet="$any(description())"></ng-container>
            }
         </div>
       }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'prism-list-item-meta'
  }
})
export class PrismListItemMetaComponent {
  readonly avatar = input<string | TemplateRef<unknown>>();
  readonly title = input<string | TemplateRef<unknown>>();
  readonly description = input<string | TemplateRef<unknown>>();

  isString(val: unknown): val is string {
    return typeof val === 'string';
  }
}

@Component({
  selector: 'prism-list-item',
  imports: [CommonModule],
  template: `
    <div class="prism-list-item-main">
       <ng-content></ng-content>
    </div>
    @if (extra()) {
       <div class="prism-list-item-extra">
          @if (isString(extra())) {
             {{ extra() }}
          } @else {
             <ng-container *ngTemplateOutlet="$any(extra())"></ng-container>
          }
       </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'prism-list-item'
  }
})
export class PrismListItemComponent {
  readonly extra = input<string | TemplateRef<unknown>>();

  isString(val: unknown): val is string {
    return typeof val === 'string';
  }
}

@Component({
  selector: 'prism-list',
  imports: [CommonModule],
  template: `
    @if (header()) {
      <div class="prism-list-header">
         @if (isString(header())) {
           {{ header() }}
         } @else {
           <ng-container *ngTemplateOutlet="$any(header())"></ng-container>
         }
      </div>
    }
    <div class="prism-list-body">
       @if (dataSource() && dataSource()!.length > 0) {
          @if (grid()) {
            <div class="prism-list-grid" [style.grid-template-columns]="getGridColumns()">
               @for (item of dataSource(); track $index) {
                 <div class="prism-list-grid-item">
                    <ng-container *ngTemplateOutlet="$any(itemTemplate()); context: { $implicit: item, index: $index }"></ng-container>
                 </div>
               }
            </div>
          } @else {
            @for (item of dataSource(); track $index) {
               <ng-container *ngTemplateOutlet="$any(itemTemplate()); context: { $implicit: item, index: $index }"></ng-container>
            }
          }
       } @else if (dataSource()) {
          <div class="prism-list-empty">
            <ng-content select="[empty]"></ng-content>
          </div>
       } @else {
          <!-- Static children if no dataSource -->
          @if (grid()) {
             <div class="prism-list-grid" [style.grid-template-columns]="getGridColumns()">
               <ng-content></ng-content>
             </div>
          } @else {
             <ng-content></ng-content>
          }
       }
    </div>
    @if (footer()) {
      <div class="prism-list-footer">
         @if (isString(footer())) {
           {{ footer() }}
         } @else {
           <ng-container *ngTemplateOutlet="$any(footer())"></ng-container>
         }
      </div>
    }
    @if (loadMore()) {
      <div class="prism-list-load-more">
         @if (isString(loadMore())) {
           {{ loadMore() }}
         } @else {
           <ng-container *ngTemplateOutlet="$any(loadMore())"></ng-container>
         }
      </div>
    }
  `,
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'prism-list',
    '[class.prism-list-bordered]': 'bordered()',
    '[class.prism-list-split]': 'split()'
  }
})
export class PrismListComponent {
  readonly header = input<string | TemplateRef<unknown>>();
  readonly footer = input<string | TemplateRef<unknown>>();
  readonly loadMore = input<string | TemplateRef<unknown>>();
  
  readonly dataSource = input<unknown[]>();
  readonly itemTemplate = input<TemplateRef<unknown>>(); // Template for @for block
  
  readonly bordered = input<boolean>(false);
  readonly split = input<boolean>(true);
  
  // Grid mode -> allows a custom grid config like { gutter: 16, column: 3 }
  readonly grid = input<{ gutter?: number, column?: number } | null>(null);

  isString(val: unknown): val is string {
    return typeof val === 'string';
  }

  getGridColumns(): string {
     const g = this.grid();
     if (!g) return '';
     const cols = g.column || 1;
     return `repeat(${cols}, minmax(0, 1fr))`;
  }
}
