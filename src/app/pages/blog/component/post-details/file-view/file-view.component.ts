import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ISectionContent } from '@Shared/interface/blog/ISectionContent';
import { ISectionFile } from '@Shared/interface/blog/ISectionFile';
import { FileViewItemComponent } from '../file-view-item/file-view-item.component';

@Component({
  selector: 'app-file-view',
  imports: [FileViewItemComponent],
  templateUrl: './file-view.component.html',
  styleUrl: './file-view.component.scss'
})
export class FileViewComponent implements OnChanges {
  @Input() sectionContent!: ISectionContent;

  public sectionFiles: (ISectionFile | null)[] = [];
  public loadingMap: { [key: string]: boolean } = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sectionContent'] && this.sectionContent?.sectionFiles) {
      this.sectionFiles = this.sectionContent.sectionFiles.filter((file) => file?.mediaUrl);
    }
  }

  public downLoadFile(file: ISectionFile): void {
    const fileUrl = file?.mediaUrl;
    if (!fileUrl) {
      console.error('File URL is missing.');
      return;
    }
    this.loadingMap[fileUrl] = true;
    fetch(fileUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.name?.split('/').pop() || 'download';
        document.body.appendChild(link); // for Firefox
        link.click();
        link.remove(); // cleanup
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => {
        console.error('Error downloading file:', err);
      })
      .finally(() => {
        this.loadingMap[fileUrl] = false;
      });
  }
}
