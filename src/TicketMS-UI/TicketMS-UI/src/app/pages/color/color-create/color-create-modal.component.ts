import { Component, Injector } from '@angular/core';
import { BaseModal } from '../../base-modal';
import { Color } from '../../../../models/domain/color';

@Component({
    selector: 'app-color-create-modal',
    templateUrl: './color-create-modal.component.html'
})
export class ColorCreateModalComponent extends BaseModal {

    constructor(injector: Injector) {
        super(injector);
    }

    onColorCreated(color: Color): void {
        this.closeModal(color);
    }
}
