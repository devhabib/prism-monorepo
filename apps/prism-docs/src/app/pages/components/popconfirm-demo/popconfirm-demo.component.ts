import { Component, ChangeDetectionStrategy, TemplateRef, inject } from '@angular/core';
import { 
  PrismPopconfirmComponent, 
  PrismPopconfirmTriggerDirective,
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  PrismButtonComponent,
  ToastService,
  PrismSpaceComponent,
  ApiTableComponent
} from '@devynelogic/prism-core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popconfirm-demo',
  imports: [
    CommonModule, 
    PrismPopconfirmComponent, 
    PrismPopconfirmTriggerDirective,
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    PrismButtonComponent,
    PrismSpaceComponent,
    ApiTableComponent
  ],
  templateUrl: './popconfirm-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopconfirmDemoComponent {
  readonly snippets = {
    basic: `<prism-button [prismPopconfirmTrigger]="confirm">Delete</prism-button>
<prism-popconfirm #confirm title="Are you sure you want to delete this task?" (confirmed)="onConfirm()" (cancelled)="onCancel()">
</prism-popconfirm>`,
    placement: `<prism-space>
  <prism-button [prismPopconfirmTrigger]="confirmLeft" placement="left">Left</prism-button>
  <prism-button [prismPopconfirmTrigger]="confirmTop" placement="top">Top</prism-button>
  <prism-button [prismPopconfirmTrigger]="confirmBottom" placement="bottom">Bottom</prism-button>
  <prism-button [prismPopconfirmTrigger]="confirmRight" placement="right">Right</prism-button>
</prism-space>

<prism-popconfirm #confirmLeft title="Confirm Left?"></prism-popconfirm>
<prism-popconfirm #confirmTop title="Confirm Top?"></prism-popconfirm>
<prism-popconfirm #confirmBottom title="Confirm Bottom?"></prism-popconfirm>
<prism-popconfirm #confirmRight title="Confirm Right?"></prism-popconfirm>`,
    custom: `<prism-button [prismPopconfirmTrigger]="confirmCustom">Custom Text</prism-button>
<prism-popconfirm #confirmCustom 
  title="Change status to 'Done'?" 
  confirmText="Yes, Do it" 
  cancelText="Wait">
</prism-popconfirm>`
  };

  readonly toast = inject(ToastService);

  onConfirm(): void {
    this.toast.success('Task deleted successfully');
  }

  onCancel(): void {
    this.toast.info('Deletion cancelled');
  }

  isTemplateRef(val: unknown): val is TemplateRef<unknown> {
    return val instanceof TemplateRef;
  }

  readonly componentApiData = [
    { name: 'title', type: 'string | TemplateRef<any>', default: '-', description: 'Title of the popconfirm.' },
    { name: 'content', type: 'string | TemplateRef<any>', default: '-', description: 'Content of the popconfirm.' },
    { name: 'icon', type: 'string | TemplateRef<any>', default: '-', description: 'Custom icon name or template.' },
    { name: 'confirmText', type: 'string', default: "'OK'", description: 'Text of the confirm button.' },
    { name: 'cancelText', type: 'string', default: "'Cancel'", description: 'Text of the cancel button.' },
    { name: 'confirmButtonVariant', type: 'PrismButtonVariant', default: "'primary'", description: 'Variant of the confirm button.' },
    { name: 'cancelButtonVariant', type: 'PrismButtonVariant', default: "'default'", description: 'Variant of the cancel button.' },
    { name: 'confirmed', type: 'EventEmitter<void>', default: '-', description: 'Callback executed when confirmed.' },
    { name: 'cancelled', type: 'EventEmitter<void>', default: '-', description: 'Callback executed when cancelled.' }
  ];

  readonly directiveApiData = [
    { name: 'prismPopconfirmTrigger', type: 'PrismPopconfirmComponent', default: '-', description: 'The Popconfirm component to trigger.' },
    { name: 'placement', type: 'PrismPopoverPlacement', default: "'top'", description: 'Position of the popconfirm.' },
    { name: 'trigger', type: 'PrismPopoverTrigger', default: "'click'", description: 'Trigger mode: click, hover, focus.' }
  ];
}
