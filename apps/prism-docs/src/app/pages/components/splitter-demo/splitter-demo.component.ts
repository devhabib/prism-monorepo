import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismSplitterComponent, 
  PrismSplitterPanelComponent,
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  ApiTableComponent,
  ApiDoc
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-splitter-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismSplitterComponent, 
    PrismSplitterPanelComponent,
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    ApiTableComponent
  ],
  templateUrl: './splitter-demo.component.html',
  styleUrls: ['./splitter-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitterDemoComponent {
  readonly snippets = {
    horizontal: `<prism-splitter style="height: 300px; border: 1px solid var(--surface-200);">
  <prism-splitter-panel size="30%">
    <div class="p-4">Left Panel (30%)</div>
  </prism-splitter-panel>
  <prism-splitter-panel>
    <div class="p-4">Right Panel (Fill)</div>
  </prism-splitter-panel>
</prism-splitter>`,
    vertical: `<prism-splitter orientation="vertical" style="height: 400px; border: 1px solid var(--surface-200);">
  <prism-splitter-panel size="100px">
    <div class="p-4">Top Panel (100px)</div>
  </prism-splitter-panel>
  <prism-splitter-panel>
    <div class="p-4">Bottom Panel (Fill)</div>
  </prism-splitter-panel>
</prism-splitter>`,
    nested: `<prism-splitter style="height: 400px; border: 1px solid var(--surface-200);">
  <prism-splitter-panel size="200px">
    <div class="p-4">Sidebar</div>
  </prism-splitter-panel>
  <prism-splitter-panel>
    <prism-splitter orientation="vertical">
      <prism-splitter-panel size="50%">
        <div class="p-4">Main - Top</div>
      </prism-splitter-panel>
      <prism-splitter-panel>
        <div class="p-4">Main - Bottom</div>
      </prism-splitter-panel>
    </prism-splitter>
  </prism-splitter-panel>
</prism-splitter>`,
    constraints: `<prism-splitter style="height: 200px; border: 1px solid var(--surface-200);">
  <prism-splitter-panel size="150px" [min]="100" [max]="300">
    <div class="p-4">Resizable (100px - 300px)</div>
  </prism-splitter-panel>
  <prism-splitter-panel>
    <div class="p-4">Flexible</div>
  </prism-splitter-panel>
</prism-splitter>`,
    handleLabels: `<prism-splitter style="height: 300px; border: 1px solid var(--surface-200);">
  <prism-splitter-panel size="40%" handleLabel="Settings">
    <div class="p-4">Panel with Labelled Handle</div>
  </prism-splitter-panel>
  <prism-splitter-panel>
    <div class="p-4">Main Content</div>
  </prism-splitter-panel>
</prism-splitter>`
  };

  readonly splitterApi: ApiDoc[] = [
    { name: 'orientation', type: `'horizontal' | 'vertical'`, default: `'horizontal'`, description: 'Layout direction of the panels.' }
  ];

  readonly panelApi: ApiDoc[] = [
    { name: 'size', type: 'number | string', default: '-', description: 'Initial size of the panel (px or %).' },
    { name: 'min', type: 'number | string', default: '0', description: 'Minimum size constraint.' },
    { name: 'max', type: 'number | string', default: '100%', description: 'Maximum size constraint.' },
    { name: 'resizable', type: 'boolean', default: 'true', description: 'Whether the panel can be resized.' },
    { name: 'collapsible', type: 'boolean', default: 'false', description: 'Whether the panel can be collapsed.' },
    { name: 'handleLabel', type: 'string', default: '-', description: 'Text label to display on the handle.' },
    { name: 'handleTemplate', type: 'TemplateRef<void>', default: '-', description: 'Custom template for the handle content.' }
  ];
}
