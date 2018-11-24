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
    dtTrigger: Subject<any> = new Subject<any>();
    dtOptions: DataTables.Settings;

    constructor(private serialService: SerialService) {
        this.dtOptions = {
            paging: false,
            searching: false,
            infoCallback: this.dtInfoCallback,
            dom: '<"top"i>t'
        };
    }

    ngOnInit(): void {
        this.loadSeries();
    }

    loadSeries(): void {
        this.serialService.getAll()
            .subscribe(series => {
                this.seriesList = series;
                this.dtTrigger.next();
            });
    }

    dtInfoCallback(settings: any, start: number, end: number, max: number, total: number, pre: string): string {
        return `Всього серій: ${total}`;
    }
}
