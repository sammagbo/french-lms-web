import api from '@/lib/api';

export interface KPIData {
      totalStudents: number;
      pendingSubmissions: number;
      totalCourses: number;
      totalActivities: number;
      gradedSubmissions: number;
      gradingRate: number;
}

export interface DayCount {
      date: string;
      count: number;
}

export const analyticsService = {
      getKPIs: async (): Promise<KPIData> => {
            const response = await api.get<KPIData>('/analytics/kpis');
            return response.data;
      },

      getSubmissionsByDay: async (): Promise<DayCount[]> => {
            const response = await api.get<DayCount[]>('/analytics/submissions-by-day');
            return response.data;
      },

      getNewStudentsByDay: async (): Promise<DayCount[]> => {
            const response = await api.get<DayCount[]>('/analytics/new-students-by-day');
            return response.data;
      },
};
