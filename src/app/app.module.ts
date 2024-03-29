import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FacebookApiService } from './services/facebook-api.service';
import { HomeComponent } from './home/home.component';
import { NavmenuComponent } from './navmenu/navmenu.component';

import { UtilsService } from './utils';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavmenuComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
        FormsModule        
        // Observable
    ],
    providers: [
        FacebookApiService,
        UtilsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
