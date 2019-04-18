import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesListComponent } from './vehicles/vehicles-list.component';
import {ModelModule} from '../model/model.module';
import { DiaryComponent } from './diary/diary.component';
import {RouterModule} from '@angular/router';
import {VehicleFormComponent} from './vehicles/vehicle-form/vehicle-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [VehiclesListComponent, VehicleFormComponent, DiaryComponent],
  exports: [DiaryComponent, VehiclesListComponent],
  imports: [
    CommonModule,
    ModelModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
