"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { registerSchema, RegisterSchema } from '../auth.schema';
import { authService } from '@/services/auth.service';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function RegisterForm() {
      const router = useRouter();

      const {
            register,
            handleSubmit,
            formState: { errors },
      } = useForm<RegisterSchema>({
            resolver: zodResolver(registerSchema),
      });

      const registerMutation = useMutation({
            mutationFn: authService.register,
            onSuccess: () => {
                  alert('Conta criada com sucesso! Faça login.');
                  router.push('/login');
            },
            onError: (error: any) => {
                  const message = error.response?.data?.message || 'Erro ao criar conta';
                  alert(message);
            },
      });

      const onSubmit = (data: RegisterSchema) => {
            registerMutation.mutate(data);
      };

      const isLoading = registerMutation.isPending;

      return (
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                  <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Crie sua conta</h1>
                        <p className="text-gray-600">Junte-se ao French LMS hoje.</p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Full Name Field */}
                        <div>
                              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                    Nome Completo
                              </label>
                              <input
                                    id="fullName"
                                    type="text"
                                    autoComplete="name"
                                    disabled={isLoading}
                                    className={cn(
                                          "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border",
                                          errors.fullName && "border-red-500 focus:border-red-500 focus:ring-red-500"
                                    )}
                                    placeholder="Seu Nome"
                                    {...register('fullName')}
                              />
                              {errors.fullName && (
                                    <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                              )}
                        </div>

                        {/* Email Field */}
                        <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                              </label>
                              <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    disabled={isLoading}
                                    className={cn(
                                          "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border",
                                          errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500"
                                    )}
                                    placeholder="seu@email.com"
                                    {...register('email')}
                              />
                              {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                              )}
                        </div>

                        {/* Password Field */}
                        <div>
                              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Senha
                              </label>
                              <input
                                    id="password"
                                    type="password"
                                    autoComplete="new-password"
                                    disabled={isLoading}
                                    className={cn(
                                          "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border",
                                          errors.password && "border-red-500 focus:border-red-500 focus:ring-red-500"
                                    )}
                                    placeholder="******"
                                    {...register('password')}
                              />
                              {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                              )}
                        </div>

                        {/* Submit Button */}
                        <button
                              type="submit"
                              disabled={isLoading}
                              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                              {isLoading ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                    'Criar Conta'
                              )}
                        </button>
                  </form>

                  <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                              Já tem conta?{' '}
                              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                                    Faça Login
                              </Link>
                        </p>
                  </div>
            </div>
      );
}
