import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { BaseDetailsModal } from '../../base-details-modal';
import { Package } from '../../../../models/domain/package';
import { PackagesListTabComponent } from '../../../components/packages-list-tab/packages-list-tab.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PackageService } from '../../../../services/api-services/package.service';

@Component({
  selector: 'app-package-details-modal',
  templateUrl: './package-details-modal.component.html'
})
export class PackageDetailsModalComponent extends BaseDetailsModal<Package> {
    parentComponent: PackagesListTabComponent;

    constructor(
        activeModal: NgbActiveModal,
        location: Location,
        authService: AuthenticationService,
        modalService: NgbModal,
        router: Router,
        activeRoute: ActivatedRoute,
        private toastr: ToastrService,
        private packageService: PackageService) {

        super(activeModal, location, activeRoute, router, authService, modalService);
    }

    get canBeDeleted(): boolean {
        return this.model.TicketsCount == 0;
    }

    loadPackage(id: number): void {
        this.packageService.getById(id)
            .subscribe(p => this.model = p);
    }

    onModelEdited(pack: Package): void {
        this.loadPackage(pack.Id);
        super.onModelEdited(pack);
    }

    deletePackage(): void {
        
    }
}
