import { Injectable, signal } from '@angular/core';

export type ToastSeverity = 'success' | 'warning' | 'danger' | 'info';

export interface Toast {
  id: number;
  message: string;
  severity: ToastSeverity;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private nextId = 0;
  toasts = signal<Toast[]>([]);

  show(message: string, severity: ToastSeverity = 'info', duration: number = 3000) {
    const id = this.nextId++;
    const toast: Toast = { id, message, severity, duration };
    
    this.toasts.update(current => [...current, toast]);

    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }
  }

  success(message: string, duration?: number) {
    this.show(message, 'success', duration);
  }

  warning(message: string, duration?: number) {
    this.show(message, 'warning', duration);
  }

  danger(message: string, duration?: number) {
    this.show(message, 'danger', duration);
  }

  info(message: string, duration?: number) {
    this.show(message, 'info', duration);
  }

  remove(id: number) {
    this.toasts.update(current => current.filter(t => t.id !== id));
  }
}
