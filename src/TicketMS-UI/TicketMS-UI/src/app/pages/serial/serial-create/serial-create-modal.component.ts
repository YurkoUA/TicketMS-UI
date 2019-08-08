import { Component, Injector } from '@angular/core';
import { BaseModal } from '../../base-modal';
import { Serial } from '../../../../models/domain/serial';

@Component({
    selector: 'app-serial-create',
    templateUrl: './serial-create-modal.component.html'
})
export class SerialCreateModalComponent extends BaseModal {
    constructor(injector: Injector) {
        super(injector);
    }

    onSerialCreated(serial: Serial): void {
        this.closeModal(serial);
    }
}
