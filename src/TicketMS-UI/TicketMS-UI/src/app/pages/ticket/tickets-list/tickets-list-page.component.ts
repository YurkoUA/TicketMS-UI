import { Component, OnInit } from '@angular/core';
import { BasePage } from '../../base-page';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../../../services/authentication.service';
import { UiUtilService } from '../../../../services/ui-services/ui-util.service';
import { TicketService } from '../../../../services/api-services/ticket.service';
import { TicketsListType } from '../../../../models/enums/tickets-list-type.enum';
import { PagingModel } from '../../../../models/paging.model';
import { Ticket } from '../../../../models/domain/ticket';
import { PAGE_SIZE } from '../../../../models/constants';
import { PagingResponseModel } from '../../../../models/paging-response.model';
import { Table } from '../../../../controls/table/models/table.model';
import { TableColumnType } from '../../../../controls/table/models/table-column-type.enum';
import { TicketDetailsModalComponent } from '../ticket-details/ticket-details-modal.component';
import { isNumber } from 'util';

@Component({
    selector: 'app-tickets-list-page',
    templateUrl: './tickets-list-page.component.html'
})
export class TicketsListPageComponent extends BasePage implements OnInit {
    loadTicketsCallback: Function;
    paging: PagingModel = new PagingModel();
    type: TicketsListType;
    pageTitle: string;

    ticketsList: Ticket[] = [];
    totalCount: number;

    currentPage: number = 1;
    tableOptions: Table<Ticket>;

    get isPaginable(): boolean {
        return this.type == TicketsListType.All || this.type == TicketsListType.Happy;
    }

    get showPagination(): boolean {
        return this.isPaginable && this.totalCount > PAGE_SIZE;
    }

    constructor(
        router: Router,
        activeRoute: ActivatedRoute,
        location: Location,
        modalService: NgbModal,
        authenticationService: AuthenticationService,
        private ticketService: TicketService,
        private uiUtils: UiUtilService
    ) {
        super(router, activeRoute, location, modalService, authenticationService);
    }

    ngOnInit(): void {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.resolvePageType();
        this.loadTickets();
    }

    resolvePageType(): void {
        let typeUrl = this.activeRoute.snapshot.params['type'];

        if (isNumber(typeUrl)) {
            this.type = TicketsListType.All;
        } else {
            this.type = this.activeRoute.snapshot.params['type'] || TicketsListType.All;
        }

        this.initializePageProperties(this.type);
    }

    resolveTicketId(id: number): void {
        // TODO:
    }

    initializePageProperties(type: TicketsListType): void {
        let pagePropsDictionary = {
            [TicketsListType.All]: { 
                callback: (paging: PagingModel) => this.ticketService.getAllTickets(paging), 
                title: 'Квитки' 
            },
            [TicketsListType.Happy]: { 
                callback: (paging: PagingModel) => this.ticketService.getHappyTickets(paging), 
                title: 'Щасливі квитки' 
            },
            [TicketsListType.Unallocated]: { 
                callback: () => this.ticketService.getUnallocatedTickets(), 
                title: 'Нерозподілені квитки' 
            },
            [TicketsListType.Duplicates]: { 
                callback: () => this.ticketService.getDuplicatedTickets(), 
                title: 'Квитки з однаковими номерами' 
            },
            [TicketsListType.Reversible]: { 
                callback: () => this.ticketService.getReversibleTickets(), 
                title: 'Дзеркальні квитки' 
            },
            [TicketsListType.Consistent]: { 
                callback: () => this.ticketService.getConsistentTickets(), 
                title: 'Послідовні квитки' 
            },
        };

        this.loadTicketsCallback = pagePropsDictionary[type].callback;
        this.pageTitle = pagePropsDictionary[type].title;
    }

    loadTickets(): void {
        this.ticketsList.clear();

        if (this.isPaginable) {
            this.loadTicketsCallback(this.paging)
                .subscribe((resp: PagingResponseModel<Ticket>) => {
                    this.totalCount = resp.TotalCount;
                    this.ticketsList = resp.Items;
                    this.initializeTable();
                });
        } else {
            this.loadTicketsCallback()
                .subscribe((t: Ticket[]) => {
                    this.totalCount = t.length;
                    this.ticketsList = t;
                    this.initializeTable();
                });
        }
    }

    pagingClick(pageNumber: number): void {
        this.paging.Offset = (pageNumber - 1) * PAGE_SIZE;
        this.loadTickets();
    }

    initializeTable(): void {
        this.tableOptions = {
            items: this.ticketsList,
            itemsTotalCount: this.totalCount,
            headerText: 'Квитків',
            styles: {
                size: 'sm',
                isHover: true,
                isBordered: true,
                isResponsive: true,
                rowClasses: [{
                    className: 'table-success',
                    computed: (t: Ticket) => {
                        return t.IsHappy === true 
                            && this.type != TicketsListType.Happy
                            && this.type != TicketsListType.Consistent
                            && this.type != TicketsListType.Reversible;
                    }
                }]
            },
            columns: [{
                title: 'Номер',
                type: TableColumnType.Link,
                cell: {
                    computedText: (t: Ticket) => t.Number,
                    computedUrlTree: (t: Ticket) => ['ticket', t.Id],
                    modalClick: (t: Ticket) => this.openTicketDetails(t)
                }
            }, {
                title: 'Колір',
                computedProperty: (t: Ticket) => t.Color.Name
            }, {
                title: 'Серія',
                computedProperty: (t: Ticket) => t.Serial.Name + t.SerialNumber
            }, {
                title: 'Пачка',
                computedProperty: (t: Ticket) => t.Package.Name
            }, {
                title: 'Дата',
                property: 'Date'
            }, {
                title: 'Примітка',
                property: 'Note'
            }]
        };
    }

    openTicketDetails(ticket: Ticket): void {
        this.setUrlId('ticket', ticket.Id);

        this.openModalChangingUrl(TicketDetailsModalComponent, ['ticket'], {
            onLoad: (comp: TicketDetailsModalComponent) => comp.loadTicket(ticket.Id),
            onClose: (editedTicket: Ticket) => {
                if (editedTicket && editedTicket.Id) {
                    this.ticketsList.replace(ticket, editedTicket);
                }
            }
        });
    }
}
