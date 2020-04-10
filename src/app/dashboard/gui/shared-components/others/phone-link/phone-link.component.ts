import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-phone-link',
  templateUrl: './phone-link.component.html',
  styleUrls: ['./phone-link.component.scss']
})
export class PhoneLinkComponent implements OnInit {

  @Input() public phoneNumber: string;

  constructor() { }

  ngOnInit() {
  }

}
