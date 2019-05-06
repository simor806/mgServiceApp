import {Component, OnInit} from '@angular/core';
import {Vehicle} from '../../../model/vehicle';
import {VehicleService} from '../vehicle.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OwnerService} from '../../owners/owner.service';
import {forkJoin} from 'rxjs';
import {Owner} from '../../../model/owner';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ConfirmationDialogComponent} from '../../gui/confirmation-dialog/confirmation-dialog.component';
import {DiaryService} from '../../diary/diary.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {

  public vehicle: Vehicle;
  public vehicleId: number;
  public owners = new Map<number, Owner>();

  private dialogRef: MatDialogRef<ConfirmationDialogComponent>;

  constructor(public dialog: MatDialog,
              private diaryService: DiaryService,
              private route: ActivatedRoute,
              private router: Router,
              private ownerService: OwnerService,
              private vehicleService: VehicleService) {
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

  public deleteVehicle() {
    this.vehicleService.deleteVehicle(this.vehicle.id).subscribe(
      () => this.router.navigate(['/dashboard']),
      () => console.log('Wystąpił błąd podczas usuwania pojazdu')
    );
  }

  openDeleteVehicleConfirmationDialog() {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmTitle = 'Usunąć pojazd?';
    this.dialogRef.componentInstance.confirmMessage = `Pojazd ${this.vehicle.registrationNumber} zostanie trwale usunięty z bazy.`;
    this.dialogRef.componentInstance.confirmColor = 'warn';
    this.dialogRef.componentInstance.confirmButton = 'Usuń';
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteVehicle();
      }
      this.dialogRef = null;
    });
  }
}
