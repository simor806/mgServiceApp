import { Component, OnInit } from '@angular/core';
import {Vehicle} from '../../../model/vehicle';
import {VehicleService} from '../vehicle.service';
import {OwnerService} from '../../owners/owner.service';
import {Owner} from '../../../model/owner';
import {forkJoin} from 'rxjs';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.scss']
})
export class VehiclesListComponent implements OnInit {

  public vehicles: Vehicle[];
  public owners = new Map<number, Owner>();
  public displayedColumns: string[] = ['alert', 'registrationNumber', 'brand', 'year', 'mileage', 'owners'];
  public dataSource: MatTableDataSource<Vehicle>;

  constructor(private vehicleService: VehicleService, private ownerService: OwnerService) {
  }

  ngOnInit() {

    forkJoin(
      this.vehicleService.getVehicles(),
      this.ownerService.getOwners()
    ).subscribe(([vehicles, owners]) => {
      this.vehicles = vehicles;
      this.dataSource = new MatTableDataSource(vehicles);
      owners.forEach((owner: Owner) => this.owners.set(owner.id, owner));
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
