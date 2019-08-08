import { BaseComponent } from "../base-component";
import { Injector } from "@angular/core";

export abstract class BasePage extends BaseComponent {
    constructor(injector: Injector) {
        super(injector);
    }
}
