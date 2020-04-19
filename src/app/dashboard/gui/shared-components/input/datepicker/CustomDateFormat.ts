import {MatDateFormats} from '@angular/material';

export const CUSTOM_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: {
      year: 'numeric',
      month: 'long',
      day: 'numeric' },
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  }
};
