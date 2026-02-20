import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismPopoverComponent, 
  PrismPopoverTriggerDirective,
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  PrismInputComponent,
  PrismInputDirective,
  ApiTableComponent,
  PrismButtonComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-popover-demo',
  imports: [
    CommonModule, 
    PrismPopoverComponent, 
    PrismPopoverTriggerDirective,
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    PrismInputComponent,
    PrismInputDirective,
    ApiTableComponent,
    PrismButtonComponent
  ],
  templateUrl: './popover-demo.component.html',
  styleUrls: ['./popover-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverDemoComponent {
  readonly snippets = {
    basic: `
<prism-button [prismPopoverTrigger]="popover" placement="top" variant="primary">Hover Me</prism-button>
<prism-popover #popover="prismPopover" title="Title" content="This is popover content."></prism-popover>
    `.trim(),
    click: `
<prism-button [prismPopoverTrigger]="popover2" trigger="click" placement="bottom" variant="secondary">Click Me</prism-button>
<prism-popover #popover2="prismPopover" title="Title" content="This popover opens on click."></prism-popover>
    `.trim(),
    focus: `
<prism-input>
   <input prismInput placeholder="Focus me" [prismPopoverTrigger]="popover3" trigger="focus" placement="right" />
</prism-input>
<prism-popover #popover3="prismPopover" content="Focus triggers this popover"></prism-popover>
    `.trim(),
    placement: `
<!-- 12 Placments Example -->
<div style="margin-left: 70px; display: flex; gap: 8px;">
  <prism-button [prismPopoverTrigger]="topLeft" placement="topLeft">TL</prism-button>
  <prism-popover #topLeft="prismPopover" title="Title" content="Content"></prism-popover>
  <prism-button [prismPopoverTrigger]="top" placement="top">Top</prism-button>
  <prism-popover #top="prismPopover" title="Title" content="Content"></prism-popover>
  <prism-button [prismPopoverTrigger]="topRight" placement="topRight">TR</prism-button>
  <prism-popover #topRight="prismPopover" title="Title" content="Content"></prism-popover>
</div>
<!-- ... Left and Right Placements ... -->
<!-- ... Bottom Placements ... -->
    `.trim(),
    contentOnly: `
<prism-button [prismPopoverTrigger]="contentOnlyPopover" placement="top" variant="primary">Hover Me</prism-button>
<prism-popover #contentOnlyPopover="prismPopover" content="This is popover content without a title."></prism-popover>
    `.trim(),
    complex: `
<prism-button [prismPopoverTrigger]="popover4" trigger="click" placement="bottomRight" variant="primary">Complex Content</prism-button>
<prism-popover #popover4="prismPopover" [title]="titleTemplate" [content]="contentTemplate"></prism-popover>

<ng-template #titleTemplate>
  <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
    <span>Quick Settings</span>
    <a href="javascript:void(0)" (click)="popover4.hide()">Close</a>
  </div>
</ng-template>

<ng-template #contentTemplate>
  <div>
    <p>Adjust your settings below.</p>
    <prism-input>
       <input prismInput placeholder="Email" />
    </prism-input>
    <div style="margin-top: 12px; display: flex; justify-content: flex-end;">
       <prism-button variant="primary" size="sm" (click)="popover4.hide()">Save</prism-button>
    </div>
  </div>
</ng-template>
    `.trim()
  };

  readonly apiData = [
    { name: '[prismPopoverTrigger]', type: 'PrismPopoverComponent', default: '-', description: 'The popover instance to control' },
    { name: 'trigger', type: "'click' | 'hover' | 'focus'", default: "'hover'", description: 'Trigger mode' },
    { name: 'placement', type: 'PrismPopoverPlacement', default: "'top'", description: 'Position of the popover (12 options)' },
  ];

  readonly popoverApiData = [
    { name: 'title', type: 'string | TemplateRef<unknown>', default: '-', description: 'Title of the popover' },
    { name: 'content', type: 'string | TemplateRef<unknown>', default: '-', description: 'Content of the popover' },
    { name: 'visible', type: 'Signal<boolean>', default: 'false', description: 'Readonly current visibility state' },
    { name: 'show', type: '() => void', default: '-', description: 'Programmatically open popover' },
    { name: 'hide', type: '() => void', default: '-', description: 'Programmatically close popover' },
  ];
}
