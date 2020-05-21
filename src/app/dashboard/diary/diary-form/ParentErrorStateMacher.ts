import {ErrorStateMatcher} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';

export class RepairsParentErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = !!(form && form.submitted);
    const controlInvalid = !!(control && control.invalid);
    const parentInvalid = !!(control && control.parent && control.parent.invalid && (control.parent.dirty || control.parent.touched));
    const repairsError = form.form.controls['repairsGroup'].hasError('repairsRequired');

    return isSubmitted || controlInvalid || (parentInvalid && repairsError);
  }
}

export class MileageParentErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const mainInfoGroup = form.form.controls['mainInfoGroup']
    const isSubmitted = !!(form && form.submitted);
    const controlInvalid = !!(control && control.invalid);
    const parentInvalid = !!(control && control.parent && control.parent.invalid && (control.parent.dirty || control.parent.touched));
    const mileageError = mainInfoGroup.hasError('mileageTooSmall') || mainInfoGroup.hasError('mileageTooBig') || control.hasError('min');

    return isSubmitted || controlInvalid || (parentInvalid && mileageError);
  }
}
