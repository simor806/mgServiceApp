import {ajax} from 'rxjs/ajax';
import {map} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';
import {DiaryEntry} from '../../model/diary-entry';
import * as moment from 'moment';
import {of} from 'rxjs';

export class DiaryValidators {

  static repairsRequired(formGroup: FormGroup) {
    const repairs = formGroup.get('repairs') as FormControl;
    const additionalRepairs = formGroup.get('additionalRepairs') as FormControl;

    return (repairs.value || additionalRepairs.value) ? null : {repairsRequired: true};
  }

  static validateWithOtherDiaryEntries(formGroup: FormGroup) {
    const mileage = formGroup.get('mileage') as FormControl;
    const mileageValue = Number(mileage.value);
    if (!mileageValue) {
      return of(null);
    }
    const id = formGroup.get('id') as FormControl;
    const vehicleId = formGroup.get('vehicleId') as FormControl;
    const date = formGroup.get('date') as FormControl;

    return ajax.get(`/api/diary?vehicleId=${vehicleId.value}&_sort=date&_order=desc&id_ne=${id.value}`)
      .pipe(
        map((ajaxResponse) => ajaxResponse.response),
        map((diary: DiaryEntry[]) => {
          let error = null;
          diary.forEach((diaryEntry: DiaryEntry) => {
            const diaryEntryMileageValue = Number(diaryEntry.mileage);
            if (moment(diaryEntry.date) > moment(date.value)) {
              if (diaryEntryMileageValue && diaryEntryMileageValue <= mileageValue) {
                error = {mileageTooBig: true};
              }
            } else if (moment(diaryEntry.date) < moment(date.value)) {
              if (diaryEntryMileageValue && diaryEntryMileageValue > mileageValue && mileageValue > 0) {
                error = {mileageTooSmall: true};
              }
            } else {
              error = {sameDates: 'Istnieje już wpis w dzienniku napraw pod tą datą'};
            }
          });
          return error;
        })
    );
  }
}
