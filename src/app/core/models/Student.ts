import {StudentStatus} from "../enums/StudentStatus";
import {ClassEntity} from "./ClassEntity";
import {Unit} from "./Unit";
import {UnitProgress} from "./UnitProgress";

export interface Student {
  id?: string;
  name: string;
  userUsername: string,
  userEmail: string,
  userFirstName: string,
  email: string;
  enrollmentDate: Date;
  centerName: string;
  status: StudentStatus;
  centerId: string;
  levelId: string;
  userId: string;
  studentClass: ClassEntity;
  attendances: any[];
  certificates: any[]
  currentUnit: Unit,
  classes?: ClassEntity[],
  unitProgresses?: UnitProgress[]
}
