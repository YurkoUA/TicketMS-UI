import { Component, OnInit } from '@angular/core';
import { SubmitComponentBase } from '../submit-component-base';
import { PackageSpecialCreateModel } from '../../../models/package-special-create.model';
import { Package } from '../../../models/domain/package';
import { PackageService } from '../../../services/api-services/package.service';
import { ToastrService } from 'ngx-toastr';
import { SelectListType } from '../../../models/enums/select-list-type.enum';

@Component({
    selector: 'app-package-special-edit',
    templateUrl: './package-special-edit.component.html'
})
export class PackageSpecialEditComponent extends SubmitComponentBase<PackageSpecialCreateModel, Package> {
    SelectListType = SelectListType;

    constructor(private packageService: PackageService,
        private toastr: ToastrService) {

        super();
     }

    ngOnInit(): void {
        this.model.Id = this.source.Id;
        this.model.Name = this.source.Name;
        this.model.NominalId = this.source.Nominal.Id;
        this.model.Note = this.source.Note;

        if (this.source.Color) {
            this.model.ColorId = this.source.Color.Id;
        }

        if (this.source.Serial) {
            this.model.SerialId = this.source.Serial.Id;
        }
    }

    createModel(): void {
        this.packageService.createSpecialPackage(this.model)
            .subscribe(id => {
                this.toastr.success(`Пачку "${this.model.Name}" успішно створено!`);
                this.onSubmitted.emit(null);
            });
    }

    editModel(): void {
        this.packageService.editSpecialPackage(this.model)
            .subscribe(isOk => {
                this.toastr.success(`Пачку "${this.model.Name}" успішно збережено!`);
                this.onSubmitted.emit(this.source);
            });
    }
}
