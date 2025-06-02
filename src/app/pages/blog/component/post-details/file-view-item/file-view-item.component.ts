import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getFileNameWithExtension } from '@Shared/helper/file.helper';
import { ISectionFile } from '@Shared/interface/blog/ISectionFile';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-file-view-item',
  imports: [ButtonModule],
  templateUrl: './file-view-item.component.html',
  styleUrl: './file-view-item.component.scss'
})
export class FileViewItemComponent {
  @Input() file!: ISectionFile | null;
  @Input() loading: boolean = false;

  @Output() onDownLoadFile = new EventEmitter<any>();

  public downLoadFile(file: ISectionFile): void {
    this.onDownLoadFile.emit(file);
  }

  public getFileName(path: string): string {
    return getFileNameWithExtension(path);
  }
}
