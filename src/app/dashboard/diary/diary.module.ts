import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DiaryComponent} from './diary.component';
import {DiaryFormComponent} from './diary-form/diary-form.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [DiaryComponent, DiaryFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [DiaryComponent, DiaryFormComponent]
})
export class DiaryModule { }
