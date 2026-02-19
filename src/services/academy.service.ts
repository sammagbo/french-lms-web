import api from '@/lib/api';

export interface Course {
      id: string;
      title: string;
      description: string | null;
      price: number;
      isPublished: boolean;
      createdAt: string;
      updatedAt: string;
}

export interface Lesson {
      id: string;
      title: string;
      isPublished: boolean;
      videoUrl: string | null;
      content: string | null;
      duration: number | null;
      order: number;
}

export interface Module {
      id: string;
      title: string;
      description: string | null;
      order: number;
      lessons: Lesson[];
}

export interface CourseDetails extends Course {
      modules: Module[];
}

export const academyService = {
      getCourses: async (): Promise<Course[]> => {
            const response = await api.get<Course[]>('/academy/courses');
            return response.data;
      },
      getCourseById: async (id: string): Promise<CourseDetails> => {
            const response = await api.get<CourseDetails>(`/academy/courses/${id}`);
            return response.data;
      },
};
