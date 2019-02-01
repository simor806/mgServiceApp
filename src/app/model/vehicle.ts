import {Owner} from './owner';
import {Repair} from './repair';

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
  repairs: Repair[];

}
