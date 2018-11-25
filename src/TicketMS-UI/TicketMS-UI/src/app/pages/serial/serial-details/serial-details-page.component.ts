import { Component, OnInit, Input } from '@angular/core';
import { SerialService } from '../../../../services/api-services/serial.service';
import { Serial } from '../../../../models/domain/serial';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';

@Component({
    selector: 'app-serial-details-page',
    templateUrl: './serial-details-page.component.html'
})
export class SerialDetailsPageComponent {
    @Input() serial: Serial = new Serial();

    constructor(private activeModal: NgbActiveModal, private location: Location) {
    }

    closeModal(): void {
        this.location.go('serial');
        this.activeModal.dismiss('Cross click');
    }
}
