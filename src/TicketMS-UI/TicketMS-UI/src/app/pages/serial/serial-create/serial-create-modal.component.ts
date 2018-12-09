import { Component } from '@angular/core';
import { BaseModal } from '../../base-modal';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { AuthenticationService } from '../../../../services/authentication.service';
import { Serial } from '../../../../models/domain/serial';

@Component({
    selector: 'app-serial-create',
    templateUrl: './serial-create-modal.component.html'
})
export class SerialCreateModalComponent extends BaseModal {
    constructor(activeModal: NgbActiveModal,
        modalService: NgbModal,
        location: Location,
        authService: AuthenticationService) {
        super(activeModal, location, authService, modalService);
    }

    onSerialCreated(serial: Serial): void {
        this.closeModal(serial);
    }
}
