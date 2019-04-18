import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {VehicleService} from '../vehicle.service';
import {Vehicle} from '../../../model/vehicle';
import {OwnerService} from '../../owners/owner.service';
import {Owner} from '../../../model/owner';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss']
})
export class VehicleFormComponent implements OnInit {

  form: FormGroup;
  public owners: Owner[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ownerService: OwnerService,
              private  vehicleService: VehicleService) {
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
          year: new FormControl(vehicle.year),
          vin: new FormControl(vehicle.vin),
          // mileage: new FormControl(vehicle.mileage),
          note: new FormControl(vehicle.note),
          owners: new FormControl(vehicle.owners, {
            validators: [Validators.required]
          }),
          hasLongLifeOil: new FormControl(vehicle.hasLongLifeOil),
        }, {updateOn: 'blur'});
      });

    this.ownerService.getOwners().subscribe((owners: Owner[]) => this.owners = owners);
  }

  save(): void {
    const vehicleAttrs = this.form.value;
    this.vehicleService.saveVehicle(vehicleAttrs).subscribe(
      () => this.router.navigate(['../..'], {relativeTo: this.route}),
      () => alert('Nie udało się zapisać pojazdu!')
    );
  }
}
