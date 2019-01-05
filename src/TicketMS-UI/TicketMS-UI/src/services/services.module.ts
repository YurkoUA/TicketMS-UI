import { NgModule } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AccountService } from './api-services/account.service';
import { SerialService } from './api-services/serial.service';
import { ColorService } from './api-services/color.service';
import { PackageService } from './api-services/package.service';
import { UiUtilService } from './ui-services/ui-util.service';
import { NominalService } from './api-services/nominal.service';
import { TicketService } from './api-services/ticket.service';

@NgModule({
    providers: [
        AccountService,
        { provide: 'AccountService', useExisting: AccountService }, 

        AuthenticationService,
        { provide: 'AuthenticationService', useExisting: AuthenticationService },

        SerialService,
        { provide: 'SerialService', useExisting: SerialService },

        ColorService,
        { provide: 'ColorService', useExisting: ColorService },

        NominalService,
        { provide: 'NominalService', useExisting: NominalService },

        PackageService,
        { provide: 'PackageService', useExisting: PackageService },

        TicketService,
        { provide: 'TicketService', useExisting: TicketService },

        UiUtilService
    ],
    imports: [
    ]
})
export class ServicesModule {
}
