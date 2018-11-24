import { Component, OnInit } from '@angular/core';
import { ColorService } from '../../../../services/api-services/color.service';
import { Color } from '../../../../models/domain/color';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-colors-list-page',
    templateUrl: './colors-list-page.component.html'
})
export class ColorsListPageComponent implements OnInit {
    colorsList: Color[] = [];
    dtTrigger: Subject<any> = new Subject<any>();
    dtOptions: DataTables.Settings;

    constructor(private colorService: ColorService) {
        this.dtOptions = {
            paging: false,
            searching: false,
            infoCallback: this.dtInfoCallback,
            dom: '<"top"i>t'
        };
    }

    ngOnInit(): void {
        this.loadColors();
    }

    loadColors(): void {
        this.colorService.getAll()
            .subscribe(colors => {
                this.colorsList = colors;
                this.dtTrigger.next();
            });
    }

    dtInfoCallback(settings: any, start: number, end: number, max: number, total: number, pre: string): string {
        return `Всього кольорів: ${total}`;
    }
}
