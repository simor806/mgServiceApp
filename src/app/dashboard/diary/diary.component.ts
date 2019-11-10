import {Component, Input, OnInit} from '@angular/core';
import {Vehicle} from '../../model/vehicle';
import {MatTableDataSource} from '@angular/material';
import {DiaryEntry} from '../../model/diary-entry';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {

  @Input() vehicle: Vehicle;
  public dataSource: MatTableDataSource<DiaryEntry>;
  public displayedColumns: string[] = ['date', 'mileage', 'isOilChanged', 'repairs', 'note'];

  constructor() {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.vehicle.diary);
  }

}
