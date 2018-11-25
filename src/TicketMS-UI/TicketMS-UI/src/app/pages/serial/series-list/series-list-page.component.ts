import { Component, OnInit } from '@angular/core';
import { SerialService } from '../../../../services/api-services/serial.service';
import { Serial } from '../../../../models/domain/serial';
import { Subject, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SerialDetailsPageComponent } from '../serial-details/serial-details-page.component';
import { Location } from '@angular/common';
import { BasePage } from '../../base-page';
import { AuthenticationService } from '../../../../services/authentication.service';

@Component({
    selector: 'app-series-list-page',
    templateUrl: './series-list-page.component.html'
})
export class SeriesListPageComponent extends BasePage implements OnInit {
    seriesList: Serial[] = [];

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
        let modal = this.openModal(SerialDetailsPageComponent);
        modal.result.then(r => {
            let url = this.router.createUrlTree(['serial'], {
                queryParamsHandling: 'merge'
            }).toString();

            this.location.go(url);
        }, () => {});
        modal.componentInstance.serial = serial;
    }
}
