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
import { EditButtonComponent } from './shared-components/buttons/edit-button/edit-button.component';
import { BaseButtonComponent } from './shared-components/buttons/base-button/base-button.component';

const baseComponents = [
  BaseButtonComponent
];

const buttons = [
  AddButtonComponent,
  EditButtonComponent
];

const dialogs = [
  ConfirmationDialogComponent
];

const inputs = [
  FilterInputComponent
];

const layout = [
  HeaderComponent,
  LayoutComponent,
  SidenavListComponent
];

@NgModule({
  declarations: [
    ...baseComponents,
    ...buttons,
    ...dialogs,
    ...inputs,
    ...layout
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule
  ],
  entryComponents: [...dialogs],
  exports: [
    ...buttons,
    ...inputs,
    ...layout]
})
export class GuiModule { }
