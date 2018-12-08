import { Identifier } from "../../models/identifier.model";
import { Input, Output, EventEmitter, OnInit } from "@angular/core";

export abstract class SubmitComponentBase<TModel extends Identifier, TSource> implements OnInit {
    model = {} as TModel;

    @Input() source = {} as TSource;
    @Output() onSubmitted: EventEmitter<TSource> = new EventEmitter<TSource>();
    @Output() onCancelled: EventEmitter<any> = new EventEmitter<any>();

    get isNew(): boolean {
        return this.model.Id == 0;
    }

    cancel(): void {
        this.onCancelled.emit();
    }

    abstract ngOnInit(): void;
}
