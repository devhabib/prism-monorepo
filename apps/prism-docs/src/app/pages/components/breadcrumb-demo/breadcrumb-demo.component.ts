import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PrismBreadcrumbComponent,
  PrismBreadcrumbItemComponent,
  PrismCodeBlockComponent,
  PrismDemoPageHeaderComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  PrismIconComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-breadcrumb-demo',
  imports: [
    CommonModule,
    PrismBreadcrumbComponent,
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    PrismBreadcrumbItemComponent,
    PrismIconComponent
  ],
  templateUrl: './breadcrumb-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbDemoComponent {
  readonly snippets = {
    basic: `<prism-breadcrumb>
  <prism-breadcrumb-item>Home</prism-breadcrumb-item>
  <prism-breadcrumb-item>Components</prism-breadcrumb-item>
  <prism-breadcrumb-item>Navigation</prism-breadcrumb-item>
  <prism-breadcrumb-item>Breadcrumb</prism-breadcrumb-item>
</prism-breadcrumb>`,

    separator: `<prism-breadcrumb separator=">">
  <prism-breadcrumb-item>Home</prism-breadcrumb-item>
  <prism-breadcrumb-item>Navigation</prism-breadcrumb-item>
  <prism-breadcrumb-item>Breadcrumb</prism-breadcrumb-item>
</prism-breadcrumb>`,

    icons: `<prism-breadcrumb>
  <prism-breadcrumb-item href="/">
    <div class="flex items-center gap-1">
      <prism-icon name="home-4-line" size="14"></prism-icon>
      Home
    </div>
  </prism-breadcrumb-item>
  <prism-breadcrumb-item href="/components">Components</prism-breadcrumb-item>
  <prism-breadcrumb-item>Breadcrumb</prism-breadcrumb-item>
</prism-breadcrumb>`,

    template: `<prism-breadcrumb [separator]="customSep">
  <prism-breadcrumb-item>Home</prism-breadcrumb-item>
  <prism-breadcrumb-item>Settings</prism-breadcrumb-item>
  <prism-breadcrumb-item>Account</prism-breadcrumb-item>
</prism-breadcrumb>

<ng-template #customSep>
  <span class="text-xs opacity-50">/</span>
</ng-template>`
  };

  readonly apiProperties = [
    { name: 'separator', type: 'string | TemplateRef<void>', default: "'/'", description: 'Custom separator between items.' }
  ];

  readonly itemApiProperties = [
    { name: 'href', type: 'string', default: 'null', description: 'URL to navigate to when clicked.' },
    { name: 'target', type: 'string', default: "'_self'", description: 'Where to open the linked document.' }
  ];
}
