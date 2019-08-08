import { Component, OnInit, Injector } from '@angular/core';
import { BaseModal } from '../../base-modal';
import { PackageService } from '../../../../services/api-services/package.service';
import { Package } from '../../../../models/domain/package';
import { Table } from '../../../../controls/table/models/table.model';

@Component({
    selector: 'app-package-search-modal',
    templateUrl: './package-search-modal.component.html'
})
export class PackageSearchModalComponent extends BaseModal implements OnInit {
    _packagesList: Package[] = [];
    packageName: string;
    tableOptions: Table<Package>;
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

    constructor(injector: Injector, private packageService: PackageService) {
        super(injector);
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
