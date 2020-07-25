import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {OwnerService} from '../owner.service';
import {Owner} from '../../../model/owner';
import { Location } from '@angular/common';
import {NavigateService} from '../../../shared/services/navigate.service';

@Component({
  selector: 'app-owner-form',
  templateUrl: './owner-form.component.html',
  styleUrls: ['./owner-form.component.scss']
})
export class OwnerFormComponent implements OnInit {

  form: FormGroup;

  constructor(public navigateService: NavigateService, private route: ActivatedRoute, private router: Router, private ownerService: OwnerService) {
  }

  ngOnInit() {
    this.route.data
      .pipe(map((data) => data.owner))
      .subscribe((owner: Owner) => {
        this.form = new FormGroup({
          id: new FormControl(owner.id),
          firstName: new FormControl(owner.firstName, {
            validators: [Validators.required],
          }),
          lastName: new FormControl(owner.lastName, {
            validators: [Validators.required]
          }),
          phone: new FormControl(owner.phone),
          note: new FormControl(owner.note)
        }, {updateOn: 'blur'});
      });
  }

  saveOwner(): void {
    const ownerAttrs = this.form.value;
    this.ownerService.saveOwner(ownerAttrs).subscribe(
      () => this.navigateService.goToPreviousPage(),
      () => alert('Nie udało się zapisać klienta!')
    );
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

}
