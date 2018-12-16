import { Component, OnInit, Input } from '@angular/core';
import { SerialService } from '../../../../services/api-services/serial.service';
import { Serial } from '../../../../models/domain/serial';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../../../services/authentication.service';
import { IConfirmOptions } from '../../../../models/interfaces/confirm-options.interface';
import { SeriesListPageComponent } from '../series-list/series-list-page.component';
import { ToastrService } from 'ngx-toastr';
import { PackagesListModalComponent } from '../../package/packages-list/packages-list-modal.component';
import { PackageService } from '../../../../services/api-services/package.service';
import { BaseDetailsModal } from '../../base-details-modal';

@Component({
    selector: 'app-serial-details-modal',
    templateUrl: './serial-details-modal.component.html'
})
export class SerialDetailsModalComponent extends BaseDetailsModal<Serial> {
    parentComponent: SeriesListPageComponent;

    constructor(
        activeModal: NgbActiveModal,
        location: Location,
        authService: AuthenticationService,
        modalService: NgbModal,
        router: Router,
        activeRoute: ActivatedRoute,
        private serialService: SerialService,
        private toastr: ToastrService,
        private packageService: PackageService) {

        super(activeModal, location, activeRoute, router, authService, modalService);
    }

    get canBeDeleted(): boolean {
        return this.model.PackagesCount == 0
            && this.model.TicketsCount == 0;
    }

    deleteSerial(): void {
        let confirm: IConfirmOptions = {
            message: `Ви дійсно хочете видалити серію "${this.model.Name}"?`,
            title: `Видалення серії "${this.model.Name}"`,
            yes: 'Видалити',
            no: 'Скасувати',
            onConfirm: () => {
                this.serialService.deleteSerial(this.model.Id)
                    .subscribe(isOk => {
                        this.parentComponent.seriesList.remove(this.model);

                        this.toastr.success(`Серію "${this.model.Name}" успішно видалено!`);
                        this.closeModal();
                    });
            }
        };
        this.confirm(confirm);
    }

    openPackagesModal(): void {
        this.packageService.getBySerial(this.model.Id)
            .subscribe(packages => {
                this.openModal(PackagesListModalComponent, {
                    size: 'lg',
                    onLoad: (component: PackagesListModalComponent) => {
                        component.title = `Пачки за серією "${this.model.Name}"`;
                        component.packagesList = packages;
                    }
                });
            });
    }
}
