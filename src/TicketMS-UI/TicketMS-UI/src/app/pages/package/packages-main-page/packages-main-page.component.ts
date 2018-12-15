import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePage } from '../../base-page';
import { AuthenticationService } from '../../../../services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PackagesTotalModel } from '../../../../models/packages-total.model';
import { PackageService } from '../../../../services/api-services/package.service';
import { PackagesGetListModel } from '../../../../models/packages-get-list.model';

@Component({
    selector: 'app-packages-main-page',
    templateUrl: './packages-main-page.component.html'
})
export class PackagesMainPageComponent extends BasePage implements OnInit, OnDestroy {
    totalModel: PackagesTotalModel = new PackagesTotalModel();
    allModel: PackagesGetListModel;
    openedModel: PackagesGetListModel;
    specialModel: PackagesGetListModel;

    isLoading: boolean = true;

    constructor(
        router: Router,
        activeRoute: ActivatedRoute,
        location: Location,
        modalService: NgbModal,
        authenticationService: AuthenticationService,
        private packageService: PackageService
    ) {
        super(router, activeRoute, location, modalService, authenticationService);
    }

    ngOnInit(): void {
        $('main').removeClass('container');
        $('main').addClass('container-fluid');

        this.allModel = new PackagesGetListModel(false, false);
        this.openedModel = new PackagesGetListModel(false, true);
        this.specialModel = new PackagesGetListModel(true, false);

        this.loadCount();
    }
    
    ngOnDestroy(): void {
        // TODO: Move to service.
        $('main').removeClass('container-fluid');
        $('main').addClass('container');
    }
    
    loadCount(): void {
        this.packageService.countPackages()
            .subscribe(count => {
                this.totalModel = count
                this.isLoading = false;
            });
    }
}
