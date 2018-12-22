import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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

    packagesList: Package[] = [];

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
        this.packagesList = [];

        this.packageService.getPackages(this.requestModel)
            .subscribe(packagesPage => {
                this.packagesList = packagesPage.Items;

                if (this.total != packagesPage.TotalCount) {
                    this.total = packagesPage.TotalCount;
                    this.onTotalChanged.emit(this.total);
                }
            });
    }

    openPackageDetails(p: Package): void {
        this.setUrlId('package', p.Id);
        this.openModalChangingUrl(PackageDetailsModalComponent, ['package'], {
            size: 'lg',
            onLoad: (comp: PackageDetailsModalComponent) => {
                comp.loadPackage(p.Id);
            },
            onClose: (editedPack: Package) => {
                this.packagesList.replace(p, editedPack);
            }
        });
    }

    updatePaging(pageNumber: number): void {
        this.requestModel.Offset = (pageNumber - 1) * PAGE_SIZE;
        this.loadPackages();
    }
}
