import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnersListComponent } from './owners-list/owners-list.component';
import { OwnerFormComponent } from './owner-form/owner-form.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [OwnersListComponent, OwnerFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [OwnersListComponent, OwnerFormComponent]
})
export class OwnersModule { }
