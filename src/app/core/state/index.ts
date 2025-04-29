import {AuthEffects} from './auth/auth.effects';
import {UnitsEffects} from './units/units.effects';
import {CoursesEffects} from './courses/courses.effects';

/**
 * Effects for the application
 */
export const effects = [
  AuthEffects,
  UnitsEffects,
  CoursesEffects,
];
