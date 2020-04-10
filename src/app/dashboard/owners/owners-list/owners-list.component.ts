import { Component, OnInit } from '@angular/core';
import {Owner} from '../../../model/owner';
import {OwnerService} from '../owner.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-owners-list',
  templateUrl: './owners-list.component.html',
  styleUrls: ['./owners-list.component.scss']
})
export class OwnersListComponent implements OnInit {

  public owners: Owner[];
  public displayedColumns: string[] = ['name', 'phone', 'note'];
  public dataSource: MatTableDataSource<Owner>;
  public readonly maxLengthOfOwnerNote = 100;

  constructor(private ownerService: OwnerService) { }

  ngOnInit() {
    this.ownerService.getOwners().subscribe((owners: Owner[]) => this.dataSource = new MatTableDataSource(owners));
  }

}
