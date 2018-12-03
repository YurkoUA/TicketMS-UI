import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationService } from "../../services/authentication.service";

export abstract class BasePage {
    constructor(
        protected router: Router,
        protected activeRoute: ActivatedRoute,
        protected location: Location,
        protected modalService: NgbModal,
        protected authenticationService: AuthenticationService
    ) {
    }

    get isAuthenticated(): boolean {
        return this.authenticationService.isAuthenticated();
    }

    get userName(): string {
        if (this.isAuthenticated) {
            return this.authenticationService.getUser().UserName;
        }
        return null;
    }

    get currentId(): number {
        return parseInt(this.activeRoute.snapshot.params['id']);
    }

    setUrlId(segment: string, id: number): void {
        let url = this.router.createUrlTree([segment, id], {
            queryParamsHandling: 'merge'
        }).toString();

        this.location.go(url);
    }

    openModal(component: any): NgbModalRef {
        return this.modalService.open(component, {
            keyboard: false,
            backdrop: 'static'
        });
    }

    openModalChangingUrlAndModel(component: any, url: string[], modalProperty: string, model: any): NgbModalRef {
        let modal = this.modalService.open(component, {
            keyboard: false,
            backdrop: 'static'
        });

        modal.result.then(r => {
            let urlToGo = this.router.createUrlTree(url, {
                queryParamsHandling: 'merge'
            }).toString();
            
            this.location.go(urlToGo);
        }, r => { });

        modal.componentInstance[modalProperty] = model;
        return modal;
    }
}
