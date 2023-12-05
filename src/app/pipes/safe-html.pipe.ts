import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(htmlWithStyles: string): SafeHtml {
    // Reemplaza 'x-small' por 'medium' en las clases
    const modifiedHtml = htmlWithStyles.replace(/medium/g, 'x-small');

    return this.sanitizer.bypassSecurityTrustHtml(modifiedHtml);
  }

  
}
