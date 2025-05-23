import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-section-block',
  standalone: true,
  imports: [PanelModule, ButtonModule],
  templateUrl: './section-block.component.html',
  styleUrl: './section-block.component.scss'
})
export class SectionBlockComponent {
  @Output() onDelete = new EventEmitter<void>();
  @Output() onDuplicate = new EventEmitter<void>();

  public onDeleteSectionBlock(): void {
    this.onDelete.emit();
  }

  public onDuplicateSectionBlock(): void {
    this.onDuplicate.emit();
  }
}
