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
import { ColorCreateModalComponent } from '../color-create/color-create-modal.component';
import { ITable } from '../../../../controls/table/models/table.interface';
import { TableColumnType } from '../../../../controls/table/models/table-column-type.enum';

@Component({
    selector: 'app-colors-list-page',
    templateUrl: './colors-list-page.component.html'
})
export class ColorsListPageComponent extends BasePage implements OnInit {
    colorsList: Color[] = [];

    tableOptions: ITable<Color>;
    isLoading: boolean = true;

    get isEmptyList(): boolean {
        return this.colorsList.length == 0;
    }

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
                this.isLoading = false;
                this.initializeTable();

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
        this.openModalChangingUrlAndModel(ColorDetailsModalComponent, ['color'], 'model', color);
    }

    openCreateModal(): void {
        this.openModal(ColorCreateModalComponent, {
            onClose: (color: Color) => {
                if (color.Id) {
                    this.colorsList.push(color);
                }
            }
        });
    }

    initializeTable(): void {
        this.tableOptions = {
            items: this.colorsList,
            headerText: 'Список кольорів',
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
                    computedText: (c: Color) => c.Name,
                    computedUrlTree: (c: Color) => ['color', c.Id],
                    modalClick: (c: Color) => this.openColor(c)
                }
            }, {
                title: 'Пачок',
                property: 'PackagesCount'
            }, {
                title: 'Квитків',
                property: 'TicketsCount'
            }]
        };
    }
}
