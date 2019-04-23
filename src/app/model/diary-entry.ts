import {Repair} from './repair';

export class DiaryEntry {
  // id: number;
  // vehicleId: number;
  // date: Date;
  // mileage: number;
  // repairs: StandardRepair[];
  // additionalRepairs: string[];
  // isOilChanged: boolean;
  // note: string;
  // imageUrls: string[];

  constructor(
    public id?: number,
    public vehicleId?: number,
    public date?: Date,
    public mileage?: number,
    public repairs?: Repair[],
    public additionalRepairs?: string[],
    public isOilChanged?: boolean,
    public note?: string,
    public imageUrls?: string[]) {
  }
}
