import {ajax} from 'rxjs/ajax';
import {map} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';
import {DiaryEntry} from '../../model/diary-entry';
import * as moment from 'moment';

export class DiaryValidators {

  static validateWithOtherDiaryEntries(formGroup: FormGroup) {
    const id = formGroup.get('id') as FormControl;
    const mileage = formGroup.get('mileage') as FormControl;
    const vehicleId = formGroup.get('vehicleId') as FormControl;
    const date = formGroup.get('date') as FormControl;

    return ajax.get(`/api/diary?vehicleId=${vehicleId.value}&_sort=date&_order=desc&id_ne=${id.value}`)
      .pipe(
        map((ajaxResponse) => ajaxResponse.response),
        map((diary: DiaryEntry[]) => {
          let error = null;
          diary.forEach((diaryEntry: DiaryEntry) => {
            if (moment(diaryEntry.date) > moment(date.value)) {
              if (diaryEntry.mileage <= mileage.value) {
                error = {mileageTooBig: true};
              }
            } else if (moment(diaryEntry.date) < moment(date.value)) {
              if (diaryEntry.mileage > mileage.value) {
                error = {mileageTooSmall: true};
              }
            } else {
              error = {sameDates: true};
            }
          });
          return error;
        })
    );
  }
}
