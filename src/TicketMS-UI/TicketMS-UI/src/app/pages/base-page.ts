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
        if (this.currentId == undefined || isNaN(this.currentId)) {
            let url = this.router.createUrlTree([segment, id], {
                queryParamsHandling: 'merge'
            }).toString();

            this.location.go(url);
        }
    }

    openModal(component: any): NgbModalRef {
        return this.modalService.open(component, {
            keyboard: false,
            backdrop: 'static'
        });
    }
}
