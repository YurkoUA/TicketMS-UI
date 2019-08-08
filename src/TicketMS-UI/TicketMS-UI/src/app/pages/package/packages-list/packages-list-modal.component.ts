import { Component, OnInit } from '@angular/core';
import { Package } from '../../../../models/domain/package';
import { BaseModal } from '../../base-modal';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { AuthenticationService } from '../../../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from '../../../../controls/table/models/table.model';

@Component({
    selector: 'app-packages-list-modal',
    templateUrl: './packages-list-modal.component.html'
})
export class PackagesListModalComponent extends BaseModal implements OnInit {
    packagesList: Package[] = [];
    title: string;
    tableOptions: Table<Package>;

    constructor(activeModal: NgbActiveModal,
        modalService: NgbModal,
        location: Location,
        activeRoute: ActivatedRoute,
        router: Router,
        authService: AuthenticationService) {

        super(activeModal, location, activeRoute, router, authService, modalService);
    }
    
    ngOnInit(): void {
        this.initializeTable();
    }
    
    initializeTable(): void {
        this.tableOptions = {
            items: this.packagesList,
            headerText: 'Список пачок',
            styles: {
                size: 'sm',
                isHover: true,
                isBordered: true,
                isResponsive: true
            },
            columns: [{
                title: 'ID',
                property: 'Id'
            }, {
                title: 'Назва',
                property: 'Name'
            }, {
                title: 'Квитків',
                property: 'TicketsCount'
            }, {
                title: 'Статус',
                computedProperty: (p: Package) => {
                    return `${p.IsOpened ? 'Відкрита' : 'Закрита'} / ${p.IsSpecial ? 'Спеціальна' : 'Звичайна'}`;
                }
            }]
        };
    }
}
