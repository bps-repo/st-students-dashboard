export interface Unit {
  unitId: string;
  unitName: String,
  unitDescription: string,
  orderUnit: string,
  levelId: string,
  status: UnitStatus;
  complete: boolean;
  lessonProgress: number;
  completionDate: Date;
  maximumAssessmentAttempt: number;
  assessmentProgress: number;
  assessmentsPassed: number;
  assessmentsFailed: number;
  isCurrentUnit: boolean;
  progressId: string;
}


export enum UnitStatus {
  LOCK = "lock",
  AVAILABLE = "available",
  COMPLETE = "complete",
}
