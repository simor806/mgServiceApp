import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ThousandsSeparatorPipe} from './pipes/thousands-separator.pipe';

const pipes = [
  ThousandsSeparatorPipe
];

@NgModule({
  declarations: [
    ...pipes
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...pipes
  ]
})
export class SharedModule { }
