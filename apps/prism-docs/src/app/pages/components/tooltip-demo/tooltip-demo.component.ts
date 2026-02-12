import { Component, signal, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismTooltipDirective, 
  PrismButtonComponent,
  PrismCodeBlockComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  ApiTableComponent
} from '@prism-monorepo/prism-core';

@Component({
  selector: 'prism-tooltip-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismTooltipDirective, 
    PrismButtonComponent,
    PrismCodeBlockComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    ApiTableComponent
  ],
  templateUrl: './tooltip-demo.component.html',
  styleUrls: ['./tooltip-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipDemoComponent {
  apiDocs = [
    { name: 'prismTooltip', type: 'string | TemplateRef', default: '-', description: 'The content to display in the tooltip.' },
    { name: 'tooltipPosition', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Preferred position of the tooltip.' },
    { name: 'tooltipTrigger', type: "'hover' | 'focus' | 'click'", default: "'hover'", description: 'Trigger type.' }
  ];

  basicHTML = `<prism-button 
  prismTooltip="Prompt Text"
  label="Hover me"
/>`;

  positionHTML = `<prism-button prismTooltip="Top" tooltipPosition="top" label="Top" />
<prism-button prismTooltip="Bottom" tooltipPosition="bottom" label="Bottom" />
<prism-button prismTooltip="Left" tooltipPosition="left" label="Left" />
<prism-button prismTooltip="Right" tooltipPosition="right" label="Right" />`;

  templateHTML = `<prism-button variant="secondary" [prismTooltip]="customTpl" label="Complex Content" />

<ng-template #customTpl>
  <div class="flex items-center gap-2">
    <i class="ri-information-line"></i>
    <span>Supports <b>Templates</b> too!</span>
  </div>
</ng-template>`;
}
