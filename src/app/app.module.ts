import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ExoplanetService } from './exoplanet.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { SystemComponent } from './system/system.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SystemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ExoplanetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
