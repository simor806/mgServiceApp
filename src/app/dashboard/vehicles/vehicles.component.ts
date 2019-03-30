import { Component, OnInit } from '@angular/core';
import {StaticDataSource} from '../../model/static.datasource';
import {Vehicle} from '../../model/vehicle';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.sass']
})
export class VehiclesComponent implements OnInit {

  public vehicles: Vehicle[];

  constructor(private staticDS: StaticDataSource) { }

  ngOnInit() {
    this.staticDS.getVehicles().subscribe((vehicles: Vehicle[]) => this.vehicles = vehicles);
  }

}
