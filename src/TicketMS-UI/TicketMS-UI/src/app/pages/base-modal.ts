import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Location } from "@angular/common";
import { BaseComponent } from "../base-component";
import { AuthenticationService } from "../../services/authentication.service";

export abstract class BaseModal extends BaseComponent {
    constructor(protected activeModal: NgbActiveModal,
        protected location: Location,
        authenticationService: AuthenticationService) {
            super(authenticationService);
    }

    closeModal(result?: any): void {
        this.activeModal.close(result || true);
    }
}
