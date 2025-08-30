import {StudentStatus} from "../enums/StudentStatus";
import {ClassEntity} from "./ClassEntity";
import {Unit} from "./Unit";
import {UnitProgress} from "./UnitProgress";
import {User} from "./User";
import {Level} from "./Level";

export interface Student {
  id?: string;
  name: string;
  user: User
  enrollmentDate: Date;
  status: StudentStatus;
  centerId: string;
  levelId: string;
  level?: Level;
  studentClass: ClassEntity;
  attendances: any[];
  levelProgressPercentage: number
  certificates: any[]
  currentUnit: Unit,
  classes?: ClassEntity[],
  unitProgresses?: UnitProgress[]
}
