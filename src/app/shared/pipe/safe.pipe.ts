import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';

/**
 * Sanitize HTML
 */
@Pipe({
  name: 'safe',
  standalone: true
})
export class SafePipe implements PipeTransform {
  public urlRegex = /(https?:\/\/[^\s]+)/g;
  /**
   * Pipe Constructor
   *
   * @param _sanitizer: DomSanitezer
   */
  // tslint:disable-next-line
  constructor(protected _sanitizer: DomSanitizer) {}

  /**
   * Transform
   *
   * @param value: string
   * @param type: string
   */
  transform(value: string, type: string, isHyperLink?: boolean): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html':
        if (isHyperLink && !value?.includes('<img') && !value?.includes('</img>')) {
          value = this.replaceStandaloneLinks(value);
        }
        value = value?.replace(/&nbsp;/g, ' ');
        return this._sanitizer.bypassSecurityTrustHtml(value);
      case 'style':
        return this._sanitizer.bypassSecurityTrustStyle(value);
      case 'script':
        return this._sanitizer.bypassSecurityTrustScript(value);
      case 'url':
        return this._sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl':
        return this._sanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        return this._sanitizer.bypassSecurityTrustHtml(value);
    }
  }

  private replaceStandaloneLinks(input: string) {
    if (!input) {
      return '';
    }
    // Regex to match standalone URLs (not inside <a> tags), including www.*
    const regex = /\b(?:https?:\/\/|www\.)[^\s<>"]+(?![^<]*<\/a>)/gi;

    // Replace standalone URLs with anchor tags
    return input.replace(regex, (match: string) => {
      // Ensure href is complete with http:// for "www." links
      const href = match.startsWith('www.') ? `http://${match}` : match;
      return `<a href="${href}" target="_blank" class="underline">${match}</a>`;
    });
  }
}
