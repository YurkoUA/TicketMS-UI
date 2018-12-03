import { Component, OnInit } from '@angular/core';
import { ColorService } from '../../../../services/api-services/color.service';
import { Color } from '../../../../models/domain/color';
import { Subject } from 'rxjs';
import { BasePage } from '../../base-page';
import { AuthenticationService } from '../../../../services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ColorDetailsModalComponent } from '../color-details/color-details-modal.component';

@Component({
    selector: 'app-colors-list-page',
    templateUrl: './colors-list-page.component.html'
})
export class ColorsListPageComponent extends BasePage implements OnInit {
    colorsList: Color[] = [];

    constructor(router: Router,
        activatedRoute: ActivatedRoute,
        location: Location,
        modalService: NgbModal,
        authService: AuthenticationService,
        private colorService: ColorService) {

        super(router, activatedRoute, location, modalService, authService);
    }

    ngOnInit(): void {
        this.loadColors();
    }

    loadColors(): void {
        this.colorService.getAll()
            .subscribe(colors => {
                this.colorsList = colors;

                let id = this.currentId;

                if (id) {
                    this.resolveColor(id);
                }
            });
    }

    resolveColor(id: number): void {
        let color = this.colorsList.filter(c => c.Id == id)[0];

        if (color) {
            this.openColor(color);
        }
    }

    openColor(color: Color): void {
        this.setUrlId('color', color.Id);
        this.openModalChangingUrlAndModel(ColorDetailsModalComponent, ['color'], 'color', color);
    }
}
