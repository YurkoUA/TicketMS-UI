import { Component, OnInit, OnDestroy, ViewChildren, QueryList, Injector } from '@angular/core';
import { BasePage } from '../../base-page';
import { PackagesTotalModel } from '../../../../models/packages-total.model';
import { PackageService } from '../../../../services/api-services/package.service';
import { PackagesGetListModel } from '../../../../models/packages-get-list.model';
import { UiUtilService } from '../../../../services/ui-services/ui-util.service';
import { PackageCreateModalComponent } from '../package-create/package-create-modal.component';
import { PackageSearchModalComponent } from '../package-search/package-search-modal.component';
import { PackagesListTabComponent } from '../../../components/packages-list-tab/packages-list-tab.component';

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

    @ViewChildren(PackagesListTabComponent)
    private tabComponents: QueryList<PackagesListTabComponent>;

    constructor(
        injector: Injector,
        private packageService: PackageService,
        private uiUtils: UiUtilService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.uiUtils.setContainerFluid();

        this.allModel = new PackagesGetListModel(false, false);
        this.openedModel = new PackagesGetListModel(false, true);
        this.specialModel = new PackagesGetListModel(true, false);

        this.loadCount();
    }
    
    ngOnDestroy(): void {
        this.uiUtils.setContainer();
    }
    
    loadCount(): void {
        this.packageService.countPackages()
            .subscribe(count => {
                this.totalModel = count
                this.isLoading = false;
            });
    }

    openCreateModal(): void {
        this.openModal(PackageCreateModalComponent, {
            onClose: () => {
                this.refreshTabs();
            }
        });
    }

    openSearchModal(): void {
        this.openModal(PackageSearchModalComponent, {
            size: 'lg'
        });
    }

    refreshTabs(): void {
        this.tabComponents.forEach(c => c.loadPackages());
        this.loadCount();
    }
}
