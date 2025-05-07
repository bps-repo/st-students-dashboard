export interface UnitProgress {
  id: string;
  studentId: string,
  studentName: string,
  unitId: string,
  unitName: string,
  classId: string
  progress: number,
  completionPercentage: number;
  assessmentComplete: boolean;
  completionDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
