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
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import { InputOnlyNumbersDirective } from './directives/input-only-numbers.directive';

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

const otherModules = [
  NgxMatSelectSearchModule
];

const customDirectives = [
  InputOnlyNumbersDirective,
  InputThousandsSeparatorDirective
];

@NgModule({
  declarations: [
    ...customDirectives,
  ],
  imports: [
    CommonModule,
    ...materialModules,
    ...otherModules
  ],
  exports: [
    ...customDirectives,
    ...materialModules,
    ...otherModules
  ]
})
export class MaterialModule { }
