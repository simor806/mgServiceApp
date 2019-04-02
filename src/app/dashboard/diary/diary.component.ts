import { Component, OnInit } from '@angular/core';
import {StaticDataSource} from '../../model/static.datasource';
import {Vehicle} from '../../model/vehicle';
import {DiaryEntry} from '../../model/diary-entry';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {

  public diary: DiaryEntry[];

  constructor(private staticDS: StaticDataSource) { }

  ngOnInit() {
    this.staticDS.getDiary(1).subscribe((diary: DiaryEntry[]) => this.diary = diary);
  }

}
