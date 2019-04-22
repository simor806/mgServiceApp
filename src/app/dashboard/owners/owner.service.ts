import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Owner, OwnerAttrs} from '../../model/owner';
import {StaticDataSource} from '../../model/static.datasource';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http: HttpClient,
              private staticDS: StaticDataSource,
              ) { }

  getOwners(): Observable<Owner[]> {
    return this.http.get<OwnerAttrs[]>('/api/owners').pipe(
      map((data) => data.map((ownerAttrs) => new Owner(ownerAttrs)))
    );
  }

  getOwner(id: number): Observable<Owner> {
    return this.http.get<OwnerAttrs>(`/api/owners/${id}`).pipe(
      map((ownerAttrs) => new Owner(ownerAttrs))
    );
  }

  saveOwner(ownerAttrs: OwnerAttrs): Observable<Owner> {
    if (ownerAttrs.id) {
      return this.editOwner(ownerAttrs);
    } else {
      return this.createOwner(ownerAttrs);
    }
  }

  private editOwner(ownerAttrs: OwnerAttrs): Observable<Owner> {
    return this.http.put<OwnerAttrs>(`/api/owners/${ownerAttrs.id}`, ownerAttrs).pipe(
      map((data) => new Owner(data))
    );
  }
  private createOwner(ownerAttrs: OwnerAttrs): Observable<Owner> {
    return this.http.post<OwnerAttrs>(`/api/owners`, ownerAttrs).pipe(
      map((data) => new Owner(data))
    );
  }

  public deleteOwner(ownerId: number): Observable<Owner> {
    return this.http.delete<Owner>(`/api/owners/${ownerId}`);
  }


}
