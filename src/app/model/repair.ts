import {StandardService} from './standard-service';

export class Repair {
  id: number;
  date: Date;
  mileage: number;
  services: StandardService[];
  additionalServices: string[];
  isOilChanged: boolean;
  note: string;
  imageUrls: string[];
}
