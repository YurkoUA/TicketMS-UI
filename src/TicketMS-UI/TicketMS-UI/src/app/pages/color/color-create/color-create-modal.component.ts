import { Component } from '@angular/core';
import { BaseModal } from '../../base-modal';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../../../services/authentication.service';
import { Location } from '@angular/common';
import { Color } from '../../../../models/domain/color';

@Component({
    selector: 'app-color-create-modal',
    templateUrl: './color-create-modal.component.html'
})
export class ColorCreateModalComponent extends BaseModal {

    constructor(activeModal: NgbActiveModal,
        modalService: NgbModal,
        location: Location,
        authService: AuthenticationService) {
        super(activeModal, location, authService, modalService);
    }

    onColorCreated(color: Color): void {
        this.closeModal(color);
    }
}
