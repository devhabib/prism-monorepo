import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrismStatisticComponent } from './statistic.component';
import { By } from '@angular/platform-browser';

describe('PrismStatisticComponent', () => {
  let component: PrismStatisticComponent;
  let fixture: ComponentFixture<PrismStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrismStatisticComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrismStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and string value', () => {
    fixture.componentRef.setInput('title', 'Active Users');
    fixture.componentRef.setInput('value', '112,893');
    fixture.detectChanges();
    
    const titleEl = fixture.debugElement.query(By.css('.prism-statistic-title'));
    expect(titleEl.nativeElement.textContent.trim()).toBe('Active Users');
    
    const valueEl = fixture.debugElement.query(By.css('.prism-statistic-content-value'));
    expect(valueEl.nativeElement.textContent.trim()).toBe('112,893');
  });

  it('should render number with precision', () => {
    fixture.componentRef.setInput('value', 112893.1234);
    fixture.componentRef.setInput('precision', 2);
    fixture.detectChanges();
    
    const valueEl = fixture.debugElement.query(By.css('.prism-statistic-content-value'));
    expect(valueEl.nativeElement.textContent).toContain('112,893.12');
  });
  
  it('should render prefix and suffix', () => {
    fixture.componentRef.setInput('value', 100);
    fixture.componentRef.setInput('prefix', '$');
    fixture.componentRef.setInput('suffix', 'USD');
    fixture.detectChanges();
    
    const prefixEl = fixture.debugElement.query(By.css('.prism-statistic-content-prefix'));
    expect(prefixEl.nativeElement.textContent.trim()).toBe('$');
    
    const suffixEl = fixture.debugElement.query(By.css('.prism-statistic-content-suffix'));
    expect(suffixEl.nativeElement.textContent.trim()).toBe('USD');
  });
});
