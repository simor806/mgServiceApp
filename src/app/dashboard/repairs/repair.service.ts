import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Repair, RepairAttrs} from '../../model/repair';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RepairService {

  private readonly API_URL = `${environment.apiUrl}/repairs`;

  constructor(private http: HttpClient) { }

  getRepairs(): Observable<Repair[]> {
    return this.http.get<RepairAttrs[]>(`${this.API_URL}?_sort=name`).pipe(
      map((data) => data.map((repairAttrs) => new Repair(repairAttrs)))
    );
  }

  getRepair(id: number): Observable<Repair> {
    return this.http.get<RepairAttrs>(`${this.API_URL}/${id}`).pipe(
      map((repairAttrs) => new Repair(repairAttrs))
    );
  }

  saveRepair(repairAttrs: RepairAttrs): Observable<Repair | string> {
    if (repairAttrs.id) {
      return this.editRepair(repairAttrs);
    } else {
      return this.createRepair(repairAttrs);
    }
  }

  private editRepair(repairAttrs: RepairAttrs): Observable<Repair | string> {
    return this.http.put<RepairAttrs>(`${this.API_URL}/${repairAttrs.id}`, repairAttrs).pipe(
      map((data) => new Repair(data)));
  }
  private createRepair(repairAttrs: RepairAttrs): Observable<Repair | string> {
    return this.http.post<RepairAttrs>(`${this.API_URL}`, repairAttrs).pipe(
      map((data) => new Repair(data)));
  }

  public deleteRepair(repairId: number): Observable<Repair> {
    return this.http.delete<Repair>(`${this.API_URL}/${repairId}`);
  }


}
