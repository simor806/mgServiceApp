import {Component, OnInit} from '@angular/core';
import {MaterialColor} from '../../../../../material/material-color.enum';
import {BaseButtonComponent} from '../base-button/base-button.component';
import {MaterialIcon} from '../../../../../material/material-icon.enum';

@Component({
  selector: 'app-edit-button',
  templateUrl: '../base-button/base-button.component.html',
  styleUrls: ['../base-button/base-button.component.scss']
})
export class EditButtonComponent extends BaseButtonComponent implements OnInit {

  constructor() {
    super();
    this.color = MaterialColor.accent;
    this.icon = MaterialIcon.edit;
    this.text = 'Edytuj';
  }

  ngOnInit() {
  }

}
