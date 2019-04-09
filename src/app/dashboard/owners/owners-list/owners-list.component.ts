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

  public deleteOwner(ownerId: number) {
    this.ownerService.deleteOwner(ownerId).subscribe((owner: Owner) => {
      this.owners.splice(this.owners.findIndex((ownerItem: Owner) => ownerItem.id === ownerId), 1);
    }, () => console.log(`Error deleting client with id=${ownerId}`));
  }

}
