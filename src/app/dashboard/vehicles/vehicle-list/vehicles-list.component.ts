import { Component, OnInit } from '@angular/core';
import {Vehicle} from '../../../model/vehicle';
import {VehicleService} from '../vehicle.service';
import {OwnerService} from '../../owners/owner.service';
import {Owner} from '../../../model/owner';
import {forkJoin} from 'rxjs';
import {MatTableDataSource} from '@angular/material';

interface VehicleListItem extends Vehicle {
  owners: Owner[];
  ownersNames: string[];
}

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.scss']
})
export class VehiclesListComponent implements OnInit {

  public displayedColumns: string[] = ['alert', 'registrationNumber', 'brand', 'year', 'mileage', 'owners'];
  public dataSource: MatTableDataSource<VehicleListItem>;

  constructor(private vehicleService: VehicleService,
              private ownerService: OwnerService) {
  }

  ngOnInit() {
    forkJoin(
      this.vehicleService.getVehicles(),
      this.ownerService.getOwners()
    ).subscribe(([vehicles, owners]: [Vehicle[], Owner[]]) => {
      const vehicleList = vehicles.map((vehicle: Vehicle) => <VehicleListItem> vehicle);
      vehicleList.forEach((vehicle: VehicleListItem) => {
        const filteredOwners = owners.filter((owner: Owner) => vehicle.ownersIds.includes(owner.id));
        vehicle.owners = filteredOwners;
        vehicle.ownersNames = filteredOwners.map((owner: Owner) => owner.fullName);
      });

      this.dataSource = new MatTableDataSource(vehicleList);
    });
  }

}
