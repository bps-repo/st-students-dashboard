import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Course } from '../../features/@types/course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor() {}

  /**
   * Get all courses
   * @returns Observable of Course[]
   */
  getCourses(): Observable<Course[]> {
    return of([
      {
        label: 'English',
        icon: 'language',
        image: 'assets/images/courses/english.jpg',
        path: '/courses/english',
        description: 'Learn English with our comprehensive course',
        color: '#4CAF50',
        type: 'language',
      },
      {
        label: 'Mathematics',
        icon: 'calculate',
        image: 'assets/images/courses/math.jpg',
        path: '/courses/mathematics',
        description: 'Master mathematics with our step-by-step approach',
        color: '#2196F3',
        type: 'science',
      },
      {
        label: 'History',
        icon: 'history_edu',
        image: 'assets/images/courses/history.jpg',
        path: '/courses/history',
        description: 'Explore world history from ancient to modern times',
        color: '#FF9800',
        type: 'humanities',
      },
      {
        label: 'Science',
        icon: 'science',
        image: 'assets/images/courses/science.jpg',
        path: '/courses/science',
        description: 'Discover the wonders of science with our interactive course',
        color: '#9C27B0',
        type: 'science',
      },
    ]).pipe(delay(500)); // Add a small delay to simulate network latency
  }

  /**
   * Get a course by ID (label)
   * @param courseId The course ID (label)
   * @returns Observable of Course
   */
  getCourse(courseId: string): Observable<Course> {
    const courses = [
      {
        label: 'English',
        icon: 'language',
        image: 'assets/images/courses/english.jpg',
        path: '/courses/english',
        description: 'Learn English with our comprehensive course',
        color: '#4CAF50',
        type: 'language',
      },
      {
        label: 'Mathematics',
        icon: 'calculate',
        image: 'assets/images/courses/math.jpg',
        path: '/courses/mathematics',
        description: 'Master mathematics with our step-by-step approach',
        color: '#2196F3',
        type: 'science',
      },
      {
        label: 'History',
        icon: 'history_edu',
        image: 'assets/images/courses/history.jpg',
        path: '/courses/history',
        description: 'Explore world history from ancient to modern times',
        color: '#FF9800',
        type: 'humanities',
      },
      {
        label: 'Science',
        icon: 'science',
        image: 'assets/images/courses/science.jpg',
        path: '/courses/science',
        description: 'Discover the wonders of science with our interactive course',
        color: '#9C27B0',
        type: 'science',
      },
    ];

    const course = courses.find((c) => c.label === courseId);

    if (course) {
      return of(course).pipe(delay(300));
    }

    return throwError(() => new Error(`Course with ID ${courseId} not found`));
  }

  /**
   * Add a new course
   * @param course The course to add
   * @returns Observable of Course
   */
  addCourse(course: Course): Observable<Course> {
    // In a real application, this would make an API call
    return of(course).pipe(delay(500));
  }

  /**
   * Update a course
   * @param courseId The course ID (label)
   * @param changes The changes to apply
   * @returns Observable of Course
   */
  updateCourse(courseId: string, changes: Partial<Course>): Observable<Course> {
    // In a real application, this would make an API call
    // Get the course, then apply the changes
    return this.getCourse(courseId).pipe(
      delay(500),
      // Map to the updated course
      map(course => {
        const updatedCourse = { ...course, ...changes };
        return updatedCourse;
      })
    );
  }

  /**
   * Delete a course
   * @param courseId The course ID (label)
   * @returns Observable of void
   */
  deleteCourse(courseId: string): Observable<void> {
    // In a real application, this would make an API call
    return of(undefined).pipe(delay(500));
  }
}
