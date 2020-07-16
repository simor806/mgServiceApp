import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Owner} from '../../../model/owner';
import {map} from 'rxjs/operators';
import {ConfirmationDialogComponent} from '../../gui/shared-components/dialogs/confirmation-dialog/confirmation-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {OwnerService} from '../owner.service';
import {VehicleService} from '../../vehicles/vehicle.service';
import {Vehicle, VehicleAttrs} from '../../../model/vehicle';

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.scss']
})
export class OwnerDetailsComponent implements OnInit {

  public owner: Owner;

  private dialogRef: MatDialogRef<ConfirmationDialogComponent>;

  constructor(private dialog: MatDialog,
              private ownerService: OwnerService,
              private vehicleService: VehicleService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data
      .pipe(map((data) => data.owner))
      .subscribe((owner: Owner) => this.owner = owner);
  }

  public openDeleteDialog() {
    this.vehicleService.getVehicles().subscribe((vehicles: Vehicle[]) => {
      const vehiclesIdToDelete: number[] = [];
      const vehiclesToUpdate: Vehicle[] = [];
      vehicles.forEach((vehicle: Vehicle) => {
        if (vehicle.ownersIds.length === 1 && vehicle.ownersIds.includes(this.owner.id)) {
          vehiclesIdToDelete.push(vehicle.id);
        }
        if (vehicle.ownersIds.length > 1 && vehicle.ownersIds.includes(this.owner.id)) {
          vehiclesToUpdate.push(vehicle);
        }
      });
      this.openDeleteOwnerAndVehiclesConfirmationDialog(vehiclesIdToDelete, vehiclesToUpdate);
    });
  }

  private openDeleteOwnerAndVehiclesConfirmationDialog(vehiclesIdToDelete: number[], vehiclesToUpdate: Vehicle[]) {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmTitle = vehiclesIdToDelete.length ? 'Usunąć klienta wraz z pojazdami?' : 'Usunąć klienta?';
    this.dialogRef.componentInstance.confirmMessage = vehiclesIdToDelete.length
      ? `Klient ${this.owner.fullName} posiada przypisane do niego pojazdy. Klient wraz z przypisanymi do niego pojazdami zostanie trwale usunięty z bazy.`
      : `Klient ${this.owner.fullName} zostanie trwale usunięty z bazy.`;
    this.dialogRef.componentInstance.confirmColor = 'warn';
    this.dialogRef.componentInstance.confirmButton = 'Usuń';
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteOwner();
        this.deleteVehicles(vehiclesIdToDelete);
        this.updateVehicles(vehiclesToUpdate);
      }
      this.dialogRef = null;
    });
  }

  private deleteOwner() {
    this.ownerService.deleteOwner(this.owner.id).subscribe(
      () => this.router.navigate(['/owners']),
      () => console.log('Wystąpił błąd podczas usuwania klienta'));
  }

  private deleteVehicles(vehiclesIdToDelete: number[]) {
    vehiclesIdToDelete.forEach((vehicleId: number) => this.vehicleService.deleteVehicle(vehicleId).subscribe(
      () => {},
      () => console.log('Wystąpił błąd podczas usuwania pojazdów')
    ));
  }

  private updateVehicles(vehiclesToUpdate: Vehicle[]) {
    vehiclesToUpdate.forEach((vehicle: Vehicle) => {
      const index = vehicle.ownersIds.indexOf(this.owner.id);
      vehicle.ownersIds.splice(index, 1);
      delete vehicle.diary;
      const vehicleAttrs = {
        ...vehicle
      } as VehicleAttrs;
      this.vehicleService.saveVehicle(vehicleAttrs).subscribe(
        () => {},
        () => console.log('Wystąpił błąd podczas aktualizacji pojazdów')
      );
    });
  }
}
