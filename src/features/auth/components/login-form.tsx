"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, loginSchema } from '../auth.schema';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { authService } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function LoginForm() {
      const router = useRouter();

      const {
            register,
            handleSubmit,
            formState: { errors },
      } = useForm<LoginSchema>({
            resolver: zodResolver(loginSchema),
      });

      const loginMutation = useMutation({
            mutationFn: authService.login,
            onSuccess: (data) => {
                  localStorage.setItem('token', data.access_token);
                  router.push('/dashboard');
            },
            onError: (error: any) => {
                  const message = error.response?.data?.message || 'Erro ao realizar login';
                  alert(message);
            },
      });

      const onSubmit = (data: LoginSchema) => {
            loginMutation.mutate(data);
      };

      const isLoading = loginMutation.isPending;

      return (
            <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-2xl ring-1 ring-gray-900/5 sm:p-12">
                  <div className="flex flex-col items-center justify-center text-center">
                        {/* Logo placeholder or Icon */}
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mb-4">
                              <span className="text-xl font-bold text-blue-600">F</span>
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                              Bem-vindo de volta
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                              Faça login na sua conta French LMS
                        </p>
                  </div>

                  <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4 rounded-md shadow-sm">
                              <div>
                                    <label htmlFor="email" className="sr-only">
                                          Email
                                    </label>
                                    <input
                                          id="email"
                                          type="email"
                                          autoComplete="email"
                                          placeholder="Email"
                                          className={cn(
                                                "relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm",
                                                errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500"
                                          )}
                                          {...register('email')}
                                    />
                                    {errors.email && (
                                          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                                    )}
                              </div>
                              <div>
                                    <label htmlFor="password" className="sr-only">
                                          Senha
                                    </label>
                                    <input
                                          id="password"
                                          type="password"
                                          autoComplete="current-password"
                                          placeholder="Senha"
                                          className={cn(
                                                "relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm",
                                                errors.password && "border-red-500 focus:border-red-500 focus:ring-red-500"
                                          )}
                                          {...register('password')}
                                    />
                                    {errors.password && (
                                          <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
                                    )}
                              </div>
                        </div>

                        <div>
                              <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                              >
                                    {isLoading && (
                                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    {isLoading ? 'Entrando...' : 'Entrar'}
                              </button>
                        </div>
                  </form>
            </div>
      );
}
