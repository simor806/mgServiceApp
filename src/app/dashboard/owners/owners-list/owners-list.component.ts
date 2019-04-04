import { Component, OnInit } from '@angular/core';
import {StaticDataSource} from '../../../model/static.datasource';
import {Owner} from '../../../model/owner';

@Component({
  selector: 'app-owners-list',
  templateUrl: './owners-list.component.html',
  styleUrls: ['./owners-list.component.scss']
})
export class OwnersListComponent implements OnInit {

  public owners: Owner[];

  constructor(private staticDS: StaticDataSource) { }

  ngOnInit() {
    this.staticDS.getOwners().subscribe((owners: Owner[]) => this.owners = owners);
  }

}
