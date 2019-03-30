import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesComponent } from './vehicles/vehicles.component';
import {ModelModule} from '../model/model.module';
import { DiaryComponent } from './diary/diary.component';

@NgModule({
  declarations: [VehiclesComponent, DiaryComponent],
  exports: [DiaryComponent, VehiclesComponent],
  imports: [
    CommonModule,
    ModelModule
  ]
})
export class DashboardModule { }
