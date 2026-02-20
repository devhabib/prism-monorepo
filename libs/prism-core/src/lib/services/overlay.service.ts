import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrismOverlayService {
  private readonly _baseZIndex = 1000;
  private readonly _currentZIndex = signal(this._baseZIndex);

  nextZIndex(): number {
    this._currentZIndex.update(z => z + 1);
    return this._currentZIndex();
  }
}
