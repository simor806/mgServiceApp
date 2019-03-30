import {StandardRepair} from './standard-repair';

export class DiaryEntry {
  // id: number;
  // date: Date;
  // mileage: number;
  // repairs: StandardRepair[];
  // additionalRepairs: string[];
  // isOilChanged: boolean;
  // note: string;
  // imageUrls: string[];

  constructor(
    public id?: number,
    public date?: Date,
    public mileage?: number,
    public repairs?: StandardRepair[],
    public additionalRepairs?: string[],
    public isOilChanged?: boolean,
    public note?: string,
    public imageUrls?: string[]) {
  }
}
