export interface LessonMaterial {
  id: string;
  title: string;
  description: string;
  type: MaterialType;
  fileType: FileType;
  fileUrl: string;
  uploadDate: string | null;
  uploaderId: string;
  uploaderName: string | null;
  active: boolean;
  availabilityStartDate: string;
  availabilityEndDate: string;
  createdAt: string;
  updatedAt: string;
}

export enum MaterialType {
  GENERAL_CONTENT = 'GENERAL_CONTENT',
  EXERCISE = 'EXERCISE',
  ASSIGNMENT = 'ASSIGNMENT',
  REFERENCE = 'REFERENCE',
  SUPPLEMENTARY = 'SUPPLEMENTARY'
}

export enum FileType {
  VIDEO = 'VIDEO',
  PDF = 'PDF',
  DOCUMENT = 'DOCUMENT',
  IMAGE = 'IMAGE',
  AUDIO = 'AUDIO',
  LINK = 'LINK',
  OTHER = 'OTHER'
}

export interface MaterialRelationResponse {
  success: boolean;
  message: string;
  data: LessonMaterial[];
  timestamp: string;
  metadata: any[];
}
