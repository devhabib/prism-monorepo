import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  PrismUploadComponent, 
  PrismUploadFile,
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
  selector: 'app-upload-demo',
  imports: [
    CommonModule, 
    FormsModule,
    PrismUploadComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    ApiTableComponent
  ],
  templateUrl: './upload-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadDemoComponent {
  
  readonly basicFiles = signal<PrismUploadFile[]>([
    { uid: '1', name: 'example-document.pdf', size: 1024, type: 'application/pdf', status: 'done', url: '#' }
  ]);
  
  readonly dragFiles = signal<PrismUploadFile[]>([]);
  readonly disabledFiles = signal<PrismUploadFile[]>([]);

  readonly snippets = {
    basic: `<prism-upload [(fileList)]="files" accept=".png,.jpg,.pdf" />`,
    dragger: `<prism-upload [(fileList)]="files" listType="dragger" [multiple]="true" />`,
    disabled: `<prism-upload [(fileList)]="files" [disabled]="true" />`
  };

  readonly apiData: ApiDoc[] = [
    { name: 'accept', type: 'input<string>', default: "''", description: 'Accepted file types.' },
    { name: 'multiple', type: 'input<boolean>', default: 'false', description: 'Whether multiple files are allowed.' },
    { name: 'disabled', type: 'model<boolean>', default: 'false', description: 'Whether the upload is disabled.' },
    { name: 'maxCount', type: 'input<number>', default: '0', description: 'Maximum number of files allowed (0 means unlimited).' },
    { name: 'listType', type: "input<'text' | 'dragger'>", default: "'text'", description: 'Type of the upload interface.' },
    { name: 'fileList', type: 'model<PrismUploadFile[]>', default: '[]', description: 'The two-way bound selected files.' },
    { name: 'beforeUpload', type: 'input<Function>', default: 'undefined', description: 'Hook executed before upload. Returning false cancels.' },
    { name: 'customRequest', type: 'input<Function>', default: 'undefined', description: 'Custom upload request handler.' },
    { name: 'fileChange', type: 'output<PrismUploadFile[]>', default: '-', description: 'Emitted when file list changes.' },
    { name: 'remove', type: 'output<PrismUploadFile>', default: '-', description: 'Emitted when a file is removed.' }
  ];
}
