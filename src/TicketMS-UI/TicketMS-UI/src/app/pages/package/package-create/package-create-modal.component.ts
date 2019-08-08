import { Component, OnInit, Injector } from '@angular/core';
import { BaseModal } from '../../base-modal';
import { Package } from '../../../../models/domain/package';

@Component({
    selector: 'app-package-create-modal',
    templateUrl: './package-create-modal.component.html'
})
export class PackageCreateModalComponent extends BaseModal {
    constructor(injector: Injector) {
        super(injector);
    }

    onPackageCreated(pack: Package): void {
        
    }
}
