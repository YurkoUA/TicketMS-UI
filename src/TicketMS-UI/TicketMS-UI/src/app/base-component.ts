import { AuthenticationService } from "../services/authentication.service";
import { IConfirmOptions } from "../models/interfaces/confirm-options.interface";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmModalComponent } from "./components/confirm-modal/confirm-modal.component";

export abstract class BaseComponent {
    constructor(protected authenticationService: AuthenticationService,
        protected modalService: NgbModal) {
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

    confirm(options: IConfirmOptions): void {
        let modal = this.modalService.open(ConfirmModalComponent, {
            keyboard: false,
            backdrop: 'static',
            size: 'sm'
        });

        modal.componentInstance.options = options;
    }
}
