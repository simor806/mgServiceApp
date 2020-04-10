import {Component, OnInit} from '@angular/core';
import {Repair, RepairAttrs} from '../../../model/repair';
import {RepairService} from '../repair.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ConfirmationDialogComponent} from '../../gui/shared-components/dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-repair-list',
  templateUrl: './repair-list.component.html',
  styleUrls: ['./repair-list.component.scss']
})
export class RepairListComponent implements OnInit {

  public repairs: Repair[];
  public repairsToEdit = new Map<number, boolean>();

  private dialogRef: MatDialogRef<ConfirmationDialogComponent>;

  constructor(private dialog: MatDialog, private repairService: RepairService) { }

  ngOnInit() {
    this.getRepairs();
  }

  public saveRepair(repairId: number, repairName: string): void {
    if (!repairName) {
      return;
    }
    this.repairService.saveRepair({'id': repairId, 'name': repairName} as RepairAttrs).subscribe((editedRepair: Repair) => {
      this.getRepairs();
    });
    this.repairsToEdit.set(repairId, false);
  }


  public openDeleteRepairConfirmationDialog(repair: Repair) {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmTitle = 'Usunąć usługę?';
    this.dialogRef.componentInstance.confirmMessage = `Usługa "${repair.name}" zostanie trwale usunięta z bazy.`;
    this.dialogRef.componentInstance.confirmColor = 'warn';
    this.dialogRef.componentInstance.confirmButton = 'Usuń';
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRepair(repair.id);
      }
      this.dialogRef = null;
    });
  }

  private deleteRepair(repairId: number): void {
    this.repairService.deleteRepair(repairId).subscribe(
      (deletedRepair: Repair) => this.repairs.splice(this.repairs.findIndex((repair: Repair) => repair.id === repairId), 1),
      () => console.log(`Error deleting repair with id=${repairId}`));
  }

  private getRepairs(): void {
    this.repairService.getRepairs().subscribe((repairs: Repair[]) => {
      this.repairs = repairs;
      repairs.forEach((repair: Repair) => this.repairsToEdit.set(repair.id, false));
    });
  }
}
