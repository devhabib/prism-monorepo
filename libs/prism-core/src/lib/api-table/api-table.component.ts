import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ApiDoc {
  name: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'prism-api-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-table.component.html',
  styleUrl: './api-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiTableComponent {
  data = input.required<ApiDoc[]>();
}
