import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PrismPopoverComponent, PrismPopoverTriggerDirective } from './popover.component';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <button id="trigger" [prismPopoverTrigger]="popover" trigger="click" placement="bottom">Click me</button>
    <prism-popover #popover="prismPopover" title="Test Title" content="Test Content"></prism-popover>
    
    <div id="outside">Outside Element</div>
  `,
  imports: [PrismPopoverComponent, PrismPopoverTriggerDirective]
})
class TestHostComponent {
  @ViewChild('popover') popover!: PrismPopoverComponent;
}

describe('PrismPopoverComponent', () => {
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
    document.body.querySelectorAll('prism-popover').forEach(el => el.remove());
  });

  it('should create and initially be hidden', () => {
    expect(component).toBeTruthy();
    expect(component.popover.visible()).toBe(false);
  });

  it('should open on click trigger', () => {
    const trigger = fixture.debugElement.query(By.css('#trigger')).nativeElement;
    trigger.click();
    fixture.detectChanges();
    
    expect(component.popover.visible()).toBe(true);
  });

  it('should close on outside click when open', () => {
    const trigger = fixture.debugElement.query(By.css('#trigger')).nativeElement;
    const outside = fixture.debugElement.query(By.css('#outside')).nativeElement;
    
    // Open
    trigger.click();
    fixture.detectChanges();
    expect(component.popover.visible()).toBe(true);
    
    // Click outside
    document.body.click(); // simulate outside click since document listener listens on document
    // Wait for the document listener to process
    fixture.detectChanges();
    
    expect(component.popover.visible()).toBe(false);
  });
});
