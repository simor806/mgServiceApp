import { Injectable } from '@angular/core';
import {from, Observable} from 'rxjs';
import {DiaryEntry} from './diary-entry';
import {Owner} from './owner';
import {Repair} from './repair';
import {Vehicle} from './vehicle';

@Injectable()
export class StaticDataSource {
  private diary: DiaryEntry[] = [
      new DiaryEntry(1, 1, new Date('2019-01-02'), 120000, [], ['Myjnia', 'Odgrzybianie'], false, 'Notatka'),
      new DiaryEntry(2, 1, new Date('2019-03-20'), 150000, [], ['Myjnia', 'Odgrzybianie'], false, 'Notatka'),
  ];
  private owners: Owner[] = [
  ];
  private standardRepairs: Repair[] = [];
  private vehicles: Vehicle[] = [];

  getDiary(vehicleId: number): Observable<DiaryEntry[]> {
    return from([this.diary.filter((diaryEntry: DiaryEntry) => diaryEntry.vehicleId == vehicleId)]);
  }

  getOwner(id: number): Observable<Owner> {
    return from(this.owners.filter((owner: Owner) => owner.id == id));
  }

  getOwners(): Observable<Owner[]> {
    return from([this.owners]);
  }

  getStandardRepair(id: number): Observable<Repair> {
    return from(this.standardRepairs.filter((repair: Repair) => repair.id == id));
  }

  getVehicles(): Observable<Vehicle[]> {
    return from([this.vehicles]);
  }
}
