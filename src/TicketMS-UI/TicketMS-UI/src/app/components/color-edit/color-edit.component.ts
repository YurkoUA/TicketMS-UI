import { Component, OnInit, ViewChild } from '@angular/core';
import { SubmitComponentBase } from '../submit-component-base';
import { ColorCreateModel } from '../../../models/color-create.model';
import { Color } from '../../../models/domain/color';
import { ColorService } from '../../../services/api-services/color.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-color-edit',
    templateUrl: './color-edit.component.html'
})
export class ColorEditComponent extends SubmitComponentBase<ColorCreateModel, Color> {
    constructor(
        private colorService: ColorService,
        private toastr: ToastrService) {
        
            super();
    }

    ngOnInit(): void {
        this.model.Id = this.source.Id;
        this.model.Name = this.source.Name;
        this.model.PaletteName = this.source.PaletteName;
    }

    createModel(): void {
        this.colorService.createColor(this.model)
            .subscribe(id => {
                let color = new Color();
                color.Id = id.Id;
                color.Name = this.model.Name;
                color.PaletteName = this.model.PaletteName;

                this.toastr.success(`Колір "${color.Name}" успішно створено!`);
                this.onSubmitted.emit(color);
            });
    }

    editModel(): void {
        this.colorService.editColor(this.model)
            .subscribe(isOk => {
                this.source.Name = this.model.Name;
                this.source.PaletteName = this.model.PaletteName;

                this.toastr.success(`Колір "${this.model.Name}" успішно збережено!`);
                this.onSubmitted.emit(this.source);
            });
    }
}
