import {Component, Input, OnInit} from '@angular/core';
import {Vehicle} from '../../../model/vehicle';
import {VehicleService} from '../vehicle.service';
import {ActivatedRoute} from '@angular/router';
import {DiaryEntry} from '../../../model/diary-entry';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {

  public vehicle: Vehicle;
  public vehicleId: number;

  constructor(private route: ActivatedRoute, private vehicleService: VehicleService) {
  }

  ngOnInit() {
    this.vehicleId = Number(this.route.snapshot.params.vehicleId);
    this.vehicleService.getVehicle(this.vehicleId).subscribe((vehicle: Vehicle) => {
      this.vehicle = vehicle;
      this.sortDiaryByDate(this.vehicle.diary);
    });
  }

  public deleteVehicle(vehicleId: number) {
    this.vehicleService.deleteVehicle(vehicleId);
  }

  private sortDiaryByDate(diary: DiaryEntry[]) {
    diary.sort((previousDiaryEntry, nextDiaryEntry) => {
      const a = previousDiaryEntry.date.split('/').reverse().join();
      const b = nextDiaryEntry.date.split('/').reverse().join();
      return b < a ? -1 : (b > a ? 1 : 0);
    });
  }
}
