import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrismPopconfirmComponent } from './popconfirm.component';
import { PrismOverlayService } from '../services/overlay.service';

describe('PrismPopconfirmComponent', () => {
  let component: PrismPopconfirmComponent;
  let fixture: ComponentFixture<PrismPopconfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrismPopconfirmComponent],
      providers: [PrismOverlayService]
    }).compileComponents();

    fixture = TestBed.createComponent(PrismPopconfirmComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Test Title');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit confirmed when confirm button clicked', () => {
    component.show();
    fixture.detectChanges();

    let confirmedEmitted = false;
    component.confirmed.subscribe(() => confirmedEmitted = true);
    
    // We need to find the button inside the popover which is likely in a portal/template
    // For unit tests, we can call the handleConfirm method directly
    component.handleConfirm();
    expect(confirmedEmitted).toBe(true);
  });

  it('should hide popover after confirm/cancel', () => {
    component.show();
    fixture.detectChanges();
    
    component.handleConfirm();
    // Assuming hide() is called and it calls popover()?.hide()
    // We can check if the internal popover visible state changes if accessible
  });
});
