import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { CourseService } from '../../services/course.service';
import { AlertService } from '../../services/alert.service';
import * as CoursesActions from './courses.actions';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private courseService: CourseService,
    private alertService: AlertService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /**
   * Load courses effect
   */
  loadCourses$ = createEffect(() => {
    // Skip effects on server side
    if (!isPlatformBrowser(this.platformId)) {
      return of({ type: '[Courses] SSR Skip' });
    }

    // Ensure actions$ is defined before accessing pipe
    if (!this.actions$) {
      console.error('Actions$ is undefined in CoursesEffects');
      return of(CoursesActions.loadCoursesFailure({ error: 'Actions$ is undefined' }));
    }

    return this.actions$.pipe(
      ofType(CoursesActions.loadCourses),
      exhaustMap(() =>
        this.courseService.getCourses().pipe(
          map((courses) => {
            return CoursesActions.loadCoursesSuccess({ courses });
          }),
          catchError((error) => {
            this.alertService.error('Failed to load courses');
            return of(CoursesActions.loadCoursesFailure({ error: error.message }));
          })
        )
      )
    );
  });

  /**
   * Add course effect
   */
  addCourse$ = createEffect(() => {
    // Skip effects on server side
    if (!isPlatformBrowser(this.platformId)) {
      return of({ type: '[Courses] SSR Skip' });
    }

    // Ensure actions$ is defined before accessing pipe
    if (!this.actions$) {
      console.error('Actions$ is undefined in CoursesEffects');
      return of(CoursesActions.addCourseFailure({ error: 'Actions$ is undefined' }));
    }

    return this.actions$.pipe(
      ofType(CoursesActions.addCourse),
      exhaustMap(({ course }) =>
        this.courseService.addCourse(course).pipe(
          map((addedCourse) => {
            this.alertService.success(`Course ${addedCourse.label} added successfully`);
            return CoursesActions.addCourseSuccess({ course: addedCourse });
          }),
          catchError((error) => {
            this.alertService.error('Failed to add course');
            return of(CoursesActions.addCourseFailure({ error: error.message }));
          })
        )
      )
    );
  });

  /**
   * Update course effect
   */
  updateCourse$ = createEffect(() => {
    // Skip effects on server side
    if (!isPlatformBrowser(this.platformId)) {
      return of({ type: '[Courses] SSR Skip' });
    }

    // Ensure actions$ is defined before accessing pipe
    if (!this.actions$) {
      console.error('Actions$ is undefined in CoursesEffects');
      return of(CoursesActions.updateCourseFailure({ error: 'Actions$ is undefined' }));
    }

    return this.actions$.pipe(
      ofType(CoursesActions.updateCourse),
      exhaustMap(({ courseId, changes }) =>
        this.courseService.updateCourse(courseId, changes).pipe(
          map((updatedCourse) => {
            this.alertService.success(`Course ${updatedCourse.label} updated successfully`);
            return CoursesActions.updateCourseSuccess({ course: updatedCourse });
          }),
          catchError((error) => {
            this.alertService.error('Failed to update course');
            return of(CoursesActions.updateCourseFailure({ error: error.message }));
          })
        )
      )
    );
  });

  /**
   * Delete course effect
   */
  deleteCourse$ = createEffect(() => {
    // Skip effects on server side
    if (!isPlatformBrowser(this.platformId)) {
      return of({ type: '[Courses] SSR Skip' });
    }

    // Ensure actions$ is defined before accessing pipe
    if (!this.actions$) {
      console.error('Actions$ is undefined in CoursesEffects');
      return of(CoursesActions.deleteCourseFailure({ error: 'Actions$ is undefined' }));
    }

    return this.actions$.pipe(
      ofType(CoursesActions.deleteCourse),
      exhaustMap(({ courseId }) =>
        this.courseService.deleteCourse(courseId).pipe(
          map(() => {
            this.alertService.success(`Course deleted successfully`);
            return CoursesActions.deleteCourseSuccess({ courseId });
          }),
          catchError((error) => {
            this.alertService.error('Failed to delete course');
            return of(CoursesActions.deleteCourseFailure({ error: error.message }));
          })
        )
      )
    );
  });
}
