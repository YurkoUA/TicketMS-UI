import { BaseModal } from "./base-modal";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationService } from "../../services/authentication.service";
import { Location } from "@angular/common";

export abstract class BaseDetailsModal<TModel> extends BaseModal {
    constructor(activeModal: NgbActiveModal,
        location: Location,
        authenticationService: AuthenticationService,
        modalService: NgbModal) {

        super(activeModal, location, authenticationService, modalService);
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
}