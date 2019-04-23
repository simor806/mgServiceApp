import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepairListComponent } from './repair-list/repair-list.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [RepairListComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ]
})
export class RepairsModule { }
