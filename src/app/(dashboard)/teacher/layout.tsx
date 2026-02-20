"use client";

import { AuthGuard } from '@/components/auth-guard';

/**
 * Teacher Layout Guard
 * 
 * Todas as rotas dentro de /teacher/* exigem role TEACHER ou ADMIN.
 * Alunos que tentarem acessar são redirecionados para /dashboard.
 */
export default function TeacherLayout({
      children,
}: {
      children: React.ReactNode;
}) {
      return (
            <AuthGuard allowedRoles={['TEACHER', 'ADMIN']}>
                  {children}
            </AuthGuard>
      );
}
