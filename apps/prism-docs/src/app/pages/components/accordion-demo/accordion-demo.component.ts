import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismAccordionComponent, 
  PrismAccordionPanelComponent,
  PrismCodeBlockComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  ApiTableComponent,
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismBadgeComponent
} from '@prism-monorepo/prism-core';

@Component({
  selector: 'prism-accordion-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismAccordionComponent, 
    PrismAccordionPanelComponent,
    PrismCodeBlockComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    ApiTableComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismBadgeComponent
  ],
  templateUrl: './accordion-demo.component.html',
  styleUrls: ['./accordion-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionDemoComponent {
  apiDocs = [
    { name: 'accordion', type: 'boolean', default: 'false', description: 'Whether to allow only one panel to be active at a time.' },
    { name: 'bordered', type: 'boolean', default: 'true', description: 'Whether to show borders around the accordion.' },
    { name: 'expandIconPosition', type: "'start' | 'end'", default: "'start'", description: 'Position of the expansion icon.' }
  ];

  basicHTML = `<prism-accordion>
  <prism-accordion-panel header="This is panel header 1">
    <p>A dog is a type of domesticated animal.</p>
  </prism-accordion-panel>
  <prism-accordion-panel header="This is panel header 2">
    <p>A dog is a type of domesticated animal.</p>
  </prism-accordion-panel>
</prism-accordion>`;

  accordionModeHTML = `<prism-accordion [accordion]="true">
  <prism-accordion-panel header="Only one panel open at a time" [active]="true">
    <p>Panel 1</p>
  </prism-accordion-panel>
  <prism-accordion-panel header="Opening this will close the first one">
    <p>Panel 2</p>
  </prism-accordion-panel>
</prism-accordion>`;

  customHeaderHTML = `<prism-accordion-panel [header]="customHeader" [extra]="extraContent">
  <p>Panel content...</p>
</prism-accordion-panel>

<ng-template #customHeader>
  <span class="flex items-center gap-2">
    <i class="ri-settings-line"></i>
    Custom Header with Template
  </span>
</ng-template>

<ng-template #extraContent>
    <prism-badge status="success" text="New" />
</ng-template>`;
}
