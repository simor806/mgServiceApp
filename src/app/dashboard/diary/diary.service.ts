import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DiaryEntry, DiaryEntryAttrs} from '../../model/diary-entry';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  constructor(private http: HttpClient) {
  }

  getDiaryByVehicleId(vehicleId: number): Observable<DiaryEntry[]> {
    return this.http.get<DiaryEntryAttrs[]>(`/api/diary?vehicleId=${vehicleId}`).pipe(
      map((data) => data.map((diaryEntryAttrs) => new DiaryEntry(diaryEntryAttrs)))
    );
  }

  getDiaryEntry(id: number): Observable<DiaryEntry> {
    return this.http.get<DiaryEntryAttrs>(`/api/diary/${id}`).pipe(
      map((diaryEntryAttrs) => new DiaryEntry(diaryEntryAttrs))
    );
  }

  public saveDiaryEntry(diaryEntryAttrs: DiaryEntryAttrs): Observable<DiaryEntry> {
    if (diaryEntryAttrs.id) {
      return this.editDiaryEntry(diaryEntryAttrs);
    } else {
      return this.createDiaryEntry(diaryEntryAttrs);
    }
  }

  private editDiaryEntry(diaryEntryAttrs: DiaryEntryAttrs): Observable<DiaryEntry> {
    return this.http.put<DiaryEntryAttrs>(`/api/diary/${diaryEntryAttrs.id}`, diaryEntryAttrs).pipe(
      map((data) => new DiaryEntry(data))
    );
  }
  private createDiaryEntry(diaryEntryAttrs: DiaryEntryAttrs): Observable<DiaryEntry> {
    return this.http.post<DiaryEntryAttrs>(`/api/diary`, diaryEntryAttrs).pipe(
      map((data) => new DiaryEntry(data))
    );
  }

  public deleteDiaryEntry(id: number): Observable<DiaryEntry> {
    return this.http.delete<DiaryEntry>(`/api/diary/${id}`);
  }
}
