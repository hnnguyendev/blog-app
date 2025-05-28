import { Component, EventEmitter, Input, Output } from '@angular/core';
import { POST_SECTION_TYPES } from '@Shared/constant/common.constants';
import { EPostSectionType } from '@Shared/enum/EPostSectionType';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-empty-post-prompt',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  templateUrl: './empty-post-prompt.component.html',
  styleUrl: './empty-post-prompt.component.scss'
})
export class EmptyPostPromptComponent {
  @Input() showEmptyHeader: boolean = true;
  @Output() onAddNewSection = new EventEmitter<EPostSectionType>();

  public dialogConfigs = {
    modal: true,
    draggable: false,
    showEffect: 'fade',
    style: {},
    breakpoints: { '768px': '90vw' }
  };
  public sectionTypes = POST_SECTION_TYPES;
  public isToggleSelectSection = false;

  public getIconUrl(sectionType: EPostSectionType): string {
    return `assets/img/icon/${sectionType.toLocaleLowerCase()}-section.svg`;
  }

  public toggleAddSectionBlock(): void {
    this.isToggleSelectSection = !this.isToggleSelectSection;
  }

  public onSelectSection(sectionType: EPostSectionType): void {
    this.onAddNewSection.emit(sectionType);
    this.isToggleSelectSection = false;
  }
}
