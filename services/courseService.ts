import { Course } from '../types';

// Import raw data files
import { courseData as gcpCourse } from '../content/courses/gcp-data-engineer';

const COURSES: Course[] = [
    gcpCourse
];

export const getCourses = async (): Promise<Course[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(COURSES), 200);
    });
};

export const getCourseBySlug = async (slug: string): Promise<Course | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(COURSES.find(c => c.slug === slug)), 200);
    });
};