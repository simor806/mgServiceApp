import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Owner} from '../../model/owner';
import {StaticDataSource} from '../../model/static.datasource';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http: HttpClient,
              private staticDS: StaticDataSource,
              ) { }

  // getOwners(): Observable<Owner[]> {
  //   // return this.http.get<PilotAttrs[]>('/api/pilots').pipe(
  //   //   map((data) => data.map((pilotAttrs) => new Pilot(pilotAttrs)))
  //   // );
  // }
  getOwners(): Observable<Owner[]> {
    return this.staticDS.getOwners();
  }



  // getOwner(id: number): Observable<Owner> {
  //   // return this.http.get<PilotAttrs>(`/api/pilots/${id}`).pipe(
  //   //   map((pilotAttrs) => new Pilot(pilotAttrs))
  //   // );
  // }
  getOwner(id: number): Observable<Owner> {
    return this.staticDS.getOwner(id);
  }
}
