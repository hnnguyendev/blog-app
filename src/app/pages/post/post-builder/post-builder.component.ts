import { Component, ElementRef, Input, OnChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { POST_SECTION_TYPES } from '@Shared/constant/common.constants';
import { EPostSectionType } from '@Shared/enum/EPostSectionType';
import { IPost } from '@Shared/interface/IPost';
import { ISectionContent } from '@Shared/interface/ISectionContent';
import { ISectionFile } from '@Shared/interface/ISectionFile';
import * as _ from 'lodash';
import { DragDropModule } from 'primeng/dragdrop';
import { TableModule } from 'primeng/table';
import { AudioSectionComponent } from './component/audio-section/audio-section.component';
import { EmptyPostPromptComponent } from './component/empty-post-prompt/empty-post-prompt.component';
import { FileSectionComponent } from './component/file-section/file-section.component';
import { ImageSectionComponent } from './component/image-section/image-section.component';
import { SectionBlockComponent } from './component/section-block/section-block.component';
import { TextSectionComponent } from './component/text-section/text-section.component';
import { VideoSectionComponent } from './component/video-section/video-section.component';

@Component({
  selector: 'app-post-builder',
  standalone: true,
  imports: [DragDropModule, TextSectionComponent, ImageSectionComponent, VideoSectionComponent, AudioSectionComponent, FileSectionComponent, EmptyPostPromptComponent, SectionBlockComponent, ReactiveFormsModule, TableModule],
  templateUrl: './post-builder.component.html',
  styleUrl: './post-builder.component.scss',
  host: {
    class: `w-full`
  }
})
export class PostBuilderComponent implements OnChanges {
  @Input() postDetails!: IPost;

  public sectionTypes = POST_SECTION_TYPES;
  public submitted: boolean = false;
  public draggedSectionType: EPostSectionType | null = null;
  public formGroup: FormGroup;

  public get EPostSectionType(): typeof EPostSectionType {
    return EPostSectionType;
  }

  public get hasContent(): boolean {
    return this.postContentForms.controls.length > 0;
  }

  public get postContentForms() {
    return this.formGroup.get('sections') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private el: ElementRef
  ) {
    this.formGroup = this.fb.group({
      sections: this.fb.array<ISectionContent[]>([])
    });
  }

  ngOnChanges(): void {
    if (this.postDetails) {
      if (this.postDetails?.sections?.length > 0) {
        this.postDetails?.sections
          ?.sort((a: { position: number }, b: { position: number }) => a.position - b.position)
          ?.forEach((item: ISectionContent) => {
            this.postContentForms.push(this.createFormControlBySectionType(item.sectionType, item));
          });
      }

      this.formGroup.patchValue({
        ...this.postDetails
      });
    }
  }

  public getIconUrl(sectionType: EPostSectionType): string {
    return `assets/img/icon/${sectionType.toLocaleLowerCase()}-section.svg`;
  }

  /*  This is to prevent the scroll of the editor when dragging
  and to prevent the drag event from being triggered
  when dragging over the editor */
  public dragBlockStart(): void {
    const selectors = ['.ql-editor', '.p-inputtext', 'iframe'];
    const editors = this.el.nativeElement.querySelectorAll(selectors.join(', '));
    editors.forEach((editor: HTMLElement) => {
      editor.classList.add('block-scroll');
    });
  }

  public dragBlockEnd(): void {
    const selectors = ['.ql-editor', '.p-inputtext', 'iframe'];
    const editors = this.el.nativeElement.querySelectorAll(selectors.join(', '));
    editors.forEach((editor: HTMLElement) => {
      editor.classList.remove('block-scroll');
    });
  }

  public dragContentStart(sectionType: EPostSectionType): void {
    this.draggedSectionType = sectionType;
  }

  private resetNgDirty(): void {
    if (this.submitted) {
      this.submitted = false;
      setTimeout(() => {
        this.submitted = true;
      }, 0);
    }
  }

  public dropContent(): void {
    if (this.draggedSectionType) {
      this.postContentForms.push(this.createFormControlBySectionType(this.draggedSectionType));
      this.resetNgDirty();
    }
  }

  public dragContentEnd(): void {
    this.draggedSectionType = null;
    this.scrollToContentTypeIndex(this.postContentForms.length - 1);
  }

  public onAddNewSection(sectionType: EPostSectionType): void {
    this.draggedSectionType = sectionType;
    this.dropContent();
    this.scrollToContentTypeIndex(this.postContentForms.length - 1);
  }

  public onDeleteSectionBlock(index: number): void {
    this.postContentForms.removeAt(index);
  }

  public onDuplicateSectionBlock(index: number): void {
    let controlValueClone = this.postContentForms.controls[index].value;
    controlValueClone.id = null;
    const { sectionType } = controlValueClone;
    const newControl = this.createFormControlBySectionType(sectionType, controlValueClone);

    this.postContentForms.insert(index, newControl);
    this.scrollToContentTypeIndex(index + 1);
    this.resetNgDirty();
  }

  // Scroll to current Section when Create New or Duplicate Action
  private scrollToContentTypeIndex(index: number): void {
    setTimeout(() => {
      const tabItemDOM = this.el.nativeElement.querySelector(`#content-${index}`);
      tabItemDOM?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, 100);
  }

  // Create A Form Control dynamic for section block with a Type specific
  private createFormControlBySectionType(sectionType: EPostSectionType, sectionContent?: ISectionContent): FormGroup {
    const defaultData = {
      id: sectionContent?.id || null,
      heading: sectionContent?.heading || '',
      description: sectionContent?.description || '',
      mediaUrl: sectionContent?.mediaUrl || '',
      textContent: sectionContent?.textContent || '',
      photoCredit: sectionContent?.photoCredit || '',
      sectionFiles: sectionContent?.sectionFiles || [null, null, null, null]
    };

    const formControls: { [key: string]: any } = {
      [EPostSectionType.TEXT]: {
        id: new FormControl<string | null>(defaultData.id),
        textContent: new FormControl<string>(defaultData.textContent, []),
        sectionType: new FormControl<EPostSectionType>(sectionType)
      },
      [EPostSectionType.IMAGE]: {
        id: new FormControl<string | null>(defaultData.id),
        heading: new FormControl<string>(defaultData.heading),
        mediaUrl: new FormControl<string>(defaultData.mediaUrl, []),
        description: new FormControl<string>(defaultData.description),
        photoCredit: new FormControl<string>(defaultData.photoCredit),
        sectionType: new FormControl<EPostSectionType>(sectionType)
      },
      [EPostSectionType.VIDEO]: {
        id: new FormControl<string | null>(defaultData.id),
        heading: new FormControl<string>(defaultData.heading),
        mediaUrl: new FormControl<string>(defaultData.mediaUrl, []),
        description: new FormControl<string>(defaultData.description),
        sectionType: new FormControl<EPostSectionType>(sectionType)
      },
      [EPostSectionType.AUDIO]: {
        id: new FormControl<string | null>(defaultData.id),
        mediaUrl: new FormControl<string>(defaultData.mediaUrl, []),
        description: new FormControl<string>(defaultData.description),
        sectionType: new FormControl<EPostSectionType>(sectionType)
      },
      [EPostSectionType.FILE]: {
        id: new FormControl<string | null>(defaultData.id),
        sectionFiles: this.createFileFormControls(defaultData.sectionFiles),
        sectionType: new FormControl<EPostSectionType>(sectionType)
      }
    };

    return this.fb.group(formControls[sectionType] as { [key: string]: AbstractControl });
  }

  private createFormControl(value: string | null | undefined, enabled: boolean, required: boolean = false, requiredMessage?: string): FormControl {
    const control = new FormControl({ value: value || null, disabled: !enabled });

    if (required) {
      control.setValidators(Validators.required);
    }

    return control;
  }

  private createFileFormControls(files: ISectionFile[] | null[]): FormArray {
    const hasFileInList = files.some((item) => !_.isNil(item?.mediaUrl));
    const fileFormGroups = files.slice(0, 4).map((file, index) => {
      const isFileUploaded = !_.isNil(file?.mediaUrl);
      const isRequired = isFileUploaded || (!hasFileInList && index === 0);

      return this.fb.group({
        name: this.createFormControl(file?.name, isFileUploaded, isRequired, 'Name required'),
        mediaUrl: this.createFormControl(file?.mediaUrl, true, isRequired, 'File required'),
        description: this.createFormControl(file?.description, isFileUploaded),
        position: [index + 1]
      });
    });

    return this.fb.array(fileFormGroups);
  }
}
