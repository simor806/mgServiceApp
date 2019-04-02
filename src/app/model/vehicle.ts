import {Owner} from './owner';
import {DiaryEntry} from './diary-entry';

export interface VehicleAttrs {
  id: number;
  registrationNumber: string;
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

export class Vehicle {
  // id: number;
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
    vehicleAttrs: VehicleAttrs,
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
    public hasLongLifeOil?: boolean) {

    // constructor(vehicleAttrs: VehicleAttrs) {
      this.id = vehicleAttrs && vehicleAttrs.id || id;
      this.registrationNumber = vehicleAttrs && vehicleAttrs.registrationNumber || registrationNumber;
      this.brand = vehicleAttrs && vehicleAttrs.brand || brand;
      this.model = vehicleAttrs && vehicleAttrs.model || model;
      this.engine = vehicleAttrs && vehicleAttrs.engine || engine;
      this.year = vehicleAttrs && vehicleAttrs.year || year;
      this.vin = vehicleAttrs && vehicleAttrs.vin || vin;
      this.mileage = vehicleAttrs && vehicleAttrs.mileage || mileage;
      this.note = vehicleAttrs && vehicleAttrs.note || note;
      this.owners = vehicleAttrs && vehicleAttrs.owners || owners;
      this.diary = vehicleAttrs && vehicleAttrs.diary || diary;
      this.hasLongLifeOil = vehicleAttrs && vehicleAttrs.hasLongLifeOil || hasLongLifeOil;
    }
}
