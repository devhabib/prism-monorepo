import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismPaginatorComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-paginator-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismPaginatorComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './paginator-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorDemoComponent {
  readonly snippets = {
    usage: `<prism-paginator [totalRecords]="100" [rows]="10"></prism-paginator>`
  };
}
