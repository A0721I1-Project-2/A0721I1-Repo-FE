import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml, SafeResourceUrl } from "@angular/platform-browser";

@Pipe({
    name: 'safe'
})
export class SafePipe implements PipeTransform {
    
    constructor(
        private _sanitizer: DomSanitizer
    ) {}

    transform(value: any, arg: string): SafeResourceUrl | SafeHtml {
        
        if (arg === 'resourceUrl') {
            return this._sanitizer.bypassSecurityTrustResourceUrl(value);
        }
        return this._sanitizer.bypassSecurityTrustHtml(value);
    }

}