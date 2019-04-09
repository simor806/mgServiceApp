export interface OwnerAttrs {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  note: string;
}

export class Owner {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  note: string;

  constructor(
    ownerAttrs: Partial<OwnerAttrs> = {}) {
    this.id = ownerAttrs.id;
    this.firstName = ownerAttrs.firstName;
    this.lastName = ownerAttrs.lastName;
    this.phone = ownerAttrs.phone;
    this.note = ownerAttrs.note;
  }
}
