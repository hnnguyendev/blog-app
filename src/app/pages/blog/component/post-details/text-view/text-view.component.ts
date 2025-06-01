import { Component, Input } from '@angular/core';
import { SafePipe } from '@Shared/pipe/safe.pipe';

@Component({
  selector: 'app-text-view',
  standalone: true,
  imports: [SafePipe],
  templateUrl: './text-view.component.html',
  styleUrl: './text-view.component.scss'
})
export class TextViewComponent {
  @Input() textContent!: string;
}
