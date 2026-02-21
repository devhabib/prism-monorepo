import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrismProgressComponent } from './progress.component';

describe('PrismProgressComponent', () => {
  let component: PrismProgressComponent;
  let fixture: ComponentFixture<PrismProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrismProgressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrismProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clamp percentage between 0 and 100', () => {
    fixture.componentRef.setInput('percent', -10);
    fixture.detectChanges();
    expect(component.clampedPercent()).toBe(0);

    fixture.componentRef.setInput('percent', 110);
    fixture.detectChanges();
    expect(component.clampedPercent()).toBe(100);
  });

  it('should display success status when percent is 100', () => {
    fixture.componentRef.setInput('percent', 100);
    fixture.detectChanges();
    expect(component.resolvedStatus()).toBe('success');
  });

  it('should render circular progress path correctly', () => {
    fixture.componentRef.setInput('type', 'circle');
    fixture.componentRef.setInput('percent', 50);
    fixture.detectChanges();
    
    const path = fixture.nativeElement.querySelector('.prism-progress__circle-path');
    const dashArray = path.getAttribute('stroke-dasharray');
    const dashOffset = path.getAttribute('stroke-dashoffset');
    
    expect(parseFloat(dashOffset)).toBeCloseTo(parseFloat(dashArray) / 2, 1);
  });

  it('should show/hide info based on showInfo input', () => {
    fixture.componentRef.setInput('showInfo', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.prism-progress__text')).toBeFalsy();
  });
});
