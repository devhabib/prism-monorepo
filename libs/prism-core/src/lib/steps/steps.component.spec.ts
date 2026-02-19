import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PrismStepsComponent } from './steps.component';
import { PrismStepComponent } from './step.component';
import { PrismIconComponent } from '../icon/icon.component';
import { PrismIconRegistry } from '../icon/icon-registry.service';
import { piCheckLine, piCloseLine } from '@devynelogic/prism-icons';

@Component({
  template: `
    <prism-steps 
      [current]="current" 
      [status]="status" 
      [direction]="direction">
      <prism-step title="Step 1" description="Desc 1"></prism-step>
      <prism-step title="Step 2" description="Desc 2"></prism-step>
      <prism-step title="Step 3" description="Desc 3"></prism-step>
    </prism-steps>
  `,
  imports: [PrismStepsComponent, PrismStepComponent]
})
class TestHostComponent {
  current = 0;
  status: 'wait' | 'process' | 'finish' | 'error' = 'process';
  direction: 'horizontal' | 'vertical' = 'horizontal';

}

describe('PrismStepsComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, PrismIconComponent],
      providers: [PrismIconRegistry]
    }).compileComponents();

    const registry = TestBed.inject(PrismIconRegistry);
    registry.addIcons([piCheckLine, piCloseLine]);

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
  });

  it('should update status when global status changes', () => {
    component.current = 1;
    component.status = 'error';
    fixture.detectChanges();

    const steps = fixture.debugElement.queryAll(By.directive(PrismStepComponent));
    
    // Step 2 should inherit error status from parent
    expect(steps[1].componentInstance.status()).toBe('error');
  });

  it('should correctly mark all previous steps as finish', () => {
    component.current = 2;
    fixture.detectChanges();

    const steps = fixture.debugElement.queryAll(By.directive(PrismStepComponent));
    expect(steps[0].componentInstance.status()).toBe('finish');
    expect(steps[1].componentInstance.status()).toBe('finish');
    expect(steps[2].componentInstance.status()).toBe('process');
  });
});
