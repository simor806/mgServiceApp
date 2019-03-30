import {Owner} from './owner';
import {DiaryEntry} from './diary-entry';

export class Vehicle {
  id: string;
  brand: string;
  model: string;
  engine: string;
  year: number;
  vin: string;
  mileage: number;
  note: string;
  owners: Owner[];
  diary: DiaryEntry[];
  hasLongLifeOil: boolean;
}
