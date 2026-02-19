import api from '@/lib/api';

export enum SubmissionStatus {
      PENDING = 'PENDING',
      SUBMITTED = 'SUBMITTED',
      GRADED = 'GRADED',
      RETURNED = 'RETURNED', // Added based on requirement for retry
}

export interface Activity {
      id: string;
      title: string;
      description: string | null;
      dueDate: string | null;
      lessonId: string;
      courseId: string; // Ideally this should come from backend joining
}

export interface StudentActivity {
      id: string;
      status: SubmissionStatus;
      grade: number | null;
      feedback: string | null;
      activity: Activity;
}

export interface SubmissionData {
      activityId: string;
      textContent?: string;
      attachmentUrl?: string; // Optional URL (audio/file)
}

export const classroomService = {
      getMyAssignments: async (): Promise<StudentActivity[]> => {
            // Ideally GET /classroom/assignments if implemented
            // For now we might reuse /classroom/activities/pending if it returns all or specific endpoint
            // Assuming GET /classroom/my-activities exists or we filter pending
            const response = await api.get<StudentActivity[]>('/classroom/my-activities');
            return response.data;
      },
      getPendingActivities: async (): Promise<StudentActivity[]> => {
            // Thisendpoint was confirmed in Backend tasks: GET /classroom/activities/pending
            const response = await api.get<StudentActivity[]>('/classroom/activities/pending');
            return response.data;
      },
      submitActivity: async (data: SubmissionData): Promise<void> => {
            await api.post('/classroom/submissions', data);
      },
};
