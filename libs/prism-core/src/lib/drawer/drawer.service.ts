import { 
  Injectable, 
  Injector, 
  createComponent, 
  EnvironmentInjector, 
  ApplicationRef, 
  Type, 
  inject 
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PrismDrawerComponent } from './drawer.component';
import { PrismDrawerConfig } from './drawer.types';
import { PrismDrawerRef } from './drawer-ref';
import { DRAWER_DATA } from './drawer.tokens';
import { PrismDialogRef } from '../dialog/dialog-ref';
import { DIALOG_DATA } from '../dialog/dialog.tokens';

/**
 * Service for programmatically opening drawers with custom components.
 */
@Injectable({ providedIn: 'root' })
export class PrismDrawerService {
  private _appRef = inject(ApplicationRef);
  private _injector = inject(EnvironmentInjector);
  private _document = inject(DOCUMENT);

  /**
   * Opens a drawer with the specified component and configuration.
   * 
   * @param component The component to display inside the drawer
   * @param config Optional configuration for the drawer
   * @returns A reference to the opened drawer
   */
  open<T, D = any, R = any>(
    component: Type<T>, 
    config: PrismDrawerConfig<D> = {}
  ): PrismDrawerRef<R> {
    // 1. Create the Drawer Container (The Shell)
    const drawerRef = createComponent(PrismDrawerComponent, {
      environmentInjector: this._injector
    });

    // 2. Setup the Drawer Inputs
    drawerRef.setInput('title', config.title || config.header || '');
    drawerRef.setInput('footer', config.footer || null);
    drawerRef.setInput('width', config.width || '300px');
    drawerRef.setInput('height', config.height || '300px');
    drawerRef.setInput('position', config.position || 'right');
    drawerRef.setInput('maskClosable', config.maskClosable ?? config.dismissableMask ?? true);
    drawerRef.setInput('closeOnEscape', config.closeOnEscape ?? true);
    drawerRef.setInput('showClose', config.showClose ?? true);
    
    // 3. Create the DrawerRef (Controller)
    const prismDrawerRef = new PrismDrawerRef<R>((result) => {
      // Cleanup logic when closed
      drawerRef.instance.visible.set(false);
      
      // Wait for exit animation before destroying
      setTimeout(() => {
        this._appRef.detachView(drawerRef.hostView);
        this._appRef.detachView(contentRef.hostView);
        drawerRef.destroy();
        contentRef.destroy();
      }, 300);
    });

    // 4. Create the User Content (The Child) with Custom Injector
    const childInjector = Injector.create({
      parent: this._injector,
      providers: [
        { provide: PrismDrawerRef, useValue: prismDrawerRef },
        { provide: DRAWER_DATA, useValue: config.data },
        // Compatibility aliases for dialog components used in drawers
        { provide: PrismDialogRef, useValue: prismDrawerRef },
        { provide: DIALOG_DATA, useValue: config.data }
      ]
    });

    const contentRef = createComponent(component, {
      environmentInjector: this._injector,
      elementInjector: childInjector
    });

    // 5. Attach to DOM
    this._document.body.appendChild(drawerRef.location.nativeElement);
    this._appRef.attachView(drawerRef.hostView);
    this._appRef.attachView(contentRef.hostView);
    
    // 6. Set drawer to visible
    drawerRef.instance.visible.set(true);
    
    // 7. Trigger change detection
    drawerRef.changeDetectorRef.detectChanges();
    
    // 8. Inject content into the drawer's content container
    const drawerContentContainer = drawerRef.location.nativeElement.querySelector('.drawer-body');
    if (drawerContentContainer) {
      drawerContentContainer.appendChild(contentRef.location.nativeElement);
      drawerRef.changeDetectorRef.detectChanges();
    } else {
      console.error('PrismDrawerService: .drawer-body container not found');
    }

    // 9. Handle Close from the Drawer Shell
    const sub = drawerRef.instance.onClose.subscribe(() => {
      prismDrawerRef.close();
      sub.unsubscribe();
    });

    return prismDrawerRef;
  }
}
