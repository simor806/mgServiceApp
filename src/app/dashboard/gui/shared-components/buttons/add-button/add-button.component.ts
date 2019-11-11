import {Component, OnInit} from '@angular/core';
import {BaseButtonComponent} from '../base-button/base-button.component';
import {MaterialColor} from '../../../../../material/material-color.enum';
import {MaterialIcon} from '../../../../../material/material-icon.enum';

@Component({
  selector: 'app-add-button',
  templateUrl: '../base-button/base-button.component.html',
  styleUrls: ['../base-button/base-button.component.scss']
})
export class AddButtonComponent extends BaseButtonComponent implements OnInit {

  constructor() {
    super();
    this.color = MaterialColor.primary;
    this.icon = MaterialIcon.add;
    this.text = 'Dodaj';
  }

  ngOnInit() {
  }

}
