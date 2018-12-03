import { Directive, Output, EventEmitter, HostListener } from "@angular/core";

@Directive({
    selector: '[modalClick]'
})
export class ModalClickDirective {
    @Output('modalClick') clicked: EventEmitter<any> = new EventEmitter<any>();

    @HostListener('click', ['$event']) onClick(event: MouseEvent): void {
        event.stopPropagation();
        event.preventDefault();
        this.clicked.emit();
    }
}
