import { Component } from '@angular/core';
import { IConfirmOptions } from '../../../models/interfaces/confirm-options.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-confirm-modal',
    templateUrl: './confirm-modal.component.html'
})
export class ConfirmModalComponent {
    constructor(private activeModal: NgbActiveModal) {
    }

    options: IConfirmOptions;

    confirm(): void {
        this.options.onConfirm();
        this.activeModal.close();
    }

    cancel(): void {
        if (this.options.onCancel) {
            this.options.onCancel();
        }
        this.activeModal.close();
    }
}
