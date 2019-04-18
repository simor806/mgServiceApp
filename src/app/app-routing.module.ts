import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VehiclesComponent} from './dashboard/vehicles/vehicles.component';
import {DiaryComponent} from './dashboard/diary/diary.component';
import {OwnersListComponent} from './dashboard/owners/owners-list/owners-list.component';
import {OwnerResolver} from './dashboard/owners/owner.resolver';
import {OwnerFormComponent} from './dashboard/owners/owner-form/owner-form.component';
import {VehicleFormComponent} from './dashboard/vehicles/vehicle-form/vehicle-form.component';
import {VehicleResolver} from './dashboard/vehicles/vehicle.resolver';

const routes: Routes = [
  {path: 'dashboard', component: VehiclesComponent},
  {path: 'vehicles/:id/diary', component: DiaryComponent},
  {path: 'vehicles', redirectTo: 'dashboard'},
  {path: 'vehicles/:id', component: VehicleFormComponent, resolve: {vehicle: VehicleResolver}},
  {path: 'owners', component: OwnersListComponent},
  {path: 'owners/:id', component: OwnerFormComponent, resolve: {owner: OwnerResolver}},
  {path: '**', redirectTo: 'dashboard'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
