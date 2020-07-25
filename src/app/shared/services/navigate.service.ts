import { Injectable } from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {

  constructor(private location: Location, private router: Router) { }

  public goToPreviousPage() {
    if (window.history.length > 2) {
      this.location.back();
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
