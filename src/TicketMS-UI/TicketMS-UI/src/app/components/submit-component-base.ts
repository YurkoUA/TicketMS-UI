import { Identifier } from "../../models/identifier.model";
import { Input, Output, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

export abstract class SubmitComponentBase<TModel extends Identifier, TSource> implements OnInit {
    model = {} as TModel;

    @Input() source = {} as TSource;
    @Output() onSubmitted: EventEmitter<TSource> = new EventEmitter<TSource>();
    @Output() onCancelled: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('modelForm') modelForm: NgForm;

    abstract ngOnInit(): void;
    abstract createModel(): void;
    abstract editModel(): void;

    get isNew(): boolean {
        return !this.model.Id || this.model.Id == 0;
    }

    submitForm(): void {
        if (!this.modelForm.valid)
            return;

        if (this.isNew) {
            this.createModel();
        } else {
            this.editModel();
        }
    }

    cancel(): void {
        this.onCancelled.emit();
    }
}
