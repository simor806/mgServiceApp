import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnersListComponent } from './owners-list/owners-list.component';
import { OwnerFormComponent } from './owner-form/owner-form.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material/material.module';
import {GuiModule} from '../gui/gui.module';
import {FlexModule} from '@angular/flex-layout';

@NgModule({
  declarations: [OwnersListComponent, OwnerFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FlexModule,
    FormsModule,
    GuiModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [OwnersListComponent, OwnerFormComponent]
})
export class OwnersModule { }
