import api from '@/lib/api';

export interface CreateCourseDto {
      title: string;
      slug: string;
      description?: string;
      price?: number;
      isPublished?: boolean;
}

export interface CreateModuleDto {
      title: string;
      description?: string;
      order?: number;
}

export interface CreateLessonDto {
      title: string;
      videoUrl?: string;
      content?: string;
      order?: number;
      isPublished?: boolean;
}

export interface GradeSubmissionDto {
      submissionId: string;
      grade: number;
      feedback?: string;
}

export interface PendingSubmission {
      id: string; // Submission ID
      content: string; // Text content or URL
      submittedAt: string;
      student: {
            id: string;
            name: string;
            email: string;
      };
      activity: {
            id: string;
            title: string;
      };
}

export const teacherService = {
      createCourse: async (data: CreateCourseDto) => {
            const response = await api.post('/academy/courses', data);
            return response.data;
      },

      createModule: async (courseId: string, data: CreateModuleDto) => {
            const response = await api.post(`/academy/courses/${courseId}/modules`, data);
            return response.data;
      },

      createLesson: async (moduleId: string, data: CreateLessonDto) => {
            const response = await api.post(`/academy/modules/${moduleId}/lessons`, data);
            return response.data;
      },

      getPendingSubmissions: async (): Promise<PendingSubmission[]> => {
            const response = await api.get<PendingSubmission[]>('/classroom/teacher/inbox');
            return response.data;
      },

      gradeSubmission: async (data: GradeSubmissionDto) => {
            const response = await api.post('/classroom/grade', data);
            return response.data;
      },
};
