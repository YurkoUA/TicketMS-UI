import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Location } from "@angular/common";
import { BaseComponent } from "../base-component";
import { AuthenticationService } from "../../services/authentication.service";
import { ActivatedRoute, Router } from "@angular/router";

export abstract class BaseModal extends BaseComponent {
    constructor(protected activeModal: NgbActiveModal,
        location: Location,
        activeRoute: ActivatedRoute,
        router: Router,
        authenticationService: AuthenticationService,
        modalService: NgbModal) {

        super(authenticationService, modalService, location, activeRoute, router);
    }

    closeModal(result?: any): void {
        this.activeModal.close(result || true);
    }
}
