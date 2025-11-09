import { Component, signal } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { map, Observable, of } from "rxjs";
import { VideoCourse } from "../../core/models/VideoCourse";
import { VideoLevel } from "../../core/enums/video-level";

@Component({
  selector: 'app-video-course-list',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './video-course-list.component.html',
})
export class VideoCourseListComponent {

  protected VideoLevel = VideoLevel

  protected searchQuery = '';

  protected filteredVideos$!: Observable<Partial<VideoCourse>[]>;

  protected activeFilter = signal<VideoCourse | string>('all');

  videos$: Observable<Partial<VideoCourse>[]> = of([
    {
      title: "English Consonants + Vowels",
      level: VideoLevel.BEGINNER,
      views: 213,
      description: "English Consonants + Vowels2",
      thumbnail: '/courses/course_blue.png'
    },
    {
      title: "English Grammar: a / an + Noun",
      level: VideoLevel.ELEMENTARY,
      views: 213,
      description: "",
      thumbnail: '/courses/course_green.png'
    },
    {
      title: "English Grammar: Singular + Plural Nouns2",
      level: VideoLevel.ADVANCED,
      views: 213,
      description: "",
      thumbnail: '/courses/course_blue.png'
    },
    {
      title: "English Grammar: Subjective Pronouns",
      level: VideoLevel.BEGINNER,
      views: 213,
      description: "",
      thumbnail: '/courses/course_blue.png'
    },
    {
      title: "English Grammar: a / an + Noun1",
      level: VideoLevel.UPPER_INTERMEDIATE,
      views: 213,
      description: "",
      thumbnail: '/courses/course_green.png'
    },
  ]);

  constructor() {
    this.filteredVideos$ = this.videos$;
  }

  /**
   * Sets the active filter for materials
   * @param filter The filter to apply ('all', 'document', 'video', 'exercise')
   */
  protected setFilter(filter: VideoLevel | string): void {
    this.activeFilter.set(filter);
    console.log(this.activeFilter())
    this.applyFilters();
  }

  /**
   * Applies the current filters to the materials
   */
  /**
   * Applies the current filters to the materials
   */
  protected applyFilters(): void {
    this.filteredVideos$ = this.videos$.pipe(
      map((videos) => {
        return videos.filter(video => {
          const matchesFilter =
            this.activeFilter() === 'all' || video.level === this.activeFilter();
          const matchesSearch =
            !this.searchQuery.trim() ||
            video.level?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            video.description?.toLowerCase().includes(this.searchQuery.toLowerCase());

          return matchesFilter && matchesSearch;
        });
      })
    );
  }

}
