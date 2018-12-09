import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationService } from "../../services/authentication.service";
import { BaseComponent } from "../base-component";

export abstract class BasePage extends BaseComponent {
    constructor(
        protected router: Router,
        protected activeRoute: ActivatedRoute,
        protected location: Location,
        protected modalService: NgbModal,
        authenticationService: AuthenticationService
    ) {
        super(authenticationService);
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

    openModal(component: any, onClose?: Function): NgbModalRef {
        let modal = this.modalService.open(component, {
            keyboard: false,
            backdrop: 'static'
        });

        modal.result.then(r => {
            if (onClose) {
                onClose(r != null ? r : null);
            }
        }, r => { });

        modal.componentInstance['parentComponent'] = this;
        return modal;
    }

    openModalChangingUrlAndModel(component: any, url: string[], modalProperty: string, model: any, onClose?: Function): NgbModalRef {
        let modal = this.modalService.open(component, {
            keyboard: false,
            backdrop: 'static'
        });

        modal.result.then(r => {
            let urlToGo = this.router.createUrlTree(url, {
                queryParamsHandling: 'merge'
            }).toString();
            
            this.location.go(urlToGo);

            if (onClose) {
                onClose(r != null ? r : null);
            }
        }, r => { });

        modal.componentInstance[modalProperty] = model;
        modal.componentInstance['parentComponent'] = this;
        return modal;
    }
}
