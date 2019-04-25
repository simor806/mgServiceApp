import {Component, Input, OnInit} from '@angular/core';
import {DiaryEntry} from '../../model/diary-entry';
import {DiaryService} from './diary.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {

  @Input() vehicleId: number;
  public diary: DiaryEntry[];

  constructor(private diaryService: DiaryService) { }

  ngOnInit() {
    if (this.vehicleId) {
      this.diaryService.getDiaryByVehicleId(this.vehicleId).subscribe((diary: DiaryEntry[]) => this.diary = diary);
    }
  }
}
