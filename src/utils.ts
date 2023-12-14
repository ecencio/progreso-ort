import { Plan, Semester } from './types/Plan';

export function isPlan(plan: any): plan is Plan {
  return typeof plan === 'object' &&
         plan.hasOwnProperty('name') &&
         plan.hasOwnProperty('semesters') &&
         plan.name &&
         Array.isArray(plan.semesters) &&
         plan.semesters.every((semester: any) => isSemester(semester));
}

function isSemester(semester: any): semester is Semester {
  return typeof semester === 'object' &&
         semester.hasOwnProperty('name') &&
         semester.hasOwnProperty('subjects') &&
         semester.name &&
         Array.isArray(semester.subjects) //&&
         //semester.subjects.every(subject => isSubject(subject));
}