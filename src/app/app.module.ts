import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {OwnersModule} from './dashboard/owners/owners.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    OwnersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
