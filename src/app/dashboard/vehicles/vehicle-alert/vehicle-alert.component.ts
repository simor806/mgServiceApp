import {Component, Input, OnInit} from '@angular/core';
import {Vehicle} from '../../../model/vehicle';
import {DiaryEntry} from '../../../model/diary-entry';
import * as moment from 'moment';

@Component({
  selector: 'app-vehicle-alert',
  templateUrl: './vehicle-alert.component.html',
  styleUrls: ['./vehicle-alert.component.scss']
})
export class VehicleAlertComponent implements OnInit {

  private readonly DAYS_IN_YEAR = 365;
  private readonly YEARS_TO_OIL_CHANGE_FOR_LONGLIFE = 2;
  public readonly MILEAGE_TO_OIL_CHANGE = 10000;
  public readonly MILEAGE_TO_OIL_LONGLIFE_CHANGE = 30000;
  @Input() public vehicle: Vehicle;
  @Input() public isIcon = false;
  public shouldChangeOilBecauseDate = false;
  public shouldChangeOilBecauseMileage = false;
  public oilNeverChanged = false;
  public diffBetweenTodayAndLastOilChange: number;
  public diffBetweenMileages: number;
  public timeToOilChange = this.DAYS_IN_YEAR;
  public timeToOilLonglifeChange = this.DAYS_IN_YEAR * this.YEARS_TO_OIL_CHANGE_FOR_LONGLIFE;

  constructor() { }

  ngOnInit() {
    if (this.vehicle && this.vehicle.diary && this.vehicle.diary.length > 0) {
      const diaryEntriesWithLastOilChanged = this.vehicle.diary.filter((diaryEntry: DiaryEntry) => diaryEntry.isOilChanged);
      if (diaryEntriesWithLastOilChanged.length > 0) {
        this.checkOilByDate(diaryEntriesWithLastOilChanged[0]);
        this.checkOilByMileage(diaryEntriesWithLastOilChanged[0]);
      } else {
        this.oilNeverChanged = true;
      }
    } else {
      this.oilNeverChanged = true;
    }
  }

  private checkOilByDate(diaryEntryWithLastOilChanged: DiaryEntry) {
    const lastOilChangeDate = moment(diaryEntryWithLastOilChanged.date);
    const today = moment();
    this.diffBetweenTodayAndLastOilChange = today.diff(lastOilChangeDate, 'days');
    if (this.vehicle.hasLongLifeOil) {
      this.shouldChangeOilBecauseDate = this.diffBetweenTodayAndLastOilChange > this.timeToOilLonglifeChange;
    } else {
      this.shouldChangeOilBecauseDate = this.diffBetweenTodayAndLastOilChange > this.timeToOilChange;
    }
  }

  private checkOilByMileage(diaryEntryWithLastOilChanged: DiaryEntry) {
    const lastRepairMileage = this.vehicle.diary[0].mileage;
    const lastOilChangeMileage = diaryEntryWithLastOilChanged.mileage;
    this.diffBetweenMileages = lastRepairMileage - lastOilChangeMileage;
    if (this.vehicle.hasLongLifeOil) {
      this.shouldChangeOilBecauseMileage = this.diffBetweenMileages > this.MILEAGE_TO_OIL_LONGLIFE_CHANGE;
    } else {
      this.shouldChangeOilBecauseMileage = this.diffBetweenMileages > this.MILEAGE_TO_OIL_CHANGE;
    }
  }
}
