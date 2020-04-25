import {Component, Input} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDatepickerInputEvent} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {CUSTOM_DATE_FORMATS} from './CustomDateFormat';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import * as moment from 'moment';
import {APP_DATE_FORMAT} from '../../../../../app-config';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS},
    {provide: NG_VALUE_ACCESSOR, useExisting: DatepickerComponent, multi: true}
  ]
})
export class DatepickerComponent implements ControlValueAccessor {

  private readonly DATE_FORMAT = 'YYYY-MM-DD';

  public maxDate = new Date();

  private _dateValue;

  @Input()
  get dateValue() {
    return this.formatDate(this._dateValue);
  }
  set dateValue(value) {
    this._dateValue = this.formatDate(value);
    this.propagateChange(this._dateValue);
  }

  public writeValue(value: any) {
    if (value !== undefined) {
      this.dateValue = this.formatDate(value);
    }
  }

  public registerOnChange(fn) {
    this.propagateChange = fn;
  }

  public registerOnTouched() { }

  public addEvent(event: MatDatepickerInputEvent<Date>) {
    this.dateValue = this.formatDate(event.value);
  }

  private propagateChange = (_: any) => { };

  private formatDate(date) {
    return moment(date).format(APP_DATE_FORMAT);
  }
}
