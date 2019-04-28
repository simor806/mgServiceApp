import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { VehiclesListComponent } from './vehicles/vehicle-list/vehicles-list.component';
import {ModelModule} from '../model/model.module';
import { DiaryComponent } from './diary/diary.component';
import {RouterModule} from '@angular/router';
import {VehicleFormComponent} from './vehicles/vehicle-form/vehicle-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { VehicleDetailsComponent } from './vehicles/vehicle-details/vehicle-details.component';
import {DiaryModule} from './diary/diary.module';

@NgModule({
  declarations: [VehiclesListComponent, VehicleFormComponent, VehicleDetailsComponent],
  exports: [VehiclesListComponent],
  imports: [
    CommonModule,
    ModelModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DiaryModule
  ],
  providers: [DatePipe]
})
export class DashboardModule { }
