import { Component, OnInit, Injector } from '@angular/core';
import { Location } from '@angular/common';
import { BaseDetailsModal } from '../../base-details-modal';
import { Ticket } from '../../../../models/domain/ticket';
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
        injector: Injector,
        private toastr: ToastrService,
        private ticketService: TicketService) {

        super(injector);
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
