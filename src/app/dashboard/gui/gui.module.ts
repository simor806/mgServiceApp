import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './shared-components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { FilterInputComponent } from './shared-components/input/filter-input/filter-input.component';
import { AddButtonComponent } from './shared-components/buttons/add-button/add-button.component';

const inputs = [
  FilterInputComponent
];

const buttons = [
  AddButtonComponent
]

@NgModule({
  declarations: [ConfirmationDialogComponent, HeaderComponent, LayoutComponent, SidenavListComponent, ...inputs, ...buttons],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule
  ],
  entryComponents: [ConfirmationDialogComponent],
  exports: [HeaderComponent, LayoutComponent, SidenavListComponent, ...inputs, ...buttons]
})
export class GuiModule { }
