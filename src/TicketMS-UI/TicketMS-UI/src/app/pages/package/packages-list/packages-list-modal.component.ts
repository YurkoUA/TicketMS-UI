import { Component } from '@angular/core';
import { Package } from '../../../../models/domain/package';
import { BaseModal } from '../../base-modal';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { AuthenticationService } from '../../../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-packages-list-modal',
    templateUrl: './packages-list-modal.component.html'
})
export class PackagesListModalComponent extends BaseModal {
    packagesList: Package[] = [];
    title: string;

    constructor(activeModal: NgbActiveModal,
        modalService: NgbModal,
        location: Location,
        activeRoute: ActivatedRoute,
        router: Router,
        authService: AuthenticationService) {

        super(activeModal, location, activeRoute, router, authService, modalService);
    }
}
