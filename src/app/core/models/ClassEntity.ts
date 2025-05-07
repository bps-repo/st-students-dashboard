import {ClassStatus} from "../enums/ClassStatus";

export interface ClassEntity {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  levelId: string;
  teacherId: string;
  status: ClassStatus;
  centerId: string,
}
