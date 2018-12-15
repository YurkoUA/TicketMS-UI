import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Color } from '../../../../models/domain/color';
import { AuthenticationService } from '../../../../services/authentication.service';
import { ColorsListPageComponent } from '../colors-list/colors-list-page.component';
import { BaseDetailsModal } from '../../base-details-modal';
import { IConfirmOptions } from '../../../../models/interfaces/confirm-options.interface';
import { ColorService } from '../../../../services/api-services/color.service';
import { ToastrService } from 'ngx-toastr';
import { PackageService } from '../../../../services/api-services/package.service';
import { PackagesListModalComponent } from '../../package/packages-list/packages-list-modal.component';

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
        private colorService: ColorService,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private packageService: PackageService,
        private toastr: ToastrService) {

        super(activeModal, location, authService, modalService);
    }

    get canBeDeleted(): boolean {
        return this.model.PackagesCount == 0
            && this.model.TicketsCount == 0;
    }

    deleteColor(): void {
        let confirm: IConfirmOptions = {
            message: `Ви дійсно хочете видалити колір "${this.model.Name}"?`,
            title: `Видалення кольору "${this.model.Name}"`,
            yes: 'Видалити',
            no: 'Скасувати',
            onConfirm: () => {
                this.colorService.deleteColor(this.model.Id)
                    .subscribe(isOk => {
                        this.parentComponent.colorsList.remove(this.model);

                        this.toastr.success(`Колір "${this.model.Name}" успішно видалено!`);
                        this.closeModal();
                    });
            }
        };
        this.confirm(confirm);
    }

    openPackagesModal(): void {
        this.packageService.getByColor(this.model.Id)
            .subscribe(packages => {
                this.openModal(PackagesListModalComponent, {
                    size: 'lg',
                    onLoad: (component: PackagesListModalComponent) => {
                        component.title = `Пачки за кольором "${this.model.Name}"`;
                        component.packagesList = packages;
                    }
                });
            });
    }
}
