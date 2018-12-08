import { Component, OnInit, Input } from '@angular/core';
import { SerialService } from '../../../../services/api-services/serial.service';
import { Serial } from '../../../../models/domain/serial';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { BaseModal } from '../../base-modal';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../../../services/authentication.service';

@Component({
    selector: 'app-serial-details-modal',
    templateUrl: './serial-details-modal.component.html'
})
export class SerialDetailsModalComponent extends BaseModal {
    @Input() serial: Serial = new Serial();

    isEditMode: boolean = false;

    constructor(
        activeModal: NgbActiveModal,
        location: Location,
        authService: AuthenticationService,
        private router: Router,
        private activeRoute: ActivatedRoute) {
        super(activeModal, location, authService);
    }

    closeModal(): void {
        super.closeModal(this.serial);
    }

    onSerialEdited(serial: Serial): void {
        this.serial = serial;
        this.onCancelled();
    }

    enableEditing(): void {
        this.isEditMode = true;
    }

    onCancelled(): void {
        this.isEditMode = false;
    }
}
