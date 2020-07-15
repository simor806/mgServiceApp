import {Directive, ElementRef, forwardRef, HostListener, Input} from '@angular/core';
import {MAT_INPUT_VALUE_ACCESSOR} from '@angular/material';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ThousandsSeparatorPipe} from '../../shared/pipes/thousands-separator.pipe';

@Directive({
  selector: 'input[appInputThousandsSeparator]',
  providers: [
    {provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: InputThousandsSeparatorDirective},
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputThousandsSeparatorDirective), multi: true},
    {provide: ThousandsSeparatorPipe, useClass: ThousandsSeparatorPipe}
  ]
})
export class InputThousandsSeparatorDirective {
  private _value: string;

  constructor(private elementRef: ElementRef<HTMLInputElement>, private thousandsSeparatorPipe: ThousandsSeparatorPipe) {
  }

  get value(): string {
    return this._value;
  }

  @Input('value')
  set value(value: string) {
    this._value = value;
    this.formatValue(value);
  }

  private formatValue(value: string) {
    this.elementRef.nativeElement.value = this.numberWithCommas(value) || '';
  }

  private unFormatValue() {
    const value = this.elementRef.nativeElement.value;
    this._value = value.replace(/[^\d.-]/g, '');
    this.elementRef.nativeElement.value = this._value || '';
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value) {
    this._value = value.replace(/[^\d.-]/g, '');
    this._onChange(this._value);
  }

  @HostListener('blur')
  _onBlur() {
    this.formatValue(this._value);
  }

  @HostListener('focus')
  onFocus() {
    this.unFormatValue();
  }

  _onChange(value: any): void {
  }

  writeValue(value: any) {
    this._value = value;
    this.formatValue(this._value);
  }

  registerOnChange(fn: (value: any) => void) {
    this._onChange = fn;
  }

  registerOnTouched() {
  }

  private numberWithCommas(value: string | number): string {
    if (typeof value === 'number') {
      value = value.toString();
    }
    if (value) {
      if (value.startsWith('.') || (value.length >= 2 && value[1] === '.')) {
        value = 0;
      }
      return this.thousandsSeparatorPipe.transform(value);
    } else {
      return null;
    }
  }

}
