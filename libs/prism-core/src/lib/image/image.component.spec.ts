import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PrismImageComponent } from './image.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  template: `
    <prism-image id="img1" src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" alt="Test Image"></prism-image>
  `,
  imports: [PrismImageComponent]
})
class TestHostComponent {}

describe('PrismImageComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Cleanup any moved elements in body
    document.body.querySelectorAll('prism-image-preview').forEach(el => el.remove());
  });

  it('should create image component', () => {
    expect(component).toBeTruthy();
    const imgWrapper = fixture.debugElement.query(By.css('.prism-image-wrapper'));
    expect(imgWrapper).toBeTruthy();
    
    const imgEl = imgWrapper.query(By.css('img'));
    expect(imgEl).toBeTruthy();
    // src attribute is modified by ngSrc, but we know it's there
  });

  it('should handle load event', () => {
    const imgEl = fixture.debugElement.query(By.css('img'));
    
    // initially loading
    let placeholder = fixture.debugElement.query(By.css('.prism-image-placeholder'));
    expect(placeholder).toBeTruthy();
    
    imgEl.triggerEventHandler('load', null);
    fixture.detectChanges();
    
    placeholder = fixture.debugElement.query(By.css('.prism-image-placeholder'));
    expect(placeholder).toBeFalsy();
  });

  it('should open preview on click if loaded successfully', () => {
    const imgEl = fixture.debugElement.query(By.css('img'));
    imgEl.triggerEventHandler('load', null);
    fixture.detectChanges();
    
    const previewMask = fixture.debugElement.query(By.css('.prism-image-mask'));
    expect(previewMask).toBeTruthy();
    
    previewMask.triggerEventHandler('click', null);
    fixture.detectChanges();
    
    const previewModal = document.querySelector('prism-image-preview');
    expect(previewModal).toBeTruthy();
  });
});
