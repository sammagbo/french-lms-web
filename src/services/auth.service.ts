import api from '@/lib/api';
import { LoginSchema } from '@/features/auth/auth.schema';

export interface LoginResponse {
      access_token: string;
}

export const authService = {
      async login(data: LoginSchema): Promise<LoginResponse> {
            const response = await api.post<LoginResponse>('/auth/login', data);
            return response.data;
      },
};
