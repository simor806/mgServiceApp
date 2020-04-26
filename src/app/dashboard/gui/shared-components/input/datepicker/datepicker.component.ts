import {Component, forwardRef, Input} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
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

  public formControl = new FormControl();
  public maxDate = null;

  private _innerValue: string;

  @Input() set allowFutureDates(allowFutureDates: boolean) {
    this.maxDate = allowFutureDates ? null : new Date();
  }

  @Input() set asyncParentError(error: string) {
    if (error) {
      this.formControl.setErrors({'asyncParentError': error});
    } else {
      this.formControl.setErrors(null);
      this.formControl.setValue(this.formControl.value);
    }
  }

  public writeValue(value: any) {
    this._innerValue = this.formatDate(value);
    this.formControl.setValue(this._innerValue);
  }

  public registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  public onBlur($event) {
    if ($event.target && $event.target.value && $event.target.value.length === 8 && !isNaN($event.target.value)) {
      const val: string = $event.target.value;
      const month = val.slice(0, 2);
      const day = val.slice(2, 4);
      const year = val.slice(4);
      this._innerValue = this.formatDate(`${year}-${month}-${day}`);
      this.formControl.setValue(this._innerValue);
      this.formControl.updateValueAndValidity();
      this.onChange(this._innerValue);
    }
    if (this.formControl.hasError('matDatepickerParse')) {
      this.formControl.setValue(null);
      this.formControl.updateValueAndValidity();
    }
    this.onTouched();
  }

  public onDateChange(event) {
    this.onChange(this.formatDate(event.value));
  }

  public validate(control: FormControl) {
    const errors = Object.assign({}, this.formControl.errors || {});
    return Object.keys(errors).length && this.formControl.invalid ? errors : null;
  }

  private formatDate(date) {
    return moment(date).format(APP_DATE_FORMAT);
  }

  private onChange: any = () => { };

  private onTouched: any = () => { };
}
