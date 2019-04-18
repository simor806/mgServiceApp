import { Component, OnInit } from '@angular/core';
import {Vehicle} from '../../model/vehicle';
import {VehicleService} from './vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

  public vehicles: Vehicle[];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getVehicles().subscribe((vehicles: Vehicle[]) => this.vehicles = vehicles);
  }

}
