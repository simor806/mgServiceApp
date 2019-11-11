import {Component, Input, OnInit} from '@angular/core';
import {MaterialColor} from '../../../../../material/material-color.enum';
import {MaterialIcon} from '../../../../../material/material-icon.enum';

@Component({
  selector: 'app-base-button',
  templateUrl: './base-button.component.html',
  styleUrls: ['./base-button.component.scss']
})
export class BaseButtonComponent implements OnInit {

  @Input() public routerLink: string[];
  @Input() public text: string;
  protected color: MaterialColor;
  protected icon: MaterialIcon;

  constructor() { }

  ngOnInit() {
  }

}
