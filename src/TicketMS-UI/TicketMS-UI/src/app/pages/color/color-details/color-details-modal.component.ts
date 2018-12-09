import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseModal } from '../../base-modal';
import { Color } from '../../../../models/domain/color';
import { AuthenticationService } from '../../../../services/authentication.service';

@Component({
    selector: 'app-color-details-modal',
    templateUrl: './color-details-modal.component.html'
})
export class ColorDetailsModalComponent extends BaseModal {
    @Input() color: Color = new Color();

    constructor(activeModal: NgbActiveModal,
        modalService: NgbModal,
        location: Location,
        authService: AuthenticationService,
        private router: Router,
        private activeRoute: ActivatedRoute) {

        super(activeModal, location, authService, modalService);
    }

    closeModal(): void {
        super.closeModal();
    }
}
