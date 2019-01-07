import { Component, OnInit, Input, EventEmitter, Output, Inject } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { PackagesGetListModel } from '../../../models/packages-get-list.model';
import { AuthenticationService } from '../../../services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PackageService } from '../../../services/api-services/package.service';
import { PagingModel } from '../../../models/paging.model';
import { Package } from '../../../models/domain/package';
import { PAGE_SIZE } from '../../../models/constants';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PackageDetailsModalComponent } from '../../pages/package/package-details/package-details-modal.component';
import { ITable } from '../../../controls/table/models/table.interface';
import { TableColumnType } from '../../../controls/table/models/table-column-type.enum';
import { PackageStatusPipe } from '../../../core/pipes/package-status.pipe';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-packages-list-tab',
    templateUrl: './packages-list-tab.component.html'
})
export class PackagesListTabComponent extends BaseComponent implements OnInit {
    @Input() requestModel: PackagesGetListModel;
    @Input() total: number;
    @Input() hideFirstDigitColumn: boolean;
    currentPage: number = 1;

    @Output() onTotalChanged: EventEmitter<number> = new EventEmitter<number>();
    @Output() onNeedsRefresh: EventEmitter<any> = new EventEmitter<any>();

    packagesList: Package[] = [];
    tableOptions: ITable<Package>;

    get isEmptyList(): boolean {
        return this.packagesList.length == 0;
    }

    get showPagination(): boolean {
        return this.total > PAGE_SIZE;
    }

    constructor(authenticationService: AuthenticationService,
        modalService: NgbModal,
        router: Router,
        activeRoute: ActivatedRoute,
        location: Location,
        private packageService: PackageService) {

        super(authenticationService, modalService, location, activeRoute, router);
    }

    ngOnInit(): void {
        this.loadPackages();
    }
    
    onTabOpened(): void {
        if (this.packagesList.length == 0) {
            this.loadPackages();
        }
    }

    loadPackages(): void {
        this.packagesList.clear();

        this.packageService.getPackages(this.requestModel)
            .subscribe(packagesPage => {
                this.packagesList = packagesPage.Items;
                this.initializeTable();
                let id = this.currentId;

                if (id && !this.modalService.hasOpenModals()) {
                    this.resolvePackage(id);
                }

                if (this.total != packagesPage.TotalCount) {
                    this.total = packagesPage.TotalCount;
                    this.onTotalChanged.emit(this.total);
                }
            });
    }

    resolvePackage(id: number): void {
        let pack = this.packagesList.filter(p => p.Id == id).firstOrDefault();

        if (pack) {
            this.openPackageDetails(pack);
        }
    }

    openPackageDetails(p: Package): void {
        this.setUrlId('package', p.Id);
        this.openModalChangingUrl(PackageDetailsModalComponent, ['package'], {
            size: 'lg',
            onLoad: (comp: PackageDetailsModalComponent) => {
                comp.loadPackage(p.Id);
            },
            onClose: (editedPack: Package) => {
                if (editedPack.Id && editedPack.Id > 0) {
                    this.packagesList.replace(p, editedPack);
                }
            }
        });
    }

    updatePaging(pageNumber: number): void {
        this.requestModel.Offset = (pageNumber - 1) * PAGE_SIZE;
        this.loadPackages();
    }

    initializeTable(): void {
        this.tableOptions = {
            items: this.packagesList,
            styles: {
                size: 'sm',
                isHover: true,
                isBordered: true,
                withoutCard: true
            },
            columns: [{
                title: 'ID',
                property: 'Id'
            }, {
                title: 'Назва',
                type: TableColumnType.Link,
                cell: {
                    computedText: (p: Package) => p.Name,
                    computedUrlTree: (p: Package) => ['package', p.Id],
                    modalClick: (p: Package) => this.openPackageDetails(p)
                }
            }, {
                title: 'Квитків',
                property: 'TicketsCount'
            }, {
                title: 'Статус',
                computedProperty: (p: Package) => new PackageStatusPipe().transform(p)
            }, {
                title: 'Номінал',
                computedProperty: (p: Package) => p.Nominal.Value
            }, {
                title: 'Перша цифра',
                property: 'FirstDigit',
                isHidden: this.hideFirstDigitColumn
            }]
        };
    }

    refreshAllTabs(): void {
        this.onNeedsRefresh.emit();
    }
}
