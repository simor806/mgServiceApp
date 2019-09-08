import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatDialogModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatSidenavModule, MatTableModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

const materialModules = [
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    materialModules
  ],
  exports: [
    materialModules
  ]
})
export class MaterialModule { }
