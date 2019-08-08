import { Component, OnInit, Injector } from '@angular/core';
import { BaseModal } from '../../base-modal';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../../services/authentication.service';
import { Table } from '../../../../controls/table/models/table.model';
import { Ticket } from '../../../../models/domain/ticket';
import { TableColumnType } from '../../../../controls/table/models/table-column-type.enum';
import { TableCellLink } from '../../../../controls/table/models/table-cell-link.model';

@Component({
    selector: 'app-tickets-list-sm-modal',
    templateUrl: './tickets-list-sm-modal.component.html'
})
export class TicketsListSmModalComponent extends BaseModal implements OnInit {
    title: string;
    tableOptions: Table<Ticket>;

    tickets: Ticket[] = [];

    constructor(injector: Injector) {
        super(injector);
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
