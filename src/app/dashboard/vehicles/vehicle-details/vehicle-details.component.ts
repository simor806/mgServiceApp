import {Component, Input, OnInit} from '@angular/core';
import {Vehicle} from '../../../model/vehicle';
import {VehicleService} from '../vehicle.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {

  @Input() vehicle: Vehicle;

  constructor(private route: ActivatedRoute, private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getVehicle(this.route.snapshot.params.id).subscribe((vehicle: Vehicle) => this.vehicle = vehicle);
  }

  public deleteVehicle(vehicleId: number) {
    this.vehicleService.deleteVehicle(vehicleId);
  }
}
