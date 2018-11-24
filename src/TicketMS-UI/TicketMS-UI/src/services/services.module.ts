import { NgModule } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AccountService } from './api-services/account.service';
import { SerialService } from './api-services/serial.service';

@NgModule({
    providers: [
        AccountService,
        AuthenticationService,
        SerialService
    ],
    imports: [
    ]
})
export class ServicesModule {
}
