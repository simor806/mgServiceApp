import { Component, OnInit } from '@angular/core';
import {Owner} from '../../../model/owner';
import {OwnerService} from '../owner.service';

@Component({
  selector: 'app-owners-list',
  templateUrl: './owners-list.component.html',
  styleUrls: ['./owners-list.component.scss']
})
export class OwnersListComponent implements OnInit {

  public owners: Owner[];

  constructor(private ownerService: OwnerService) { }

  ngOnInit() {
    this.ownerService.getOwners().subscribe((owners: Owner[]) => this.owners = owners);
  }

}
