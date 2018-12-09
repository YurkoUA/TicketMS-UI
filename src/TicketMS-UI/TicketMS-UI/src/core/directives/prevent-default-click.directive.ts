import { Directive, HostListener } from "@angular/core";

@Directive({
    selector: '[preventDefaultClick]'
})
export class PreventDefaultClickDirective {
    @HostListener('click', ['$event']) onClick(event: MouseEvent): void {
        event.stopPropagation();
        event.preventDefault();
    }
}
