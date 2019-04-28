import {Component, Input, OnInit} from '@angular/core';
import {Vehicle} from '../../model/vehicle';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {

  @Input() vehicle: Vehicle;

  constructor() {
  }

  ngOnInit() {
  }
}
