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

    constructor(private colorService: ColorService) {
    }

    ngOnInit(): void {
        this.loadColors();
    }

    loadColors(): void {
        this.colorService.getAll()
            .subscribe(colors => {
                this.colorsList = colors;
            });
    }
}
