import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismAnchorComponent, 
  PrismAnchorLinkComponent,
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-anchor-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismAnchorComponent, 
    PrismAnchorLinkComponent,
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './anchor-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnchorDemoComponent {
  readonly snippets = {
    basic: `<div class="grid grid-cols-12 gap-8">
  <div class="col-span-9">
    <div id="part-1">...</div>
    <div id="part-2">...</div>
  </div>
  <div class="col-span-3">
    <prism-anchor>
      <prism-link href="#part-1" title="Part 1" />
      <prism-link href="#part-2" title="Part 2" />
    </prism-anchor>
  </div>
</div>`,
    
    container: `<div id="scroll-area" style="height: 400px; overflow-y: auto;">
  <div id="part-1">...</div>
</div>
<prism-anchor container="#scroll-area">
  <prism-link href="#part-1" title="Part 1" />
</prism-anchor>`
  };

  readonly apiProperties = [
    { name: 'container', type: 'string | HTMLElement | Window', default: 'window', description: 'The scrollable container.' },
    { name: 'offsetTop', type: 'number', default: '0', description: 'Offset from the top when calculating active anchor.' },
    { name: 'targetOffset', type: 'number', default: '0', description: 'Offset from the top when scrolling to target.' }
  ];

  readonly linkApiProperties = [
    { name: 'href', type: 'string', default: 'null', description: 'The target ID to scroll to.' },
    { name: 'title', type: 'string | TemplateRef<void>', default: 'null', description: 'The display title of the link.' }
  ];
}
