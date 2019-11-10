import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DiaryComponent} from './diary.component';
import {DiaryFormComponent} from './diary-form/diary-form.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {GuiModule} from '../gui/gui.module';

@NgModule({
  declarations: [DiaryComponent, DiaryFormComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    GuiModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [DiaryComponent, DiaryFormComponent]
})
export class DiaryModule { }
