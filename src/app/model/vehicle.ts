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
  ownersIds: number[];
  diary: DiaryEntry[];
  hasLongLifeOil: boolean;
}

export class Vehicle {
  id: number;
  registrationNumber: string;
  brand: string;
  model: string;
  engine: string;
  year: number;
  vin: string;
  mileage: number;
  note: string;
  ownersIds: number[];
  diary: DiaryEntry[];
  hasLongLifeOil: boolean;

  constructor(vehicleAttrs: Partial<VehicleAttrs> = {}) {
      this.id = vehicleAttrs.id;
      this.registrationNumber = vehicleAttrs.registrationNumber;
      this.brand = vehicleAttrs.brand;
      this.model = vehicleAttrs.model;
      this.engine = vehicleAttrs.engine;
      this.year = vehicleAttrs.year;
      this.vin = vehicleAttrs.vin;
      this.mileage = vehicleAttrs.mileage;
      this.note = vehicleAttrs.note;
      this.ownersIds = vehicleAttrs.ownersIds;
      this.diary = vehicleAttrs.diary;
      this.hasLongLifeOil = vehicleAttrs.hasLongLifeOil;
    }
}
