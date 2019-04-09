import { Injectable } from '@angular/core';
import {from, Observable} from 'rxjs';
import {DiaryEntry} from './diary-entry';
import {Owner} from './owner';
import {StandardRepair} from './standard-repair';
import {Vehicle} from './vehicle';

@Injectable()
export class StaticDataSource {
  private diary: DiaryEntry[] = [
      new DiaryEntry(1, 1, new Date('2019-01-02'), 120000, [], ['Myjnia', 'Odgrzybianie'], false, 'Notatka'),
      new DiaryEntry(2, 1, new Date('2019-03-20'), 150000, [], ['Myjnia', 'Odgrzybianie'], false, 'Notatka'),
  ];
  private owners: Owner[] = [
  ];
  private standardRepairs: StandardRepair[] = [
    new StandardRepair(1, 'Przegląd'),
    new StandardRepair(2, 'Wymiana oleju')
  ];
  private vehicles: Vehicle[] = [
    new Vehicle(null, 1, 'OST 4509', 'VW', 'Passat', 'TDI 1.9', 2012, 'VIN 123', 150000, 'Notatka', []),
    new Vehicle(null, 2, 'OPO 1234', 'KIA', 'Ceed', null, 2010, 'VIN 222', 250000, 'Notatka2', []),
    new Vehicle(null, 3, 'DWR 4567', 'Seat', 'Ibiza', null, 2002, 'VIN 333', 350000, 'Notatka3', [])
  ];

  getDiary(vehicleId: number): Observable<DiaryEntry[]> {
    return from([this.diary.filter((diaryEntry: DiaryEntry) => diaryEntry.vehicleId == vehicleId)]);
  }

  getOwner(id: number): Observable<Owner> {
    return from(this.owners.filter((owner: Owner) => owner.id == id));
  }

  getOwners(): Observable<Owner[]> {
    return from([this.owners]);
  }

  getStandardRepair(id: number): Observable<StandardRepair> {
    return from(this.standardRepairs.filter((repair: StandardRepair) => repair.id == id));
  }

  getVehicles(): Observable<Vehicle[]> {
    return from([this.vehicles]);
  }
}
