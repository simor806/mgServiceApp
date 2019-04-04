import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Vehicle, VehicleAttrs} from '../../model/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<VehicleAttrs[]>('/api/vehicles').pipe(
      map((data: VehicleAttrs[]) => data.map((vehicleAttrs) => new Vehicle(vehicleAttrs)))
    );
  }
}
