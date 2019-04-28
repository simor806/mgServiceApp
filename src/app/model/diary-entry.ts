export interface DiaryEntryAttrs {
  id: number;
  vehicleId: number;
  date: string;
  mileage: number;
  repairs: string[];
  additionalRepairs: string[];
  isOilChanged: boolean;
  note: string;
  imageUrls: string[];
}

export class DiaryEntry {
  id: number;
  vehicleId: number;
  date: string;
  mileage: number;
  repairs: string[];
  additionalRepairs: string[];
  isOilChanged: boolean;
  note: string;
  imageUrls: string[];

  constructor(diaryEntryAttrs: Partial<DiaryEntryAttrs> = {}) {
    this.id = diaryEntryAttrs.id;
    this.vehicleId = diaryEntryAttrs.vehicleId;
    this.date = diaryEntryAttrs.date;
    this.mileage = diaryEntryAttrs.mileage;
    this.repairs = diaryEntryAttrs.repairs;
    this.additionalRepairs = diaryEntryAttrs.additionalRepairs;
    this.isOilChanged = diaryEntryAttrs.isOilChanged;
    this.note = diaryEntryAttrs.note;
    this.imageUrls = diaryEntryAttrs.imageUrls;
  }
}
