import {ajax} from 'rxjs/ajax';
import {map} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';
import {DiaryEntry} from '../../model/diary-entry';
import * as moment from 'moment';
import {of} from 'rxjs';
import {environment} from '../../../environments/environment';

export class DiaryValidators {

  private static API_URL = environment.apiUrl;

  static repairsRequired(formGroup: FormGroup) {
    const repairs = formGroup.get('repairs') as FormControl;
    const additionalRepairs = formGroup.get('additionalRepairs') as FormControl;
    const isOilChanged = formGroup.get('isOilChanged') as FormControl;

    if ((repairs.value && repairs.value.length) || (additionalRepairs.value && additionalRepairs.value.length) || isOilChanged.value) {
      return of(null);
    } else {
      return of({ repairsRequired: true });
    }
  }

  static validateWithOtherDiaryEntries(formGroup: FormGroup) {
    const mileage = formGroup.get('mileage') as FormControl;
    const mileageValue = Number(mileage.value);
    const id = formGroup.get('id') as FormControl;
    const vehicleId = formGroup.get('vehicleId') as FormControl;
    const date = formGroup.get('date') as FormControl;

    return ajax.get(`${DiaryValidators.API_URL}/diary?vehicleId=${vehicleId.value}&_sort=date&_order=desc&id_ne=${id.value}`)
      .pipe(
        map((ajaxResponse) => ajaxResponse.response),
        map((diary: DiaryEntry[]) => {
          let errors = null;
          diary.forEach((diaryEntry: DiaryEntry) => {
            const diaryEntryMileageValue = Number(diaryEntry.mileage);
            if (moment(diaryEntry.date) > moment(date.value)) {
              if (diaryEntryMileageValue && diaryEntryMileageValue <= mileageValue) {
                const mileageTooBigError = {mileageTooBig: diaryEntryMileageValue};
                errors ? Object.assign(errors, mileageTooBigError) : errors = mileageTooBigError;
              }
            } else if (moment(diaryEntry.date) < moment(date.value)) {
              if (diaryEntryMileageValue && diaryEntryMileageValue > mileageValue && mileageValue > 0) {
                const mileageTooSmallError = {mileageTooSmall: diaryEntryMileageValue};
                errors ? Object.assign(errors, mileageTooSmallError) : errors = mileageTooSmallError;
              }
            } else {
              const sameDateError = {sameDates: 'Istnieje już wpis w dzienniku napraw pod tą datą'}
              errors ? Object.assign(errors, sameDateError) : errors = sameDateError;
            }
          });
          return errors;
        })
    );
  }
}
