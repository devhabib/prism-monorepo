import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrismTreeComponent } from './tree.component';
import { PrismTreeNode } from './tree.types';
import { Component, signal } from '@angular/core';

@Component({
  template: `
    <prism-tree 
      [data]="data" 
      [(expandedKeys)]="expandedKeys"
      [(selectedKeys)]="selectedKeys"
    />
  `,
  imports: [PrismTreeComponent]
})
class TestHostComponent {
  data: PrismTreeNode[] = [
    {
      key: '1',
      title: 'Parent',
      children: [{ key: '1-1', title: 'Child', isLeaf: true }]
    }
  ];
  expandedKeys = signal<string[]>([]);
  selectedKeys = signal<string[]>([]);
}

describe('PrismTreeComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, PrismTreeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render root nodes', () => {
    const treeElement = fixture.nativeElement.querySelector('.prism-tree');
    expect(treeElement).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Parent');
  });

  it('should toggle expansion when switcher is clicked', () => {
    const switcher = fixture.nativeElement.querySelector('.prism-tree-node-switcher');
    switcher.click();
    fixture.detectChanges();
    
    expect(component.expandedKeys()).toContain('1');
    expect(fixture.nativeElement.textContent).toContain('Child');

    switcher.click();
    fixture.detectChanges();
    expect(component.expandedKeys()).not.toContain('1');
  });

  it('should select node when title is clicked', () => {
    const title = fixture.nativeElement.querySelector('.prism-tree-node-title');
    title.click();
    fixture.detectChanges();
    
    expect(component.selectedKeys()).toContain('1');
  });
});
