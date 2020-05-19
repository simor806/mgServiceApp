import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {DiaryService} from '../diary.service';
import {DiaryEntry, DiaryEntryAttrs} from '../../../model/diary-entry';
import {RepairService} from '../../repairs/repair.service';
import {Repair} from '../../../model/repair';
import {DatePipe} from '@angular/common';
import {DiaryValidators} from '../diary-validators';
import {Observable} from 'rxjs';
import {MileageParentErrorStateMatcher, RepairsParentErrorStateMatcher} from './ParentErrorStateMacher';
import {Vehicle} from '../../../model/vehicle';
import {VehicleService} from '../../vehicles/vehicle.service';

@Component({
  selector: 'app-diary-form',
  templateUrl: './diary-form.component.html',
  styleUrls: ['./diary-form.component.scss']
})
export class DiaryFormComponent implements OnInit {

  public readonly minMileageValue = 1;

  public form: FormGroup;
  public repairs: Observable<Repair[]>;
  public repairsParentErrorStateMatcher = new RepairsParentErrorStateMatcher();
  public mileageParentErrorStateMatcher = new MileageParentErrorStateMatcher();
  public vehicle: Vehicle;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private diaryService: DiaryService,
              private datePipe: DatePipe,
              private repairsService: RepairService,
              private vehicleService: VehicleService) { }

  ngOnInit() {
    this.route.data
      .pipe(map((data) => data.diary))
      .subscribe((diary: DiaryEntry) => {
        this.form = new FormGroup({
          id: new FormControl(diary.id),
          vehicleId: new FormControl(Number(diary.vehicleId), {
            validators: [Validators.required]
          }),
          date: new FormControl(diary.date || this.datePipe.transform(Date.now(), 'yyyy-MM-dd'), {
            validators: [Validators.required]
          }),
          mileage: new FormControl(diary.mileage, {
            validators: [Validators.min(this.minMileageValue)]
          }),
          repairs: new FormControl(diary.repairs),
          additionalRepairs: new FormControl(diary.additionalRepairs ? diary.additionalRepairs.join('\n') : null),
          isOilChanged: new FormControl(diary.isOilChanged || false),
          note: new FormControl(diary.note),
          imageUrls: new FormControl(diary.imageUrls)
        }, {
          validators: [DiaryValidators.repairsRequired],
          asyncValidators: [DiaryValidators.validateWithOtherDiaryEntries],
          updateOn: 'change'
        });
        this.vehicleService.getVehicle(diary.vehicleId).subscribe((vehicle: Vehicle) => this.vehicle = vehicle);
      });

    this.repairs = this.repairsService.getRepairs();
  }

  public saveDiary(): void {
    const diaryAttrs = this.getDiaryToSave();
    this.diaryService.saveDiaryEntry(diaryAttrs).subscribe(
      () => this.router.navigate(['/vehicles', diaryAttrs.vehicleId, 'diary']),
      () => alert('Nie udało się dodać wpisu do dziennika!')
    );
  }

  private getDiaryToSave(): DiaryEntryAttrs {
    const diaryAttrs: DiaryEntryAttrs = this.form.value;
    const additionalRepairsValue = this.form.get('additionalRepairs').value;
    if (additionalRepairsValue === '' || additionalRepairsValue === null) {
      diaryAttrs.additionalRepairs = null;
    } else {
      diaryAttrs.additionalRepairs = additionalRepairsValue.split('\n');
    }
    return diaryAttrs;
  }

  public log = () => {
    console.log('form', this.form);
    console.log('errors', this.form.errors);
    console.log('hasRerror', this.form.hasError('mileageTooBig'));
  }
}
