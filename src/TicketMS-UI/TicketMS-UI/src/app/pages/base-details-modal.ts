import { BaseModal } from "./base-modal";
import { Injector } from "@angular/core";

export abstract class BaseDetailsModal<TModel> extends BaseModal {
    constructor(injector: Injector) {
        super(injector);
    }

    abstract get canBeDeleted(): boolean;

    model: TModel = {} as TModel;
    isEditMode: boolean = false;

    enableEditing(): void {
        this.isEditMode = true;
    }

    onCancelled(): void {
        this.isEditMode = false;
    }

    onModelEdited(model: TModel): void {
        this.model = model;
        this.onCancelled();
    }

    closeModal():void {
        super.closeModal(this.model);
    }
}