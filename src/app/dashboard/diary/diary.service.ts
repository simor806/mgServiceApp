import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DiaryEntry, DiaryEntryAttrs} from '../../model/diary-entry';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getDiaryByVehicleId(vehicleId: number): Observable<DiaryEntry[]> {
    return this.http.get<DiaryEntryAttrs[]>(`${this.API_URL}/vehicles/${vehicleId}/diary`).pipe(
      map((data) => data.map((diaryEntryAttrs) => new DiaryEntry(diaryEntryAttrs)))
    );
  }

  getDiaryEntry(id: number): Observable<DiaryEntry> {
    return this.http.get<DiaryEntryAttrs>(`${this.API_URL}/diary/${id}`).pipe(
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
    return this.http.put<DiaryEntryAttrs>(`${this.API_URL}/diary/${diaryEntryAttrs.id}`, diaryEntryAttrs).pipe(
      map((data) => new DiaryEntry(data))
    );
  }
  private createDiaryEntry(diaryEntryAttrs: DiaryEntryAttrs): Observable<DiaryEntry> {
    return this.http.post<DiaryEntryAttrs>(`${this.API_URL}/diary`, diaryEntryAttrs).pipe(
      map((data) => new DiaryEntry(data))
    );
  }

  public deleteDiaryEntry(id: number): Observable<DiaryEntry> {
    return this.http.delete<DiaryEntry>(`${this.API_URL}/diary/${id}`);
  }
}
