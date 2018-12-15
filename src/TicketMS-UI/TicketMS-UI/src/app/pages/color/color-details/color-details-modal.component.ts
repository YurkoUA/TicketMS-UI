import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Color } from '../../../../models/domain/color';
import { AuthenticationService } from '../../../../services/authentication.service';
import { ColorsListPageComponent } from '../colors-list/colors-list-page.component';
import { BaseDetailsModal } from '../../base-details-modal';

@Component({
    selector: 'app-color-details-modal',
    templateUrl: './color-details-modal.component.html'
})
export class ColorDetailsModalComponent extends BaseDetailsModal<Color> {
    parentComponent: ColorsListPageComponent;

    constructor(activeModal: NgbActiveModal,
        modalService: NgbModal,
        location: Location,
        authService: AuthenticationService,
        private router: Router,
        private activeRoute: ActivatedRoute) {

        super(activeModal, location, authService, modalService);
    }

    get canBeDeleted(): boolean {
        return this.model.PackagesCount == 0
            && this.model.TicketsCount == 0;
    }

    deleteColor(): void {

    }

    openPackagesModal(): void {

    }
}
