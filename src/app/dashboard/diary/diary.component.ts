import { Component, OnInit } from '@angular/core';
import {StaticDataSource} from '../../model/static.datasource';
import {DiaryEntry} from '../../model/diary-entry';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {

  public diary: DiaryEntry[];

  constructor(private route: ActivatedRoute, private staticDS: StaticDataSource) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.staticDS.getDiary(params['id']).subscribe((diary: DiaryEntry[]) => this.diary = diary);
    });
  }

}
