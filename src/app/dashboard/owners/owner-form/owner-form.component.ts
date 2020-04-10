import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {OwnerService} from '../owner.service';
import {Owner} from '../../../model/owner';

@Component({
  selector: 'app-owner-form',
  templateUrl: './owner-form.component.html',
  styleUrls: ['./owner-form.component.scss']
})
export class OwnerFormComponent implements OnInit {

  form: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private  ownerService: OwnerService) { }

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
      () => this.router.navigate(['../'], {relativeTo: this.route}),
      () => alert('Nie udało się zapisać klienta!')
    );
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

}
