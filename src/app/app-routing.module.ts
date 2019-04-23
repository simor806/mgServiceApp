import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VehiclesListComponent} from './dashboard/vehicles/vehicle-list/vehicles-list.component';
import {OwnersListComponent} from './dashboard/owners/owners-list/owners-list.component';
import {OwnerResolver} from './dashboard/owners/owner.resolver';
import {OwnerFormComponent} from './dashboard/owners/owner-form/owner-form.component';
import {VehicleFormComponent} from './dashboard/vehicles/vehicle-form/vehicle-form.component';
import {VehicleResolver} from './dashboard/vehicles/vehicle.resolver';
import {VehicleDetailsComponent} from './dashboard/vehicles/vehicle-details/vehicle-details.component';
import {RepairListComponent} from './dashboard/repairs/repair-list/repair-list.component';

const routes: Routes = [
  {path: 'dashboard', component: VehiclesListComponent},
  {path: 'vehicles/:id/diary', component: VehicleDetailsComponent},
  {path: 'vehicles', redirectTo: 'dashboard'},
  {path: 'vehicles/:id', component: VehicleFormComponent, resolve: {vehicle: VehicleResolver}},
  {path: 'owners', component: OwnersListComponent},
  {path: 'owners/:id', component: OwnerFormComponent, resolve: {owner: OwnerResolver}},
  {path: 'repairs', component: RepairListComponent},
  {path: '**', redirectTo: 'dashboard'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
