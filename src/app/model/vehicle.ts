import {Owner} from './owner';
import {DiaryEntry} from './diary-entry';

export class Vehicle {
  // id: string;
  // registrationNumber: string;
  // brand: string;
  // model: string;
  // engine: string;
  // year: number;
  // vin: string;
  // mileage: number;
  // note: string;
  // owners: Owner[];
  // diary: DiaryEntry[];
  // hasLongLifeOil: boolean;

  constructor(
    public id?: number,
    public registrationNumber?: string,
    public brand?: string,
    public model?: string,
    public engine?: string,
    public year?: number,
    public vin?: string,
    public mileage?: number,
    public note?: string,
    public owners?: Owner[],
    public diary?: DiaryEntry[],
    public hasLongLifeOil?: boolean) {}
}
