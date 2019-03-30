import {StandardRepair} from './standard-repair';

export class DiaryEntry {
  id: number;
  date: Date;
  mileage: number;
  repairs: StandardRepair[];
  additionalRepairs: string[];
  isOilChanged: boolean;
  note: string;
  imageUrls: string[];
}
