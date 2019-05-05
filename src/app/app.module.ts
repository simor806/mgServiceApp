import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {OwnersModule} from './dashboard/owners/owners.module';
import {RepairsModule} from './dashboard/repairs/repairs.module';
import {DiaryModule} from './dashboard/diary/diary.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GuiModule} from './dashboard/gui/gui.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DashboardModule,
    DiaryModule,
    GuiModule,
    OwnersModule,
    RepairsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
