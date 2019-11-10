import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './shared-components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';

@NgModule({
  declarations: [ConfirmationDialogComponent, HeaderComponent, LayoutComponent, SidenavListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule
  ],
  entryComponents: [ConfirmationDialogComponent],
  exports: [HeaderComponent, LayoutComponent, SidenavListComponent]
})
export class GuiModule { }
