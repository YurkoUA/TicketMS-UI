import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationService } from "../../services/authentication.service";
import { BaseComponent } from "../base-component";

export abstract class BasePage extends BaseComponent {
    constructor(
        router: Router,
        activeRoute: ActivatedRoute,
        location: Location,
        modalService: NgbModal,
        authenticationService: AuthenticationService
    ) {
        super(authenticationService, modalService, location, activeRoute, router);
    }
}
