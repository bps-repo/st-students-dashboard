import {StudentStatus} from "../enums/StudentStatus";
import {ClassEntity} from "./ClassEntity";
import {Unit} from "./Unit";
import {UnitProgress} from "./UnitProgress";

export interface Student {
  id?: string;
  name: string;
  email: string;
  status: StudentStatus;
  centerId: string;
  userId: string;
  currentClass: ClassEntity;
  currentUnit: Unit,
  classes?: ClassEntity[],
  unitProgresses?: UnitProgress[]
}
