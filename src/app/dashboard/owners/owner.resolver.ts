import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Owner} from '../../model/owner';
import {OwnerService} from './owner.service';

@Injectable({
  providedIn: 'root'
})
export class OwnerResolver implements Resolve<Owner> {

  constructor(private ownerService: OwnerService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Owner> {
    if (route.params.id === 'new') {
      return of(new Owner());
    } else {
      return this.ownerService.getOwner(route.params.id);
    }
  }
}
