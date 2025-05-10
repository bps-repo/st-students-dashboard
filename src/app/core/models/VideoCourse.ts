import {VideoLevel} from "../enums/video-level";

export interface VideoCourse {
  id: number;
  title: string;
  type: string;
  level: VideoLevel;
  duration?: string;
  views?: number;
  pages?: number;
  downloads?: number;
  challenges?: number;
  completions?: number;
  thumbnail: string;
  instructor: string;
  description:string
}
