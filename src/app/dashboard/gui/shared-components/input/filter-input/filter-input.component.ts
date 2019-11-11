import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss']
})
export class FilterInputComponent implements OnInit {

  @Input() dataSource: MatTableDataSource<any>;

  constructor() { }

  ngOnInit() {
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
