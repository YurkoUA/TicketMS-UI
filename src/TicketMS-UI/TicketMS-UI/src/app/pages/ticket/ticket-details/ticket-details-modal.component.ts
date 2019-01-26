import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BaseDetailsModal } from '../../base-details-modal';
import { Ticket } from '../../../../models/domain/ticket';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TicketService } from '../../../../services/api-services/ticket.service';
import { TicketsListPageComponent } from '../tickets-list/tickets-list-page.component';

@Component({
    selector: 'app-ticket-details-modal',
    templateUrl: './ticket-details-modal.component.html'
})
export class TicketDetailsModalComponent extends BaseDetailsModal<Ticket> {
    parentComponent: TicketsListPageComponent;

    constructor(
        activeModal: NgbActiveModal,
        location: Location,
        authService: AuthenticationService,
        modalService: NgbModal,
        router: Router,
        activeRoute: ActivatedRoute,
        private toastr: ToastrService,
        private ticketService: TicketService) {

        super(activeModal, location, activeRoute, router, authService, modalService);
    }

    get canBeDeleted(): boolean {
        return true;
    }

    loadTicket(id: number): void {
        this.ticketService.getById(id)
            .subscribe(t => this.model = t);
    }

    deleteTicket(): void {

    }
}
