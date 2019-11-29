import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {VehicleService} from '../vehicle.service';
import {Vehicle} from '../../../model/vehicle';
import {OwnerService} from '../../owners/owner.service';
import {Owner} from '../../../model/owner';
import {carsBrands} from '../../../model/car-list';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss']
})
export class VehicleFormComponent implements OnInit {

  public form: FormGroup;
  public owners: Owner[];
  public brandsModelsMap = carsBrands;
  public years = new Array<number>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ownerService: OwnerService,
              private vehicleService: VehicleService) {
  }

  ngOnInit() {
    this.route.data
      .pipe(map((data) => data.vehicle))
      .subscribe((vehicle: Vehicle) => {
        this.form = new FormGroup({
          id: new FormControl(vehicle.id),
          registrationNumber: new FormControl(vehicle.registrationNumber, {
            validators: [Validators.required],
          }),
          brand: new FormControl(vehicle.brand, {
            validators: [Validators.required]
          }),
          model: new FormControl(vehicle.model, {
            validators: [Validators.required]
          }),
          engine: new FormControl(vehicle.engine),
          year: new FormControl(vehicle.year, {
            validators: [Validators.min(1900), Validators.max(2100)]
          }),
          vin: new FormControl(vehicle.vin, {
            validators: [Validators.minLength(17), Validators.maxLength(17)]
          }),
          note: new FormControl(vehicle.note),
          ownersIds: new FormControl(vehicle.ownersIds, {
            validators: [Validators.required]
          }),
          hasLongLifeOil: new FormControl(vehicle.hasLongLifeOil || false),
        }, {updateOn: 'blur'});
      });

    this.ownerService.getOwners().subscribe((owners: Owner[]) => this.owners = owners);

    this.setYears();
  }

  private setYears() {
    for (let i = 1900; i <= new Date().getFullYear(); i++) {
      this.years.push(i);
    }
  }

  public saveVehicle(): void {
    const vehicleAttrs = this.form.value;
    this.vehicleService.saveVehicle(vehicleAttrs).subscribe(
      (vehicle: Vehicle) => this.router.navigate(['/vehicles', vehicle.id, 'diary'], {relativeTo: this.route}),
      () => alert('Nie udało się zapisać pojazdu!')
    );
  }
  //
  // addNewOwner(firstName: string, lastName: string) {
  //   const that = this;
  //   const ownerAttrs = {firstName: firstName, lastName: lastName} as OwnerAttrs;
  //   this.ownerService.saveOwner(ownerAttrs).subscribe((owner: Owner) => {
  //     this.owners.push(owner);
  //     this.addOwnerFormShowed = false;
  //     const currentOwnersId = [];
  //     // const currentOwnersId = that.form.get('ownersId').value;
  //     currentOwnersId.push(owner.id);
  //     // this.form.get('ownersId').setValue(currentOwnersId);
  //   });
  // }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //
  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
}
