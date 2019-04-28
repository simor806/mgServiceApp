import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {DiaryService} from '../diary.service';
import {DiaryEntry, DiaryEntryAttrs} from '../../../model/diary-entry';
import {RepairService} from '../../repairs/repair.service';
import {Repair} from '../../../model/repair';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-diary-form',
  templateUrl: './diary-form.component.html',
  styleUrls: ['./diary-form.component.scss']
})
export class DiaryFormComponent implements OnInit {

  public form: FormGroup;
  public repairs: Repair[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private diaryService: DiaryService,
              private datePipe: DatePipe,
              private repairsService: RepairService) { }

  ngOnInit() {
    this.route.data
      .pipe(map((data) => data.diary))
      .subscribe((diary: DiaryEntry) => {
        this.form = new FormGroup({
          id: new FormControl(diary.id),
          vehicleId: new FormControl(diary.vehicleId, {
            validators: [Validators.required]
          }),
          date: new FormControl(diary.date || this.datePipe.transform(Date.now(), 'yyyy-MM-dd'), {
            validators: [Validators.required]
          }),
          mileage: new FormControl(diary.mileage, {
            validators: [Validators.required]
          }),
          repairs: new FormControl(diary.repairs, {
            validators: [Validators.required]
          }),
          additionalRepairs: new FormControl(diary.additionalRepairs ? diary.additionalRepairs.join('\n') : null),
          isOilChanged: new FormControl(diary.isOilChanged),
          note: new FormControl(diary.note),
          imageUrls: new FormControl(diary.imageUrls)
        }, {updateOn: 'blur'});
      });

    this.repairsService.getRepairs().subscribe((repairs: Repair[]) => this.repairs = repairs);
  }

  public save(): void {
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
}
