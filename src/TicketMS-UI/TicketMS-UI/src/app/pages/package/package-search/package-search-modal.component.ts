import { Component, OnInit } from '@angular/core';
import { BaseModal } from '../../base-modal';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../../services/authentication.service';
import { PackageService } from '../../../../services/api-services/package.service';
import { Package } from '../../../../models/domain/package';
import { ITable } from '../../../../controls/table/models/table.interface';

@Component({
    selector: 'app-package-search-modal',
    templateUrl: './package-search-modal.component.html'
})
export class PackageSearchModalComponent extends BaseModal implements OnInit {
    _packagesList: Package[] = [];
    packageName: string;
    tableOptions: ITable<Package>;
    isDirty: boolean = false;

    get packagesList(): Package[] {
        return this._packagesList;
    }

    set packagesList(value: Package[]) {
        this._packagesList = value;
    }

    get isSearchDisabled(): boolean {
        return !this.packageName || this.packageName.length < 4;
    }

    get isEmpty(): boolean {
        return this.packagesList.length == 0;
    }

    constructor(activeModal: NgbActiveModal,
        modalService: NgbModal,
        location: Location,
        activeRoute: ActivatedRoute,
        router: Router,
        authService: AuthenticationService,
        private packageService: PackageService) {

        super(activeModal, location, activeRoute, router, authService, modalService);
    }

    ngOnInit(): void {
        this.initializeTable();
    }

    findPackages(): void {
        this.packageService.findPackage(this.packageName)
            .subscribe(packages => {
                this.packagesList = packages;
                this.tableOptions.items = packages;
                this.isDirty = true;
            });
    }

    initializeTable(): void {
        this.tableOptions = {
            items: this.packagesList,
            headerText: 'Пачок знайдено',
            styles: {
                size: 'sm',
                isResponsive: true,
                isHover: true,
                isBordered: true
            },
            columns: [{
                title: 'ID',
                property: 'Id'
            }, {
                title: 'Назва',
                property: 'Name'
            }, {
                title: 'Квитків',
                property: 'TicketsCount'
            }]
        };
    }
}
