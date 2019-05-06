import {Component, OnInit} from '@angular/core';
import {Repair, RepairAttrs} from '../../../model/repair';
import {RepairService} from '../repair.service';

@Component({
  selector: 'app-repair-list',
  templateUrl: './repair-list.component.html',
  styleUrls: ['./repair-list.component.scss']
})
export class RepairListComponent implements OnInit {

  public repairs: Repair[];
  public repairsToEdit = new Map<number, boolean>();

  constructor(private repairService: RepairService) { }

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

  public deleteRepair(repairId: number): void {
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
