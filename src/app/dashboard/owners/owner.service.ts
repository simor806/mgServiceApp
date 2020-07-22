import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Owner, OwnerAttrs} from '../../model/owner';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private readonly API_URL = `${environment.apiUrl}/owners`;

  constructor(private http: HttpClient) {
  }

  getOwners(): Observable<Owner[]> {
    return this.http.get<OwnerAttrs[]>(this.API_URL).pipe(
      map((data) => data.map((ownerAttrs) => new Owner(ownerAttrs)))
    );
  }

  getOwner(id: number): Observable<Owner> {
    return this.http.get<OwnerAttrs>(`${this.API_URL}/${id}`).pipe(
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
    return this.http.put<OwnerAttrs>(`${this.API_URL}/${ownerAttrs.id}`, ownerAttrs).pipe(
      map((data) => new Owner(data))
    );
  }
  private createOwner(ownerAttrs: OwnerAttrs): Observable<Owner> {
    return this.http.post<OwnerAttrs>(this.API_URL, ownerAttrs).pipe(
      map((data) => new Owner(data))
    );
  }

  public deleteOwner(ownerId: number): Observable<Owner> {
    return this.http.delete<Owner>(`${this.API_URL}/${ownerId}`);
  }


}
