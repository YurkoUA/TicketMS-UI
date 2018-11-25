import { Component, OnInit } from '@angular/core';
import { SerialService } from '../../../../services/api-services/serial.service';
import { Serial } from '../../../../models/domain/serial';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SerialDetailsPageComponent } from '../serial-details/serial-details-page.component';
import { Location } from '@angular/common';

@Component({
    selector: 'app-series-list-page',
    templateUrl: './series-list-page.component.html'
})
export class SeriesListPageComponent implements OnInit {
    seriesList: Serial[] = [];

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private location: Location,
        private modalService: NgbModal,
        private serialService: SerialService) {
    }

    ngOnInit(): void {
        this.loadSeries();
    }

    loadSeries(): void {
        this.serialService.getAll()
            .subscribe(series => {
                this.seriesList = series;

                let id = this.activatedRoute.snapshot.params['id'];

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
        if (!this.activatedRoute.snapshot.params['id']) {
            let url = this.router.createUrlTree([serial.Id], { relativeTo: this.activatedRoute }).toString();
            this.location.go(url);
        }

        let modal = this.modalService.open(SerialDetailsPageComponent, {
            keyboard: false,
            backdrop: 'static'
        });
        modal.componentInstance.serial = serial;
        modal.result.then(r => this.location.go('serial'));
    }
}
