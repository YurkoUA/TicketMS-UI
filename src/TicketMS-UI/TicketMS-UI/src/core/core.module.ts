import { NgModule } from '@angular/core';
import { AuthorizeGuard } from './guards/authorize.guard';
import { AnonymousGuard } from './guards/anonymous.guard';
import { ServicesModule } from '../services/services.module';
import { LogoutGuard } from './guards/log-out.guard';
import { ModalClickDirective } from './directives/modal-click.directive';
import { SerialNameValidator } from './validators/serial-name.validator.directive';
import { PreventDefaultClickDirective } from './directives/prevent-default-click.directive';
import { PackageStatusPipe } from './pipes/package-status.pipe';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { UrlTreeDirective } from './directives/url-tree.directive';
import { SerialNumberValidator } from './validators/serial-number.validator.directive';
import { TicketNumberValidator } from './validators/ticket-number.validator.directive';

@NgModule({
    providers: [
        AuthorizeGuard,
        AnonymousGuard,
        LogoutGuard
    ],
    imports: [
        ServicesModule
    ],
    declarations: [
        ModalClickDirective,

        SerialNameValidator,
        SerialNumberValidator,
        TicketNumberValidator,

        PreventDefaultClickDirective,
        UrlTreeDirective,

        PackageStatusPipe,
        YesNoPipe
    ],
    exports: [
        ModalClickDirective,
        
        SerialNameValidator,
        SerialNumberValidator,
        TicketNumberValidator,

        PreventDefaultClickDirective,
        UrlTreeDirective,
        
        PackageStatusPipe,
        YesNoPipe
    ]
})
export class CoreModule {
}
