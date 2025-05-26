export interface Unit {
  id: string;
  name: String,
  description: string,
  orderUnit: string,
  levelId: string,
  status: UnitStatus;
}



export enum UnitStatus {
  LOCK = "lock",
  AVAILABLE = "available",
  COMPLETE = "complete",
}
