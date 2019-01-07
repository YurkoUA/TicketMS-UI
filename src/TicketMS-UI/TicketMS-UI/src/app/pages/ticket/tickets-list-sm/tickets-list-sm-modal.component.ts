import { Component, OnInit } from '@angular/core';
import { BaseModal } from '../../base-modal';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../../services/authentication.service';
import { ITable } from '../../../../controls/table/models/table.interface';
import { Ticket } from '../../../../models/domain/ticket';
import { TableColumnType } from '../../../../controls/table/models/table-column-type.enum';
import { ITableCellLink } from '../../../../controls/table/models/table-cell-link.interface';

@Component({
    selector: 'app-tickets-list-sm-modal',
    templateUrl: './tickets-list-sm-modal.component.html'
})
export class TicketsListSmModalComponent extends BaseModal implements OnInit {
    title: string;
    tableOptions: ITable<Ticket>;

    tickets: Ticket[] = [];

    constructor(activeModal: NgbActiveModal,
        modalService: NgbModal,
        location: Location,
        activeRoute: ActivatedRoute,
        router: Router,
        authService: AuthenticationService) {

        super(activeModal, location, activeRoute, router, authService, modalService);
    }

    ngOnInit(): void {
        this.tableOptions = {
            items: this.tickets,
            headerText: 'Список квитків',
            styles: {
                size: 'sm',
                isBordered: true,
                isHover: true,
                isResponsive: true,
                rowClasses: [{
                    className: 'table-success',
                    computed: (t: Ticket) => t.IsHappy === true
                }]
            },
            columns: [{
                title: 'Номер',
                type: TableColumnType.Link,
                cell: {
                    computedText: (t: Ticket) => t.Number,
                    computedUrlTree: (t: Ticket) => ['ticket', t.Id]
                }
            }, {
                title: 'Колір',
                computedProperty: (t: Ticket) => t.Color.Name
            }, {
                title: 'Серія',
                computedProperty: (t: Ticket) => t.Serial.Name + t.SerialNumber
            }, {
                title: 'Номінал',
                computedProperty: (t: Ticket) => t.Nominal.Value
            }, {
                title: 'Дата',
                property: 'Date'
            }, {
                title: 'Примітка',
                property: 'Note'
            }]
        };
    }
}
