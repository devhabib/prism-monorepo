import { 
  Component, 
  ChangeDetectionStrategy, 
  input, 
  model, 
  signal, 
  output, 
  forwardRef, 
  ElementRef, 
  viewChild 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PrismIconComponent } from '../icon/icon.component';
import { PrismButtonComponent } from '../button/button.component';

export type UploadStatus = 'uploading' | 'done' | 'error' | 'removed';

export type PrismUploadFile = {
  uid: string;
  name: string;
  size: number;
  type: string;
  status: UploadStatus;
  percent?: number;
  url?: string;
  file?: File;
};

export type UploadRequestOption = {
  file: PrismUploadFile;
  onProgress: (percent: number) => void;
  onSuccess: (url?: string) => void;
  onError: (error: Error) => void;
};

@Component({
  selector: 'prism-upload',
  imports: [CommonModule, PrismIconComponent, PrismButtonComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrismUploadComponent),
      multi: true
    }
  ],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismUploadComponent implements ControlValueAccessor {
  readonly accept = input<string>('');
  readonly multiple = input<boolean>(false);
  readonly disabled = model<boolean>(false);
  readonly maxCount = input<number>(0); // 0 means unlimited
  readonly listType = input<'text' | 'dragger'>('text');
  
  // Hooks
  readonly beforeUpload = input<(file: File, fileList: File[]) => boolean | Promise<boolean>>();
  readonly customRequest = input<(options: UploadRequestOption) => void>();

  readonly fileList = model<PrismUploadFile[]>([]);
  
  readonly fileChange = output<PrismUploadFile[]>();
  readonly remove = output<PrismUploadFile>();

  readonly isDragOver = signal(false);

  readonly fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  private onChange: (value: PrismUploadFile[]) => void = () => { /* noop */ };
  onTouched: () => void = () => { /* noop */ };

  // Drag and Drop handlers
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (this.disabled()) return;
    this.isDragOver.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(false);
    if (this.disabled() || !event.dataTransfer?.files) return;
    
    this.handleFiles(Array.from(event.dataTransfer.files));
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(Array.from(input.files));
    }
    // reset input so same file can be selected again
    const inputEl = this.fileInput()?.nativeElement;
    if (inputEl) {
      inputEl.value = '';
    }
    this.onTouched();
  }

  openFileDialog(): void {
    if (this.disabled()) return;
    this.fileInput()?.nativeElement.click();
  }

  private async handleFiles(files: File[]): Promise<void> {
    const rawFiles = this.multiple() ? files : [files[0]];
    const max = this.maxCount();
    let currentList = [...this.fileList()];

    for (const file of rawFiles) {
      if (max > 0 && currentList.length >= max) {
        break; // Reached limit
      }

      const beforeHook = this.beforeUpload();
      let shouldUpload = true;
      if (beforeHook) {
        const result = await beforeHook(file, rawFiles);
        shouldUpload = !!result;
      }

      if (!shouldUpload) continue;

      const uploadFile: PrismUploadFile = {
        uid: Math.random().toString(36).substring(7),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        percent: 0,
        file: file
      };

      currentList = [...currentList, uploadFile];
      this.updateList(currentList);

      this.processUpload(uploadFile);
    }
  }

  private processUpload(uploadFile: PrismUploadFile): void {
    const reqHook = this.customRequest();
    
    if (reqHook) {
      reqHook({
        file: uploadFile,
        onProgress: (percent) => this.updateFileStatus(uploadFile.uid, { percent }),
        onSuccess: (url) => this.updateFileStatus(uploadFile.uid, { status: 'done', url, percent: 100 }),
        onError: () => this.updateFileStatus(uploadFile.uid, { status: 'error', percent: 0 })
      });
    } else {
      // Default behavior: just mark as done immediately (pseudo-upload)
      setTimeout(() => {
        this.updateFileStatus(uploadFile.uid, { status: 'done', percent: 100 });
      }, 500);
    }
  }

  private updateFileStatus(uid: string, updates: Partial<PrismUploadFile>): void {
    const list = this.fileList().map(f => {
      if (f.uid === uid) {
        return { ...f, ...updates };
      }
      return f;
    });
    this.updateList(list);
  }

  removeFile(file: PrismUploadFile, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    if (this.disabled()) return;
    
    const list = this.fileList().filter(f => f.uid !== file.uid);
    this.updateList(list);
    this.remove.emit(file);
  }

  private updateList(list: PrismUploadFile[]): void {
    this.fileList.set(list);
    this.fileChange.emit(list);
    this.onChange(list);
  }

  // CVA
  writeValue(value: PrismUploadFile[]): void {
    this.fileList.set(value || []);
  }

  registerOnChange(fn: (value: PrismUploadFile[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
