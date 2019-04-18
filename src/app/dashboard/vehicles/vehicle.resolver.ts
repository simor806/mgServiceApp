import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Vehicle} from '../../model/vehicle';
import {VehicleService} from './vehicle.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleResolver implements Resolve<Vehicle> {

  constructor(private vehicleService: VehicleService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Vehicle> {
    if (route.params.id === 'new') {
      return of(new Vehicle());
    } else {
      return this.vehicleService.getVehicle(route.params.id);
    }
  }
}
