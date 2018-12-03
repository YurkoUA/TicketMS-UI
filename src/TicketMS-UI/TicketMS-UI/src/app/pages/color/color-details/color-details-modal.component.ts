import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseModal } from '../../base-modal';
import { Color } from '../../../../models/domain/color';

@Component({
    selector: 'app-color-details-modal',
    templateUrl: './color-details-modal.component.html'
})
export class ColorDetailsModalComponent extends BaseModal {
    @Input() color: Color = new Color();

    constructor(activeModal: NgbActiveModal, location: Location, private router: Router, private activeRoute: ActivatedRoute) {
        super(activeModal, location);
    }

    closeModal(): void {
        super.closeModal();
    }
}
