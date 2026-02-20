import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PrismUploadComponent, PrismUploadFile } from './upload.component';
import { FormsModule } from '@angular/forms';

@Component({
  template: `
    <prism-upload 
      [(fileList)]="fileList"
      [listType]="listType()"
      [multiple]="multiple()"
      [disabled]="disabled()"
    />
  `,
  imports: [PrismUploadComponent, FormsModule]
})
class TestHostComponent {
  fileList = signal<PrismUploadFile[]>([]);
  listType = signal<'text'|'dragger'>('text');
  multiple = signal(false);
  disabled = signal(false);
}

describe('PrismUploadComponent', () => {
  let host: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let component: PrismUploadComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(PrismUploadComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render standard button trigger', () => {
    const triggerBtn = fixture.debugElement.query(By.css('prism-button'));
    expect(triggerBtn).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.prism-upload__trigger.is-dragger'))).toBeFalsy();
  });

  it('should render dragger when listType="dragger"', () => {
    host.listType.set('dragger');
    fixture.detectChanges();

    const dragger = fixture.debugElement.query(By.css('.prism-upload__trigger.is-dragger'));
    expect(dragger).toBeTruthy();
    expect(fixture.debugElement.query(By.css('prism-button'))).toBeFalsy();
  });

  it('should toggle dragover class on drag events', () => {
    host.listType.set('dragger');
    fixture.detectChanges();

    const dragger = fixture.debugElement.query(By.css('.prism-upload__trigger.is-dragger'));
    
    // Simulate dragover
    dragger.nativeElement.dispatchEvent(new Event('dragover'));
    fixture.detectChanges();
    expect(component.isDragOver()).toBe(true);

    // Simulate dragleave
    dragger.nativeElement.dispatchEvent(new Event('dragleave'));
    fixture.detectChanges();
    expect(component.isDragOver()).toBe(false);
  });

  it('should remove file', () => {
    const testFile: PrismUploadFile = {
      uid: '123',
      name: 'test.png',
      size: 1024,
      type: 'image/png',
      status: 'done'
    };
    
    host.fileList.set([testFile]);
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('.prism-upload__file-item')).length).toBe(1);

    const removeBtn = fixture.debugElement.query(By.css('.prism-upload__remove-btn'));
    removeBtn.nativeElement.click();
    fixture.detectChanges();

    expect(host.fileList().length).toBe(0);
  });
});
