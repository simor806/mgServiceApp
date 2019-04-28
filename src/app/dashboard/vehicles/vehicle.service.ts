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

  getVehicle(id: number): Observable<Vehicle> {
    return this.http.get<VehicleAttrs>(`/api/vehicles/${id}?_embed=diary`).pipe(
      map((pilotAttrs) => new Vehicle(pilotAttrs))
    );
  }

  saveVehicle(vehicleAttrs: VehicleAttrs): Observable<Vehicle> {
    if (vehicleAttrs.id) {
      return this.editVehicle(vehicleAttrs);
    } else {
      return this.createVehicle(vehicleAttrs);
    }
  }

  private editVehicle(vehicleAttrs: VehicleAttrs): Observable<Vehicle> {
    return this.http.put<VehicleAttrs>(`/api/vehicles/${vehicleAttrs.id}`, vehicleAttrs).pipe(
      map((data) => new Vehicle(data))
    );
  }
  private createVehicle(vehicleAttrs: VehicleAttrs): Observable<Vehicle> {
    return this.http.post<VehicleAttrs>(`/api/vehicles`, vehicleAttrs).pipe(
      map((data) => new Vehicle(data))
    );
  }

  public deleteVehicle(vehicleId: number): Observable<Vehicle> {
    return this.http.delete<VehicleAttrs>(`/api/vehicles/${vehicleId}`);
  }
}
