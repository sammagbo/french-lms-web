import { z } from 'zod';

export const loginSchema = z.object({
      email: z.string({ message: 'E-mail é obrigatório' }).email('E-mail inválido'),
      password: z.string({ message: 'A senha é obrigatória' }).min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
      fullName: z.string({ message: 'Nome é obrigatório' }).min(3, 'Nome deve ter no mínimo 3 caracteres'),
      email: z.string({ message: 'E-mail é obrigatório' }).email('E-mail inválido'),
      password: z.string({ message: 'A senha é obrigatória' }).min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
