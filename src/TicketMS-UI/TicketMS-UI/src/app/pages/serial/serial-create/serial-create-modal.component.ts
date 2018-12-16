import { Component } from '@angular/core';
import { BaseModal } from '../../base-modal';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { AuthenticationService } from '../../../../services/authentication.service';
import { Serial } from '../../../../models/domain/serial';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-serial-create',
    templateUrl: './serial-create-modal.component.html'
})
export class SerialCreateModalComponent extends BaseModal {
    constructor(activeModal: NgbActiveModal,
        modalService: NgbModal,
        location: Location,
        activeRoute: ActivatedRoute,
        router: Router,
        authService: AuthenticationService) {
        super(activeModal, location, activeRoute, router, authService, modalService);
    }

    onSerialCreated(serial: Serial): void {
        this.closeModal(serial);
    }
}
