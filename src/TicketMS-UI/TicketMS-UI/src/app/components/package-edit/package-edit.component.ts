import { Component, OnInit } from '@angular/core';
import { PackageCreateModel } from '../../../models/package-create.model';
import { Package } from '../../../models/domain/package';
import { SubmitComponentBase } from '../submit-component-base';
import { PackageService } from '../../../services/api-services/package.service';
import { ToastrService } from 'ngx-toastr';
import { SelectListType } from '../../../models/enums/select-list-type.enum';

@Component({
    selector: 'app-package-edit',
    templateUrl: './package-edit.component.html'
})
export class PackageEditComponent extends SubmitComponentBase<PackageCreateModel, Package> {
    SelectListType = SelectListType;

    constructor(private packageService: PackageService,
        private toastr: ToastrService) {

        super();
    }

    get showSelectors(): boolean {
        return this.isNew || this.source.TicketsCount == 0;
    }

    ngOnInit(): void {
        if (this.source) {
            this.model.Id = this.source.Id;

            this.model.ColorId = this.source.Color ? this.source.Color.Id : 0;
            this.model.SerialId = this.source.Serial ? this.source.Serial.Id : 0;
            this.model.NominalId = this.source.Nominal ? this.source.Nominal.Id : 0;

            this.model.Note = this.source.Note;
            this.model.FirstDigit = this.source.FirstDigit;
        }
    }

    createModel(): void {
        this.packageService.createPackage(this.model)
            .subscribe(id => {
                this.toastr.success('Пачку успішно створено!');
                this.onSubmitted.emit(null);
            });
    }

    editModel(): void {
        this.packageService.editPackage(this.model)
            .subscribe(isOk => {
                this.toastr.success(`Пачку ID: ${this.model.Id} успішно збережено!`);
                this.onSubmitted.emit(this.source);
            });
    }
}
