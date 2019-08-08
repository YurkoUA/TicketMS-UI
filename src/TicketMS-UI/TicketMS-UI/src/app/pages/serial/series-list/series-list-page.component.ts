import { Component, OnInit } from '@angular/core';
import { SerialService } from '../../../../services/api-services/serial.service';
import { Serial } from '../../../../models/domain/serial';
import { Subject, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { BasePage } from '../../base-page';
import { AuthenticationService } from '../../../../services/authentication.service';
import { SerialDetailsModalComponent } from '../serial-details/serial-details-modal.component';
import { SerialCreateModalComponent } from '../serial-create/serial-create-modal.component';
import { Table } from '../../../../controls/table/models/table.model';
import { TableColumnType } from '../../../../controls/table/models/table-column-type.enum';

@Component({
    selector: 'app-series-list-page',
    templateUrl: './series-list-page.component.html'
})
export class SeriesListPageComponent extends BasePage implements OnInit {
    seriesList: Serial[] = [];

    tableOptions: Table<Serial>;
    isLoading: boolean = true;

    get isEmptyList(): boolean {
        return this.seriesList.length == 0;
    }

    constructor(router: Router,
        activatedRoute: ActivatedRoute,
        location: Location,
        modalService: NgbModal,
        authService: AuthenticationService,
        private serialService: SerialService) {

        super(router, activatedRoute, location, modalService, authService);
    }

    ngOnInit(): void {
        this.loadSeries();
    }

    loadSeries(): void {
        this.serialService.getAll()
            .subscribe(series => {
                this.seriesList = series;
                this.isLoading = false;
                this.initializeTable();

                let id = this.currentId;

                if (id) {
                    this.resolveSerial(id);
                }
            });
    }

    resolveSerial(id: number): void {
        let serial = this.seriesList.filter(s => s.Id == id).firstOrDefault();

        if (serial) {
            this.openSerial(serial);
        }
    }

    openSerial(serial: Serial): void {
        this.setUrlId('serial', serial.Id);
        this.openModalChangingUrlAndModel(SerialDetailsModalComponent, ['serial'], 'model', serial, (serial: Serial) => {
            this.seriesList.filter(s => s.Id == serial.Id)[0] = serial;
        });
    }

    openCreateModal(): void {
        this.openModal(SerialCreateModalComponent, {
            onClose: (serial: Serial) => {
                if (serial.Id) {
                    this.seriesList.push(serial);
                }
            }
        });
    }

    initializeTable(): void {
        this.tableOptions = {
            items: this.seriesList,
            headerText: 'Список серій',
            styles: {
                size: 'sm',
                isBordered: true,
                isHover: true,
                isResponsive: true
            },
            columns: [{
                title: 'ID',
                property: 'Id'
            }, {
                title: 'Назва',
                type: TableColumnType.Link,
                cell: {
                    computedText: (s: Serial) => s.Name,
                    computedUrlTree: (s: Serial) => ['serial', s.Id],
                    modalClick: (s: Serial) => this.openSerial(s)
                }
            }, {
                title: 'Пачок',
                property: 'PackagesCount'
            }, {
                title: 'Квитків',
                property: 'TicketsCount'
            }, {
                title: 'Примітка',
                property: 'Note'
            }]
        };
    }
}
