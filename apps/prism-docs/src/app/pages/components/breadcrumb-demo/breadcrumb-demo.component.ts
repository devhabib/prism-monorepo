import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismBreadcrumbComponent,
  PrismBreadcrumbItemComponent,
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-breadcrumb-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismBreadcrumbComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    PrismBreadcrumbItemComponent
  ],
  templateUrl: './breadcrumb-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbDemoComponent {
  readonly snippets = {
    usage: `<prism-breadcrumb>
  <prism-breadcrumb-item>Home</prism-breadcrumb-item>
  <prism-breadcrumb-item>Components</prism-breadcrumb-item>
  <prism-breadcrumb-item>Navigation</prism-breadcrumb-item>
  <prism-breadcrumb-item>Breadcrumb</prism-breadcrumb-item>
</prism-breadcrumb>`,
    separator: `<prism-breadcrumb separator=">">
  <prism-breadcrumb-item>Home</prism-breadcrumb-item>
  <prism-breadcrumb-item>Navigation</prism-breadcrumb-item>
</prism-breadcrumb>`
  };
}
