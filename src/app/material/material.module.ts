import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule, MatCheckboxModule, MatDatepickerModule,
  MatDialogModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule, MatNativeDateModule, MatSelectModule,
  MatSidenavModule, MatTableModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { InputThousandsSeparatorDirective } from './directives/input-thousands-separator.directive';

const materialModules = [
  MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
];

const customDirectives = [
  InputThousandsSeparatorDirective
];

@NgModule({
  declarations: [
    ...customDirectives
  ],
  imports: [
    CommonModule,
    ...materialModules
  ],
  exports: [
    ...customDirectives,
    ...materialModules
  ]
})
export class MaterialModule { }
