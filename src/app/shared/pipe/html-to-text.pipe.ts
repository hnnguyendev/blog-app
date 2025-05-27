import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlToText',
  standalone: true
})
export class HtmlToTextPipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) {
      return '';
    }
    const div = document.createElement('div');
    div.innerHTML = value;
    const decodedText = div.textContent || div.innerText || '';

    return decodedText.replace(/\u00A0/g, ' ');
  }
}
