import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Repair, RepairAttrs} from '../../model/repair';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RepairService {

  constructor(private http: HttpClient) { }

  getRepairs(): Observable<Repair[]> {
    return this.http.get<RepairAttrs[]>('/api/repairs?_sort=name').pipe(
      map((data) => data.map((repairAttrs) => new Repair(repairAttrs)))
    );
  }

  getRepair(id: number): Observable<Repair> {
    return this.http.get<RepairAttrs>(`/api/repairs/${id}`).pipe(
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
    return this.http.put<RepairAttrs>(`/api/repairs/${repairAttrs.id}`, repairAttrs).pipe(
      map((data) => new Repair(data)));
  }
  private createRepair(repairAttrs: RepairAttrs): Observable<Repair | string> {
    return this.http.post<RepairAttrs>(`/api/repairs`, repairAttrs).pipe(
      map((data) => new Repair(data)));
  }

  public deleteRepair(repairId: number): Observable<Repair> {
    return this.http.delete<Repair>(`/api/repairs/${repairId}`);
  }


}
