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

@Component({
    selector: 'app-series-list-page',
    templateUrl: './series-list-page.component.html'
})
export class SeriesListPageComponent extends BasePage implements OnInit {
    seriesList: Serial[] = [];

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

                let id = this.currentId;

                if (id) {
                    this.resolveSerial(id);
                }
            });
    }

    resolveSerial(id: number): void {
        let serial = this.seriesList.filter(s => s.Id == id)[0];

        if (serial) {
            this.openSerial(serial);
        }
    }

    openSerial(serial: Serial): void {
        this.setUrlId('serial', serial.Id);
        this.openModalChangingUrlAndModel(SerialDetailsModalComponent, ['serial'], 'serial', serial, (serial: Serial) => {
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
}
