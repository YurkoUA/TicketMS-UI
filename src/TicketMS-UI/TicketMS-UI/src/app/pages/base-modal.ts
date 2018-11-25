import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Location } from "@angular/common";

export abstract class BaseModal {
    constructor(protected activeModal: NgbActiveModal, protected location: Location) {
    }

    closeModal(result?: any): void {
        this.activeModal.close(result || true);
    }
}
