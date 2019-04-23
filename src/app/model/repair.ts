export interface RepairAttrs {
  id: number;
  name: string;
}

export class Repair {
  id: number;
  name: string;

  constructor(repairAttrs: Partial<RepairAttrs> = {}) {
    this.id = repairAttrs.id;
    this.name = repairAttrs.name;
  }
}
