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
import { IConfirmOptions } from '../../../../models/interfaces/confirm-options.interface';
import { TicketService } from '../../../../services/api-services/ticket.service';
import { TicketsListSmModalComponent } from '../../ticket/tickets-list-sm/tickets-list-sm-modal.component';

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
        private packageService: PackageService,
        private ticketService: TicketService) {

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
        let confirm: IConfirmOptions = {
            message: `Ви дійсно хочете видалити пачку "${this.model.Name}"`,
            title: `Видалення пачки "${this.model.Name}"`,
            yes: 'Видалити',
            no: 'Скасувати',
            onConfirm: () => {
                this.packageService.deletePackage(this.model.Id)
                    .subscribe(isOk => {
                        this.parentComponent.refreshAllTabs();
                        this.toastr.success(`Пачку "${this.model.Name}" успішно видалено!`);
                        this.closeModal();
                    });
            }
        };

        this.confirm(confirm);
    }

    openTicketsModal(): void {
        this.ticketService.getByPackage(this.model.Id)
            .subscribe(tickets => {
                this.openModal(TicketsListSmModalComponent, {
                    size: 'lg',
                    onLoad: (component: TicketsListSmModalComponent) => {
                        component.tickets = tickets;
                        component.title = `Квитки з пачки "${this.model.Name}"`;
                    }
                })
            });
    }
}
