import { Component, OnInit } from '@angular/core';
import {MaterialColor} from '../../../../../material/material-color.enum';
import {MaterialIcon} from '../../../../../material/material-icon.enum';
import {BaseButtonComponent} from '../base-button/base-button.component';

@Component({
  selector: 'app-delete-button',
  templateUrl: '../base-button/base-button.component.html',
  styleUrls: ['../base-button/base-button.component.scss']
})
export class DeleteButtonComponent extends BaseButtonComponent implements OnInit {

  constructor() {
    super();
    this.color = MaterialColor.warn;
    this.icon = MaterialIcon.delete;
    this.text = 'Usuń';
  }

  ngOnInit() {
  }

}
