import { Injectable } from "@angular/core";

declare var $;

@Injectable()
export class UiUtilService {
    setContainer(): void {
        $('main').removeClass('container-fluid');
        $('main').addClass('container');
    }

    setContainerFluid(): void {
        $('main').removeClass('container');
        $('main').addClass('container-fluid');
    }
}