import { NgModule } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AccountService } from './api-services/account.service';
import { SerialService } from './api-services/serial.service';
import { ColorService } from './api-services/color.service';
import { PackageService } from './api-services/package.service';
import { UiUtilService } from './ui-services/ui-util.service';

@NgModule({
    providers: [
        AccountService,
        AuthenticationService,
        SerialService,
        ColorService,
        PackageService,

        UiUtilService
    ],
    imports: [
    ]
})
export class ServicesModule {
}
