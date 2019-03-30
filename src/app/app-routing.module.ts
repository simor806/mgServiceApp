import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VehiclesComponent} from './dashboard/vehicles/vehicles.component';
import {DiaryComponent} from './dashboard/diary/diary.component';

const routes: Routes = [
  {path: 'dashboard', component: VehiclesComponent},
  {path: 'diary', component: DiaryComponent},
  {path: '**', redirectTo: 'dashboard'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
