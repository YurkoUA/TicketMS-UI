import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Location } from "@angular/common";
import { BaseComponent } from "../base-component";
import { AuthenticationService } from "../../services/authentication.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Injector } from "@angular/core";

export abstract class BaseModal extends BaseComponent {
    constructor(injector: Injector) {

        super(injector);
        this.activeModal = injector.get(NgbActiveModal);
    }

    protected activeModal: NgbActiveModal;

    closeModal(result?: any): void {
        this.activeModal.close(result || true);
    }
}
