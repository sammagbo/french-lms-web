import { z } from 'zod';

export const loginSchema = z.object({
      email: z.string().email('Email inválido'),
      password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
      fullName: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
      email: z.string().email('Email inválido'),
      password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
