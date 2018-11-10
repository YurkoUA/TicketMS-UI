import { NgModule } from '@angular/core';
import { InternalStorageService } from './internal-storage.service';
import { TokenService } from './token.service';
import { HeadersManagerService } from './headers-manager.service';

@NgModule({
    providers: [
        InternalStorageService,
        TokenService,
        HeadersManagerService
    ]
})
export class UtilServicesModule {
}
