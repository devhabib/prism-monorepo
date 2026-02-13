import { Subject } from 'rxjs';

/**
 * Reference to a drawer opened via the PrismDrawerService.
 * Provides methods to close the drawer and observe the result.
 */
export class PrismDrawerRef<R = unknown> {
  private readonly _afterClosed = new Subject<R | undefined>();
  
  /**
   * Observable that emits when the drawer is closed.
   * Emits the result passed to close(), or undefined if closed without a result.
   */
  public afterClosed$ = this._afterClosed.asObservable();

  constructor(private closeCallback: (result?: R) => void) {}

  /**
   * Closes the drawer and optionally returns a result.
   * @param result Optional result to pass to subscribers of afterClosed$
   */
  close(result?: R): void {
    this._afterClosed.next(result);
    this._afterClosed.complete();
    this.closeCallback(result);
  }
}
