import { NgModule } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AccountService } from './api-services/account.service';
import { SerialService } from './api-services/serial.service';
import { ColorService } from './api-services/color.service';

@NgModule({
    providers: [
        AccountService,
        AuthenticationService,
        SerialService,
        ColorService
    ],
    imports: [
    ]
})
export class ServicesModule {
}
