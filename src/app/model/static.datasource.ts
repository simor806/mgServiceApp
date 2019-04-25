import { Injectable } from '@angular/core';
import {from, Observable} from 'rxjs';
import {DiaryEntry} from './diary-entry';
import {Owner} from './owner';
import {Repair} from './repair';
import {Vehicle} from './vehicle';

@Injectable()
export class StaticDataSource {
  private diary: DiaryEntry[] = [];
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
