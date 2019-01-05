import { Component, OnInit } from '@angular/core';
import { BaseModal } from '../../base-modal';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../../services/authentication.service';
import { Package } from '../../../../models/domain/package';

@Component({
    selector: 'app-package-create-modal',
    templateUrl: './package-create-modal.component.html'
})
export class PackageCreateModalComponent extends BaseModal {
    constructor(activeModal: NgbActiveModal,
        modalService: NgbModal,
        location: Location,
        activeRoute: ActivatedRoute,
        router: Router,
        authService: AuthenticationService) {

        super(activeModal, location, activeRoute, router, authService, modalService);
    }

    onPackageCreated(pack: Package): void {
        
    }
}
