import { Component } from '@angular/core';
import { BaseModal } from '../../base-modal';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../../../services/authentication.service';
import { Location } from '@angular/common';
import { Color } from '../../../../models/domain/color';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-color-create-modal',
    templateUrl: './color-create-modal.component.html'
})
export class ColorCreateModalComponent extends BaseModal {

    constructor(activeModal: NgbActiveModal,
        modalService: NgbModal,
        location: Location,
        activeRoute: ActivatedRoute,
        router: Router,
        authService: AuthenticationService) {
        
        super(activeModal, location, activeRoute, router, authService, modalService);
    }

    onColorCreated(color: Color): void {
        this.closeModal(color);
    }
}
