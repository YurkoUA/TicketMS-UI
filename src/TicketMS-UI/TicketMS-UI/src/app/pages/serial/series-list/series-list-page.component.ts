import { Component, OnInit } from '@angular/core';
import { SerialService } from '../../../../services/api-services/serial.service';
import { Serial } from '../../../../models/domain/serial';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-series-list-page',
    templateUrl: './series-list-page.component.html'
})
export class SeriesListPageComponent implements OnInit {
    seriesList: Serial[] = [];

    constructor(private serialService: SerialService) {
    }

    ngOnInit(): void {
        this.loadSeries();
    }

    loadSeries(): void {
        this.serialService.getAll()
            .subscribe(series => {
                this.seriesList = series;
            });
    }
}
