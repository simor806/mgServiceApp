import {MatDateFormats} from '@angular/material';
import {APP_DATE_FORMAT} from '../../../../../app-config';

const YEAR_FORMAT = 'YYYY';

export const CUSTOM_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: APP_DATE_FORMAT
  },
  display: {
    dateInput: APP_DATE_FORMAT,
    monthYearLabel: YEAR_FORMAT,
    dateA11yLabel: APP_DATE_FORMAT,
    monthYearA11yLabel: YEAR_FORMAT,
  }
};
