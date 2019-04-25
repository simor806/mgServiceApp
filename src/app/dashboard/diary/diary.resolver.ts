import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {DiaryService} from './diary.service';
import {DiaryEntry} from '../../model/diary-entry';

@Injectable({
  providedIn: 'root'
})
export class DiaryResolver implements Resolve<DiaryEntry> {

  constructor(private diaryService: DiaryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DiaryEntry> {
    if (route.params.id === 'new') {
      const diaryEntry = new DiaryEntry();
      diaryEntry.vehicleId = route.params.vehicleId;
      return of(diaryEntry);
    } else {
      return this.diaryService.getDiaryEntry(route.params.id);
    }
  }
}
