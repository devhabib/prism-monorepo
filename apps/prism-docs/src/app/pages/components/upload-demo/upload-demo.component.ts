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
  PrismTabComponent
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
    PrismTabComponent
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
}
