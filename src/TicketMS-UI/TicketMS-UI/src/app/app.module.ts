import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInPageComponent } from './pages/sign-in/sign-in-page.component';
import { AuthPanelComponent } from './components/auth-panel/auth-panel.component';
import { FormsModule } from '@angular/forms';

//import { DataTablesModule } from 'angular-datatables';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { ServicesModule } from '../services/services.module';
import { UtilServicesModule } from '../util-services/util-services.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../core/core.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SeriesListPageComponent } from './pages/serial/series-list/series-list-page.component';
import { ColorsListPageComponent } from './pages/color/colors-list/colors-list-page.component';
import { ColorDetailsModalComponent } from './pages/color/color-details/color-details-modal.component';
import { SerialDetailsModalComponent } from './pages/serial/serial-details/serial-details-modal.component';

@NgModule({
    declarations: [
        AppComponent,
        MainPageComponent,
        SignInPageComponent,

        SeriesListPageComponent,
        SerialDetailsModalComponent,

        ColorsListPageComponent,
        ColorDetailsModalComponent,

        AuthPanelComponent
    ],
    imports: [
        CoreModule,
        ServicesModule,
        UtilServicesModule,

        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,

        NgbModalModule
        //DataTablesModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [
        SerialDetailsModalComponent,
        ColorDetailsModalComponent
    ]
})
export class AppModule { }
