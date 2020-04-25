import {Component, forwardRef, Input} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDatepickerInputEvent} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {CUSTOM_DATE_FORMATS} from './CustomDateFormat';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator} from '@angular/forms';
import * as moment from 'moment';
import {APP_DATE_FORMAT} from '../../../../../app-config';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS},
    {provide: NG_VALUE_ACCESSOR, useExisting: DatepickerComponent, multi: true},
    {provide: NG_VALIDATORS, useExisting: forwardRef(() => DatepickerComponent), multi: true
    },
  ]
})
export class DatepickerComponent implements ControlValueAccessor, Validator {

  @Input() required = false;
  @Input() disabled = false;

  public formControl = new FormControl();
  public maxDate = null;

  private _dateValue;

  get dateValue() {
    return this.formatDate(this._dateValue);
  }
  set dateValue(value) {
    this._dateValue = this.formatDate(value);
    this.propagateChange(this._dateValue);
  }

  @Input() set allowFutureDates(allowFutureDates: boolean) {
    this.maxDate = allowFutureDates ? null : new Date();
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

  public validate(control: FormControl) {
    const errors = Object.assign({}, this.formControl.errors || {});
    return (Object.keys(errors).length && this.formControl.invalid) ? errors : null;
  }

  private propagateChange = (_: any) => { };

  @Input() set asyncParentError(error: string) {
    if (error) {
      this.formControl.setErrors({'asyncParentError': error});
    } else {
      this.formControl.setErrors(null);
      this.formControl.setValue(this.formControl.value);
    }
  }

  private formatDate(date) {
    return moment(date).format(APP_DATE_FORMAT);
  }
}
