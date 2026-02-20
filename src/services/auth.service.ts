import api from '@/lib/api';
import { LoginSchema, RegisterSchema } from '@/features/auth/auth.schema';

export interface LoginResponse {
      alert(arg0: string): unknown;
      access_token: string;
}

export interface UserProfile {
      id: string;
      email: string;
      role: 'STUDENT' | 'TEACHER' | 'ADMIN';
      name?: string;
}

export const authService = {
      login: async (data: LoginSchema): Promise<LoginResponse> => {
            const response = await api.post<LoginResponse>('/auth/login', data);
            return response.data;
      },
      register: async (data: RegisterSchema): Promise<void> => {
            await api.post('/users', {
                  ...data,
            });
      },
      getProfile: async (): Promise<UserProfile> => {
            const response = await api.get<UserProfile>('/users/me');
            return response.data;
      },
};
