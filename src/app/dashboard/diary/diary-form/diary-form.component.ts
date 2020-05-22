import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {map, takeUntil} from 'rxjs/operators';
import {DiaryService} from '../diary.service';
import {DiaryEntry, DiaryEntryAttrs} from '../../../model/diary-entry';
import {RepairService} from '../../repairs/repair.service';
import {Repair} from '../../../model/repair';
import {DatePipe} from '@angular/common';
import {DiaryValidators} from '../diary-validators';
import {ReplaySubject, Subject} from 'rxjs';
import {MileageParentErrorStateMatcher, RepairsParentErrorStateMatcher} from './ParentErrorStateMacher';
import {Vehicle} from '../../../model/vehicle';
import {VehicleService} from '../../vehicles/vehicle.service';

@Component({
  selector: 'app-diary-form',
  templateUrl: './diary-form.component.html',
  styleUrls: ['./diary-form.component.scss']
})
export class DiaryFormComponent implements OnInit, OnDestroy {

  public readonly minMileageValue = 1;

  public filteredRepairs: ReplaySubject<Repair[]> = new ReplaySubject<Repair[]>(1);
  public form: FormGroup;
  public repairsFilterCtrl: FormControl = new FormControl();
  public repairsParentErrorStateMatcher = new RepairsParentErrorStateMatcher();
  public mileageParentErrorStateMatcher = new MileageParentErrorStateMatcher();
  public vehicle: Vehicle;

  private onDestroy = new Subject<void>();
  private repairs: Repair[];

  constructor(private changeDetector: ChangeDetectorRef,
              private route: ActivatedRoute,
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
          mainInfoGroup: new FormGroup({
            id: new FormControl(diary.id),
            vehicleId: new FormControl(Number(diary.vehicleId), {
              validators: [Validators.required]
            }),
            date: new FormControl(diary.date || this.datePipe.transform(Date.now(), 'yyyy-MM-dd'), {
              validators: [Validators.required]
            }),
            mileage: new FormControl(diary.mileage, {
              validators: [Validators.min(this.minMileageValue)]
            })
          }, {
            asyncValidators: [DiaryValidators.validateWithOtherDiaryEntries],
          }),
          repairsGroup: new FormGroup({
            repairs: new FormControl(diary.repairs),
            additionalRepairs: new FormControl(diary.additionalRepairs ? diary.additionalRepairs.join('\n') : null),
            isOilChanged: new FormControl(diary.isOilChanged || false)
          }, {
            asyncValidators: [DiaryValidators.repairsRequired],
          }),
          note: new FormControl(diary.note),
          imageUrls: new FormControl(diary.imageUrls)
        }, {
          updateOn: 'change'
        });
        this.vehicleService.getVehicle(diary.vehicleId).subscribe((vehicle: Vehicle) => this.vehicle = vehicle);
        this.changeDetector.detectChanges();
      });

    this.repairsService.getRepairs().subscribe((repairs: Repair[]) => {
      this.repairs = repairs;
      this.filteredRepairs.next(this.repairs);
    });

    this.repairsFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.filterRepairs());
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  public saveDiary(): void {
    const diaryAttrs = this.getDiaryToSave();
    this.diaryService.saveDiaryEntry(diaryAttrs).subscribe(
      () => this.router.navigate(['/vehicles', diaryAttrs.vehicleId, 'diary']),
      () => alert('Nie udało się dodać wpisu do dziennika!')
    );
  }

  private getDiaryToSave(): DiaryEntryAttrs {
    const diaryAttrs = this.getDiaryAttrsFromForm();
    const additionalRepairsValue = this.form.get('repairsGroup').get('additionalRepairs').value;
    if (additionalRepairsValue === '' || additionalRepairsValue === null) {
      diaryAttrs.additionalRepairs = null;
    } else {
      diaryAttrs.additionalRepairs = additionalRepairsValue.split('\n');
    }
    return diaryAttrs;
  }

  private filterRepairs() {
    if (!this.repairs) {
      return;
    }
    let searchedValue = this.repairsFilterCtrl.value;
    if (!searchedValue) {
      this.filteredRepairs.next(this.repairs);
      return;
    } else {
      searchedValue = searchedValue.toLowerCase();
    }
    this.filteredRepairs.next(this.repairs.filter((repair: Repair) => repair.name.toLowerCase().indexOf(searchedValue) > -1));
  }

  private getDiaryAttrsFromForm(): DiaryEntryAttrs {
    const diaryEntryAttrs = {
      ...this.form.value,
      ...this.form.get('mainInfoGroup').value,
      ...this.form.get('repairsGroup').value
    } as DiaryEntryAttrs;
    delete diaryEntryAttrs['mainInfoGroup'];
    delete diaryEntryAttrs['repairsGroup'];
    return diaryEntryAttrs;
  }
}
