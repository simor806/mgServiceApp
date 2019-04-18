import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesComponent } from './vehicles/vehicles.component';
import {ModelModule} from '../model/model.module';
import { DiaryComponent } from './diary/diary.component';
import {RouterModule} from '@angular/router';
import {VehicleFormComponent} from './vehicles/vehicle-form/vehicle-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [VehiclesComponent, VehicleFormComponent, DiaryComponent],
  exports: [DiaryComponent, VehiclesComponent],
  imports: [
    CommonModule,
    ModelModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
