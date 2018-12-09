import { Component, OnInit, Input } from '@angular/core';
import { SerialService } from '../../../../services/api-services/serial.service';
import { Serial } from '../../../../models/domain/serial';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { BaseModal } from '../../base-modal';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../../../services/authentication.service';
import { IConfirmOptions } from '../../../../models/interfaces/confirm-options.interface';
import { SeriesListPageComponent } from '../series-list/series-list-page.component';
import { ToastrService } from 'ngx-toastr';
import { PackagesListModalComponent } from '../../package/packages-list/packages-list-modal.component';
import { PackageService } from '../../../../services/api-services/package.service';

@Component({
    selector: 'app-serial-details-modal',
    templateUrl: './serial-details-modal.component.html'
})
export class SerialDetailsModalComponent extends BaseModal {
    @Input() serial: Serial = new Serial();
    @Input() parentComponent: SeriesListPageComponent;

    isEditMode: boolean = false;

    constructor(
        activeModal: NgbActiveModal,
        location: Location,
        authService: AuthenticationService,
        modalService: NgbModal,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private serialService: SerialService,
        private toastr: ToastrService,
        private packageService: PackageService) {

        super(activeModal, location, authService, modalService);
    }

    get canBeDeleted(): boolean {
        return this.serial.PackagesCount == 0
            && this.serial.TicketsCount == 0;
    }

    closeModal(): void {
        super.closeModal(this.serial);
    }

    onSerialEdited(serial: Serial): void {
        this.serial = serial;
        this.onCancelled();
    }

    enableEditing(): void {
        this.isEditMode = true;
    }

    onCancelled(): void {
        this.isEditMode = false;
    }

    deleteSerial(): void {
        let confirm: IConfirmOptions = {
            message: `Ви дійсно хочете видалити серію "${this.serial.Name}"?`,
            title: `Видалення серії "${this.serial.Name}"`,
            yes: 'Видалити',
            no: 'Скасувати',
            onConfirm: () => {
                this.serialService.deleteSerial(this.serial.Id)
                    .subscribe(isOk => {
                        this.parentComponent.seriesList.remove(this.serial);

                        this.toastr.success(`Серію "${this.serial.Name}" успішно видалено!`);
                        this.closeModal();
                    });
            }
        };
        this.confirm(confirm);
    }

    openPackagesModal(): void {
        this.packageService.getBySerial(this.serial.Id)
            .subscribe(packages => {
                this.openModal(PackagesListModalComponent, {
                    size: 'lg',
                    onLoad: (component: PackagesListModalComponent) => {
                        component.title = `Пачки за серією "${this.serial.Name}"`;
                        component.packagesList = packages;
                    }
                });
            });
    }
}
