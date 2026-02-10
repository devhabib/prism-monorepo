import { 
  Injectable, 
  Injector, 
  ComponentRef, 
  createComponent, 
  EnvironmentInjector, 
  ApplicationRef, 
  Type, 
  inject 
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PrismDialogComponent } from './dialog.component';
import { PrismDialogConfig } from './dialog.types';
import { PrismDialogRef } from './dialog-ref';
import { DIALOG_DATA } from './dialog.tokens';

/**
 * Service for programmatically opening dialogs with custom components.
 * 
 * @example
 * ```typescript
 * constructor(private dialog: PrismDialogService) {}
 * 
 * openDialog() {
 *   const ref = this.dialog.open(MyComponent, {
 *     header: 'User Profile',
 *     data: { userId: 123 },
 *     width: '600px'
 *   });
 *   
 *   ref.afterClosed$.subscribe(result => {
 *     console.log('Dialog closed with result:', result);
 *   });
 * }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class PrismDialogService {
  private _appRef = inject(ApplicationRef);
  private _injector = inject(EnvironmentInjector);
  private _document = inject(DOCUMENT);

  /**
   * Opens a dialog with the specified component and configuration.
   * 
   * @param component The component to display inside the dialog
   * @param config Optional configuration for the dialog
   * @returns A reference to the opened dialog
   */
  open<T, D = any, R = any>(
    component: Type<T>, 
    config: PrismDialogConfig<D> = {}
  ): PrismDialogRef<R> {
    // 1. Create the Dialog Container (The Shell)
    const dialogRef = createComponent(PrismDialogComponent, {
      environmentInjector: this._injector
    });

    // 2. Setup the Dialog Inputs
    dialogRef.setInput('header', config.header || '');
    dialogRef.setInput('width', config.width || '50vw');
    dialogRef.setInput('position', config.position || 'center');
    dialogRef.setInput('dismissableMask', config.dismissableMask ?? true);
    
    // 3. Create the DialogRef (Controller)
    const prismDialogRef = new PrismDialogRef<R>((result) => {
      // Cleanup logic when closed
      dialogRef.instance.visible.set(false);
      
      // Wait for exit animation before destroying
      setTimeout(() => {
        this._appRef.detachView(dialogRef.hostView);
        this._appRef.detachView(contentRef.hostView);
        dialogRef.destroy();
        contentRef.destroy();
      }, 300);
    });

    // 4. Create the User Content (The Child) with Custom Injector
    const childInjector = Injector.create({
      parent: this._injector,
      providers: [
        { provide: PrismDialogRef, useValue: prismDialogRef },
        { provide: DIALOG_DATA, useValue: config.data }
      ]
    });

    const contentRef = createComponent(component, {
      environmentInjector: this._injector,
      elementInjector: childInjector
    });

    // 5. Attach to DOM FIRST (before setting visible)
    this._document.body.appendChild(dialogRef.location.nativeElement);
    this._appRef.attachView(dialogRef.hostView);
    this._appRef.attachView(contentRef.hostView);
    
    // 6. Set dialog to visible (triggers template rendering)
    dialogRef.instance.visible.set(true);
    
    // 7. Manually trigger change detection to ensure template is rendered
    dialogRef.changeDetectorRef.detectChanges();
    
    // 8. Now inject content into the dialog's content container
    const dialogContentContainer = dialogRef.location.nativeElement.querySelector('.dialog-content');
    if (dialogContentContainer) {
      dialogContentContainer.appendChild(contentRef.location.nativeElement);
      dialogRef.changeDetectorRef.detectChanges(); // Detect after appending
    } else {
      console.error('PrismDialogService: .dialog-content container not found');
    }

    // 9. Handle Close from the Dialog Shell (clicking X or backdrop)
    const sub = dialogRef.instance.onHide.subscribe(() => {
      prismDialogRef.close();
      sub.unsubscribe();
    });

    return prismDialogRef;
  }
}
