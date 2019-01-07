import { AuthenticationService } from "../services/authentication.service";
import { IConfirmOptions } from "../models/interfaces/confirm-options.interface";
import { NgbModal, NgbModalRef, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmModalComponent } from "./components/confirm-modal/confirm-modal.component";
import { IModalOpenOptions } from "../models/interfaces/modal-open-options.interface";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";

export abstract class BaseComponent {
    constructor(protected authenticationService: AuthenticationService,
        protected modalService: NgbModal,
        protected location: Location,
        protected activeRoute: ActivatedRoute,
        protected router: Router) {
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

    get isAdmin(): boolean {
        if (!this.isAuthenticated)
            return false;

        return this.authenticationService.isAdmin;
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

    confirm(options: IConfirmOptions): void {
        let modal = this.modalService.open(ConfirmModalComponent, {
            keyboard: false,
            backdrop: 'static',
            size: 'sm'
        });

        modal.componentInstance.options = options;
    }

    openModal(component: any, options?: IModalOpenOptions): NgbModalRef {
        let modalOpts: NgbModalOptions = {
            keyboard: false,
            backdrop: 'static'
        };

        if (options && options.size) {
            modalOpts.size = options.size;
        }

        let modal = this.modalService.open(component, modalOpts);
        
        modal.result.then(r => {
            if (options && options.onClose) {
                options.onClose(r != null ? r : null);
            }
        }, r => { });

        if (options && options.onLoad) {
            options.onLoad(modal.componentInstance);
        }

        modal.componentInstance['parentComponent'] = this;
        return modal;
    }

    openModalChangingUrl(component: any, url: string[], options?: IModalOpenOptions): NgbModalRef {
        let modalOpts: NgbModalOptions = {
            keyboard: false,
            backdrop: 'static'
        };

        if (options && options.size) {
            modalOpts.size = options.size;
        }

        let modal = this.modalService.open(component, modalOpts);
        
        modal.result.then(r => {
            if (options && options.onClose) {
                options.onClose(r != null ? r : null);
            }

            let urlToGo = this.router.createUrlTree(url, {
                queryParamsHandling: 'merge'
            }).toString();
            
            this.location.go(urlToGo);
        }, r => { });

        if (options && options.onLoad) {
            options.onLoad(modal.componentInstance);
        }

        modal.componentInstance['parentComponent'] = this;
        return modal;
    }
    
    openModalChangingUrlAndModel(component: any, url: string[], modalProperty: string, model: any, onClose?: Function, options?: IModalOpenOptions): NgbModalRef {
        let modalOpts: NgbModalOptions = {
            keyboard: false,
            backdrop: 'static'
        };

        if (options && options.size) {
            modalOpts.size = options.size;
        }
        
        let modal = this.modalService.open(component, modalOpts);
        
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
