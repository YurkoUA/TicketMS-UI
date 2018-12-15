import { NgModule } from '@angular/core';
import { AuthorizeGuard } from './guards/authorize.guard';
import { AnonymousGuard } from './guards/anonymous.guard';
import { ServicesModule } from '../services/services.module';
import { LogoutGuard } from './guards/log-out.guard';
import { ModalClickDirective } from './directives/modal-click.directive';
import { SerialNameValidator } from './validators/serial-name.validator.directive';
import { PreventDefaultClickDirective } from './directives/prevent-default-click.directive';
import { PackageStatusPipe } from './pipes/package-status.pipe';

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
        PreventDefaultClickDirective,

        PackageStatusPipe
    ],
    exports: [
        ModalClickDirective,
        SerialNameValidator,
        PreventDefaultClickDirective,
        
        PackageStatusPipe
    ]
})
export class CoreModule {
}
