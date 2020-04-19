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
import { DeleteButtonComponent } from './shared-components/buttons/delete-button/delete-button.component';
import { PhoneLinkComponent } from './shared-components/others/phone-link/phone-link.component';
import { DatepickerComponent } from './shared-components/input/datepicker/datepicker.component';
import { ReactiveFormsModule } from '@angular/forms';

const baseComponents = [
  BaseButtonComponent
];

const buttons = [
  AddButtonComponent,
  DeleteButtonComponent,
  EditButtonComponent
];

const dialogs = [
  ConfirmationDialogComponent
];

const inputs = [
  DatepickerComponent,
  FilterInputComponent
];

const layout = [
  HeaderComponent,
  LayoutComponent,
  SidenavListComponent
];

const others = [
  PhoneLinkComponent
];

@NgModule({
  declarations: [
    ...baseComponents,
    ...buttons,
    ...dialogs,
    ...inputs,
    ...layout,
    ...others
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule
  ],
  entryComponents: [...dialogs],
  exports: [
    ...buttons,
    ...inputs,
    ...layout,
    ...others
  ]
})
export class GuiModule { }
