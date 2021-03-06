import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { SerialService } from '../../../services/api-services/serial.service';
import { NgForm } from '@angular/forms';
import { SubmitComponentBase } from '../submit-component-base';
import { SerialCreateModel } from '../../../models/serial-create.model';
import { Identifier } from '../../../models/identifier.model';
import { Serial } from '../../../models/domain/serial';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-serial-edit',
    templateUrl: './serial-edit.component.html'
})
export class SerialEditComponent extends SubmitComponentBase<SerialCreateModel, Serial> {
    constructor(private serialService: SerialService,
        private toastr: ToastrService) {

        super();
    }

    ngOnInit(): void {
        this.model.Id = this.source.Id;
        this.model.Name = this.source.Name;
        this.model.Note = this.source.Note;
    }

    createModel(): void {
        this.serialService.createSerial(this.model)
            .subscribe(id => {
                let serial = new Serial();
                serial.Id = id.Id;
                serial.Name = this.model.Name;
                serial.Note = this.model.Note;

                this.toastr.success(`Серію "${this.model.Name}" успішно створено!`);
                this.onSubmitted.emit(serial);
            });
    }

    editModel(): void {
        this.serialService.editSerial(this.model)
            .subscribe(isOk => {
                this.source.Name = this.model.Name;
                this.source.Note = this.model.Note;

                this.toastr.success(`Серію "${this.model.Name}" успішно збережено!`);
                this.onSubmitted.emit(this.source);
            });
    }
}
