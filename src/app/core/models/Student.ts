import {StudentStatus} from "../enums/StudentStatus";
import {ClassEntity} from "./ClassEntity";
import {Unit} from "./Unit";
import {UnitProgress} from "./UnitProgress";
import {User} from "./User";

export interface Student {
  id?: string;
  name: string;
  user: User
  enrollmentDate: Date;
  status: StudentStatus;
  centerId: string;
  levelId: string;
  studentClass: ClassEntity;
  attendances: any[];
  levelProgressPercentage: number
  certificates: any[]
  currentUnit: Unit,
  classes?: ClassEntity[],
  unitProgresses?: UnitProgress[]
}
