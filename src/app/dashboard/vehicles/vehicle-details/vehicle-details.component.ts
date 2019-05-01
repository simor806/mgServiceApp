import {Component, Input, OnInit} from '@angular/core';
import {Vehicle} from '../../../model/vehicle';
import {VehicleService} from '../vehicle.service';
import {ActivatedRoute} from '@angular/router';
import {OwnerService} from '../../owners/owner.service';
import {forkJoin} from 'rxjs';
import {Owner} from '../../../model/owner';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {

  public vehicle: Vehicle;
  public vehicleId: number;
  public owners = new Map<number, Owner>();

  constructor(private route: ActivatedRoute, private vehicleService: VehicleService, private ownerService: OwnerService) {
  }

  ngOnInit() {
    this.vehicleId = Number(this.route.snapshot.params.vehicleId);
    forkJoin(
      this.vehicleService.getVehicle(this.vehicleId),
      this.ownerService.getOwners()
    ).subscribe(([vehicle, owners]) => {
        this.vehicle = vehicle;
        owners.forEach((owner: Owner) => this.owners.set(owner.id, owner));
    });
  }

  public deleteVehicle(vehicleId: number) {
    this.vehicleService.deleteVehicle(vehicleId);
  }
}
